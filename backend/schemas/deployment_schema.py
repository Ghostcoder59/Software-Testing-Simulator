from pydantic import BaseModel, Field
from typing import List, Optional

class BlueGreenRequest(BaseModel):
    switch_to_green: bool
    green_healthy: bool = True

class BlueGreenResponse(BaseModel):
    active_environment: str  # "Blue" or "Green"
    active_version: str      # "1.0" or "2.0"
    idle_environment: str    # "Green" or "Blue"
    idle_version: str        # "2.0" or "1.0"
    traffic_blue: int        # percentage
    traffic_green: int       # percentage
    can_rollback: bool
    status_message: str

class CanaryRequest(BaseModel):
    percentage: int = Field(..., ge=0, le=100, description="Traffic percentage sent to canary version")
    simulate_error: bool = False

class CanaryResponse(BaseModel):
    percentage: int
    traffic_v1: int
    traffic_v2: int
    version_1_status: str
    version_2_status: str
    error_rate: float
    health: str              # "Healthy", "Warning", "Degraded"
    status_message: str
    recommended_action: str

class RollingUpdateRequest(BaseModel):
    total_servers: int = Field(default=6, ge=1, le=20)
    batch_size: int = Field(default=2, ge=1, le=10)
    current_step: int = Field(default=0, ge=0)

class ServerInstance(BaseModel):
    server_id: int
    version: str
    status: str             # "Active (v1.0)", "Updating...", "Active (v2.0)"

class RollingUpdateResponse(BaseModel):
    total_servers: int
    batch_size: int
    current_step: int
    total_steps: int
    updated_servers: int
    remaining_servers: int
    is_complete: bool
    servers: List[ServerInstance]
    status_message: str

