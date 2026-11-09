from pydantic import BaseModel, Field
from typing import List, Optional

class SDLCStage(BaseModel):
    name: str
    description: str
    duration_ms: int = 500

class SDLCModelInfo(BaseModel):
    id: str
    name: str
    description: str
    approach: str
    advantages: List[str]
    disadvantages: List[str]
    best_suited_for: str
    stages: List[str]

class SDLCSimulationRequest(BaseModel):
    model_id: str = Field(..., description="'waterfall', 'incremental', 'prototype', or 'agile'")
    scenario: Optional[str] = "Student Management System"
    prototype_satisfaction_round: Optional[int] = 2

class SDLCSimulationStep(BaseModel):
    step_number: int
    phase: str
    activity: str
    status: str
    deliverable: str

class SDLCSimulationResponse(BaseModel):
    model_id: str
    model_name: str
    scenario: str
    steps: List[SDLCSimulationStep]
    summary: str

