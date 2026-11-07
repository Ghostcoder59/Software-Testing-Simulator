from fastapi import APIRouter, HTTPException
from typing import List
from schemas.complexity_schema import (
    ComplexityRequest,
    ComplexityResponse,
    ComplexityExample
)
from services.complexity_service import (
    calculate_complexity,
    get_predefined_examples
)

router = APIRouter(prefix="/api/complexity", tags=["Cyclomatic Complexity"])

@router.get("/status")
def get_complexity_status():
    return {
        "module": "Cyclomatic Complexity Calculator",
        "status": "ready",
        "formula": "V(G) = E - N + 2P",
        "description": "McCabe Cyclomatic Complexity computation and Control Flow Graph validation."
    }

@router.post("/calculate", response_model=ComplexityResponse)
def calculate_endpoint(payload: ComplexityRequest):
    """
    Calculates cyclomatic complexity V(G) = E - N + 2P with input validation.
    """
    return calculate_complexity(
        nodes=payload.nodes,
        edges=payload.edges,
        components=payload.components
    )

@router.get("/examples", response_model=List[ComplexityExample])
def get_examples_endpoint():
    """
    Returns curated software engineering Control Flow Graph examples.
    """
    return get_predefined_examples()
