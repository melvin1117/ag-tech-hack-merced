# app/main.py
from fastapi import FastAPI, HTTPException, status, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId
import os
import json
from datetime import datetime
import shutil
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="Smart Farming API")

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
UPLOAD_DIR = Path("/app/uploads/farm-images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Mount static files directory
app.mount("/uploads", StaticFiles(directory="/app/uploads"), name="uploads")

# MongoDB connection
@app.on_event("startup")
async def startup_db_client():
    try:
        app.mongodb_client = AsyncIOMotorClient("mongodb://admin:secret@mongo:27017/")
        app.mongodb = app.mongodb_client["smartfarm"]
        # Create index on userId for faster queries
        await app.mongodb.farm_boundaries.create_index("userId")
        logger.info("Connected to MongoDB")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
    logger.info("MongoDB connection closed")

# Helper for PyObjectId
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# Models
class Coordinate(BaseModel):
    lat: float
    lng: float

class FarmBoundaryInDB(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    userId: str
    boundaryCoordinates: List[Coordinate]
    imagePath: str
    farmName: Optional[str] = "Unnamed Farm"
    createdAt: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class FarmBoundaryResponse(FarmBoundaryInDB):
    pass

# API Routes
@app.post("/api/farm/boundaries", response_model=FarmBoundaryResponse, status_code=status.HTTP_201_CREATED)
async def create_farm_boundary(
    userId: str = Form(...),
    boundaryCoordinates: str = Form(...),
    farmImage: UploadFile = File(...),
    farmName: Optional[str] = Form(None)
):
    # Parse and validate boundary coordinates
    try:
        coordinates_data = json.loads(boundaryCoordinates)
        boundary_coords = [Coordinate(lat=coord["lat"], lng=coord["lng"]) for coord in coordinates_data]
        
        if len(boundary_coords) < 3:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Boundary must have at least 3 coordinates to form an area"
            )
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid JSON format for boundary coordinates"
        )
    except (KeyError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Each coordinate must have lat and lng properties"
        )
    
    # Save the uploaded image
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    file_extension = os.path.splitext(farmImage.filename)[1]
    image_filename = f"{timestamp}_{userId}{file_extension}"
    image_path = os.path.join(UPLOAD_DIR, image_filename)
    
    try:
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(farmImage.file, buffer)
        
        # Create relative path for database storage
        relative_path = f"/uploads/farm-images/{image_filename}"
        
        # Create farm boundary document
        farm_boundary = {
            "userId": userId,
            "boundaryCoordinates": [coord.dict() for coord in boundary_coords],
            "imagePath": relative_path,
            "farmName": farmName or "Unnamed Farm",
            "createdAt": datetime.now()
        }
        
        # Insert into MongoDB
        result = await app.mongodb.farm_boundaries.insert_one(farm_boundary)
        logger.info(f"Created farm boundary with ID: {result.inserted_id}")
        
        # Get the created document
        created_boundary = await app.mongodb.farm_boundaries.find_one({"_id": result.inserted_id})
        
        return created_boundary
    except Exception as e:
        logger.error(f"Error creating farm boundary: {e}")
        # Clean up file if it was created
        if os.path.exists(image_path):
            os.remove(image_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create farm boundary"
        )

@app.get("/api/farm/boundaries/{user_id}", response_model=List[FarmBoundaryResponse])
async def get_farm_boundaries(user_id: str):
    try:
        boundaries = []
        async for boundary in app.mongodb.farm_boundaries.find({"userId": user_id}):
            boundaries.append(boundary)
        
        logger.info(f"Retrieved {len(boundaries)} farm boundaries for user: {user_id}")
        return boundaries
    except Exception as e:
        logger.error(f"Error retrieving farm boundaries: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve farm boundaries"
        )

@app.get("/api/farm/boundaries/{user_id}/{boundary_id}", response_model=FarmBoundaryResponse)
async def get_farm_boundary(user_id: str, boundary_id: str):
    if not ObjectId.is_valid(boundary_id):
        raise HTTPException(status_code=400, detail="Invalid boundary ID format")
    
    try:
        boundary = await app.mongodb.farm_boundaries.find_one({
            "_id": ObjectId(boundary_id),
            "userId": user_id
        })
        
        if not boundary:
            raise HTTPException(status_code=404, detail="Farm boundary not found")
        
        return boundary
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        logger.error(f"Error retrieving farm boundary: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve farm boundary"
        )

# Root route
@app.get("/")
async def root():
    return {"message": "Smart Farming API is running"}