from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Coordinate(BaseModel):
    lat: float
    lon: float

class Land(BaseModel):
    landId: str
    coordinates: List[Coordinate]
    image: str
    crop: str

class FarmAreaDocument(BaseModel):
    userId: str
    land: Land
    soil: Optional[dict] = None
    imageInsights: Optional[List[dict]] = None
    predictedYield: Optional[float] = None
    carbonFootprint: Optional[str] = None
    suggestions: Optional[str] = None
    insights: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime
