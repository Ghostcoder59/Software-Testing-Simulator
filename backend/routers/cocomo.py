from fastapi import APIRouter, HTTPException
from schemas.cocomo_schema import CocomoRequest, CocomoResponse
from services.cocomo_service import calculate_cocomo, COCOMO_MODES

router = APIRouter(prefix="/api/cocomo", tags=["COCOMO Estimation"])

@router.get("/modes")
def get_cocomo_modes():
    """Returns available project modes and their coefficient tables."""
    return COCOMO_MODES

@router.post("/estimate", response_model=CocomoResponse)
def estimate_cocomo_endpoint(payload: CocomoRequest):
    """Calculates Effort, Development Time, and Average Staff size using Basic COCOMO."""
    try:
        return calculate_cocomo(
            kloc=payload.kloc,
            mode_key=payload.mode,
            cost_per_pm=payload.cost_per_pm or 5000.0
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

