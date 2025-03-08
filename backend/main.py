from fastapi import FastAPI
from pymongo import MongoClient
from celery_worker import dummy_task

app = FastAPI()

# Connect to MongoDB (assuming the MongoDB container is named "mongo")
client = MongoClient("mongodb://mongo:27017/")
db = client["dummy_db"]

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI with MongoDB"}

@app.get("/dummy")
def dummy_api(a: int = 1, b: int = 2):
    # Insert a dummy record into MongoDB
    db.dummy.insert_one({"a": a, "b": b})
    # Trigger a dummy Celery task
    result = dummy_task.delay(a, b)
    return {"task_id": result.id}
