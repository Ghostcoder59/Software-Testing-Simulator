from fastapi import APIRouter
from schemas.deployment_schema import (
    BlueGreenRequest,
    BlueGreenResponse,
    CanaryRequest,
    CanaryResponse,
    RollingUpdateRequest,
    RollingUpdateResponse
)
from services.deployment_service import (
    simulate_blue_green,
    simulate_canary,
    simulate_rolling_update
)

router = APIRouter(prefix="/api/deployment", tags=["Release & Deployment Strategies"])

@router.post("/blue-green", response_model=BlueGreenResponse)
def blue_green_endpoint(payload: BlueGreenRequest):
    """Simulates Blue-Green deployment and zero-downtime traffic switching."""
    return simulate_blue_green(payload.switch_to_green, payload.green_healthy)

@router.post("/canary", response_model=CanaryResponse)
def canary_endpoint(payload: CanaryRequest):
    """Simulates Canary progressive rollout with health and error rate monitoring."""
    return simulate_canary(payload.percentage, payload.simulate_error)

@router.post("/rolling", response_model=RollingUpdateResponse)
def rolling_endpoint(payload: RollingUpdateRequest):
    """Simulates step-by-step Rolling Update across a fleet of server instances."""
    return simulate_rolling_update(payload.total_servers, payload.batch_size, payload.current_step)

