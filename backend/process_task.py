import pandas as pd
import numpy as np
import re
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from ortools.sat.python import cp_model
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from celery import Celery
from sqlalchemy.sql import text  # Safe SQL queries
from os import getenv
from app.db import lands_collection
from imageProcess import process_image_sync
from gemini_integration import generate_gemini_insights

# Import Celery instance
from celery_worker import celery_app
from datetime import datetime
import asyncio

# ---------------- Celery Task ---------------- #
@celery_app.task(name="process_event")
def process_event(user_id: str, land_id: str):
    """Background Task to Process Farm Image Analysis"""
    
    # Create a wrapper to handle the async operations
    async def async_process():
        # Get the land data using async MongoDB operation
        data = await lands_collection.find_one({"userId": user_id, "land.landId": land_id})
        if not data:
            return {"status": "Failed", "message": "No farm area found for this user"}
        
        # Process the image synchronously (no async needed here)
        img_res = process_image_sync(data['land']['image'])
        
        image_insights = [
            {
                "path": img_res['plant_health_image'],
                "value": img_res['plant_health_percentage']
            },
            {
                "path": img_res['soil_analysis_image'],
                "value": img_res['estimated_soil_moisture']
            }
        ]
        
        lat_lon = data['land']['coordinates'][0]
        farm_data = generate_gemini_insights(
            current_crop=data['land']['crop'],
            lat=lat_lon[0],
            lon=lat_lon[1],
            image_path=data['land']['image']
        )
        
        # Update the database using async operation
        await lands_collection.update_one(
            {"userId": user_id, "land.landId": land_id},
            {
                "$set": {
                    "imageInsights": image_insights,
                    "soil": farm_data['soil'],
                    "predictedYield": farm_data['predictedYield'],
                    "carbonFootprint": farm_data['carbonFootprint'],
                    "suggestions": farm_data['suggestions'],
                    "insights": farm_data['insights'],
                    "recommendedCrops": farm_data['recommendedCrops'],
                    "updatedAt": datetime.utcnow()
                }
            }
        )
        
        return {"status": "Success", "message": "Farm area processed successfully"}
    
    # Run the async function and return its result
    loop = asyncio.get_event_loop()
    
    # If running in an environment where the event loop is already running
    # (like within a Tornado or FastAPI app), use this instead:
    try:
        # Try to use an event loop if one exists
        return asyncio.get_event_loop().run_until_complete(async_process())
    except RuntimeError:
        # If no event loop exists in this thread, create one
        return asyncio.run(async_process())