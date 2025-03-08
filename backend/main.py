from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import farm_controller
from fastapi.staticfiles import StaticFiles


app = FastAPI()

# Add CORS middleware (adjust allowed origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict to your domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(farm_controller.router, prefix="/api")
