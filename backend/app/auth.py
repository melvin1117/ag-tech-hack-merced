from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # Simple auth guard: ensure that a token is provided.
    if not credentials or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Missing auth token")
    return {"token": credentials.credentials}
