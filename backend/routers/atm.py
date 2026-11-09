from fastapi import APIRouter
from schemas.atm_schema import ATMUseCaseDiagramResponse
from services.atm_service import get_atm_use_case_data

router = APIRouter(prefix="/api/atm", tags=["ATM Use Case Diagram (Exp 2)"])

@router.get("/use-case-diagram", response_model=ATMUseCaseDiagramResponse)
def get_atm_diagram():
    """Returns UML Use Case Model elements, actors, includes, and extends for the ATM system."""
    return get_atm_use_case_data()

