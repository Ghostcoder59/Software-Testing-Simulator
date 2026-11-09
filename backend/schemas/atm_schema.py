from pydantic import BaseModel
from typing import List, Optional

class ActorInfo(BaseModel):
    id: str
    name: str
    role: str
    type: str  # Primary, Secondary, Supporting

class UseCaseInfo(BaseModel):
    id: str
    name: str
    description: str
    primary_actor: str
    scope: str = "ATM Core Banking"

class RelationshipInfo(BaseModel):
    source: str
    target: str
    type: str  # association, include, extend
    label: Optional[str] = None
    condition: Optional[str] = None

class ATMUseCaseDiagramResponse(BaseModel):
    system_boundary: str
    actors: List[ActorInfo]
    use_cases: List[UseCaseInfo]
    relationships: List[RelationshipInfo]
    theory: dict

