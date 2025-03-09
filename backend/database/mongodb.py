# backend/database/mongodb.py

import os
import motor.motor_asyncio
from fastapi import Depends

# Get MongoDB URI from environment
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://admin:secret@mongo:27017/")
DB_NAME = os.environ.get("DB_NAME", "farming_assistant")

# Create MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]

# Dependency to get MongoDB database
async def get_database():
    return database

# Function to initialize database collections and indexes
async def init_db():
    # Create conversations collection if it doesn't exist
    if "conversations" not in await database.list_collection_names():
        await database.create_collection("conversations")
    
    # Create indexes for conversations collection
    conversations = database.conversations
    await conversations.create_index("user_id")
    await conversations.create_index("updated_at")
    
    print("Database initialized successfully")

# Call this function when starting the application
# You can add this to your startup event handler in the main.py file