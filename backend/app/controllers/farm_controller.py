from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Depends
import json
import os
from app.auth import verify_token
from app.services.farm_service import confirm_farm_area

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
import uuid

@router.post("/confirm-farm-area/{user_id}")
async def post_confirm_farm_area(
    user_id: str,
    token_data: dict = Depends(verify_token),
    coords: str = Form(...),
    snapshot: UploadFile = File(...),
):
    # We assume the FE sends a valid token; just ensure it exists.
    # Parse coordinates (JSON string expected).
    try:
        coords_list = json.loads(coords)  # e.g., [{"lat":12.34,"lon":56.78}, ...]
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid coordinates format") from e

    # Save the uploaded image file.
    file_location = os.path.join(UPLOAD_DIR, f"{str(uuid.uuid4())}-{snapshot.filename}")
    with open(file_location, "wb") as f:
        content = await snapshot.read()
        f.write(content)
    
    # Call the service layer to save the document.
    try:
        inserted_id = await confirm_farm_area(user_id, coords_list, file_location)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert document") from e
    
    return {"message": "Farm area confirmed", "id": inserted_id}
