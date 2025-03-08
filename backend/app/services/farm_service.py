import uuid
from datetime import datetime
from app.db import lands_collection

async def confirm_farm_area(user_id: str, coords: list, image_path: str) -> str:
    now = datetime.utcnow()
    # Generate a unique landId using UUID4.
    land_id = str(uuid.uuid4())
    document = {
        "userId": user_id,
        "land": {
            "landId": land_id,
            "coordinates": coords,  # Expected as a list of dicts: [{"lat": 12.34, "lon": 56.78}, ...]
            "image": image_path,
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
