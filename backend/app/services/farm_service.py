import uuid
from datetime import datetime
from app.db import lands_collection

async def confirm_farm_area(user_id: str, coords: list, image_path: str, crop: str) -> str:
    now = datetime.utcnow()
    # Generate a unique landId using UUID4.
    land_id = str(uuid.uuid4())
    document = {
        "userId": user_id,
        "land": {
            "landId": land_id,
            "coordinates": coords,  # List of dicts: [{"lat": 12.34, "lon": 56.78}, ...]
            "image": image_path,
            "crop": crop  # New field added inside the land object
        },
        "soil": {},
        "imageInsights": [],
        "predictedYield": None,
        "carbonFootprint": None,
        "suggestions": None,
        "insights": None,
        "createdAt": now,
        "updatedAt": now,
    }
    result = await lands_collection.insert_one(document)
    return str(result.inserted_id)

async def get_latest_farm_area(user_id: str):
    cursor = lands_collection.find({"userId": user_id}).sort("createdAt", -1)
    documents = await cursor.to_list(length=1)
    if documents:
        document = documents[0]
        document["id"] = str(document["_id"])
        document.pop("_id", None)
        return document
    return None
