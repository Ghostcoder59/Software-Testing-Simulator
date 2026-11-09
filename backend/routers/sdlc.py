from fastapi import APIRouter, HTTPException
from typing import List
from schemas.sdlc_schema import SDLCModelInfo, SDLCSimulationRequest, SDLCSimulationResponse
from services.sdlc_service import get_all_sdlc_models, simulate_sdlc_execution

router = APIRouter(prefix="/api/sdlc", tags=["SDLC Models (Exp 1)"])

@router.get("/models", response_model=List[SDLCModelInfo])
def list_models():
    """Returns specifications for Waterfall, Incremental, Prototyping, and Agile models."""
    return get_all_sdlc_models()

@router.post("/simulate", response_model=SDLCSimulationResponse)
def simulate_model(req: SDLCSimulationRequest):
    """Executes step-by-step workflow simulation for the chosen SDLC paradigm."""
    try:
        return simulate_sdlc_execution(req)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

