from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import farm_controller
from fastapi.staticfiles import StaticFiles
from app.controllers import ai_task_controller
import logging

app = FastAPI()
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add CORS middleware (adjust allowed origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict to your domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/results", StaticFiles(directory="results"), name="results")

app.include_router(farm_controller.router, prefix="/api")
app.include_router(ai_task_controller.router, prefix="/api")
