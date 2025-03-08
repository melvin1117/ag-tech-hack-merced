import os

# MongoDB connection string (using Docker Compose service "mongo")
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://admin:secret@mongo:27017/?authSource=admin")
DATABASE_NAME = os.getenv("DATABASE_NAME", "agrovision")