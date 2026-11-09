from pydantic import BaseModel
from typing import List, Optional

class ClassAttribute(BaseModel):
    name: str
    type: str
    visibility: str  # public (+), private (-), protected (#)

class ClassMethod(BaseModel):
    name: str
    return_type: str
    visibility: str

class UMLClassModel(BaseModel):
    name: str
    stereotype: Optional[str] = None
    attributes: List[ClassAttribute]
    methods: List[ClassMethod]
    parent: Optional[str] = None

class UMLRelationship(BaseModel):
    source: str
    target: str
    type: str  # Generalization, Association, Composition, Aggregation
    multiplicity_source: Optional[str] = None
    multiplicity_target: Optional[str] = None
    label: Optional[str] = None

class SequenceMessage(BaseModel):
    step: int
    sender: str
    receiver: str
    message: str
    type: str  # synchronous, return, asynchronous
    description: str

class FoodOrderingUMLResponse(BaseModel):
    system_name: str
    classes: List[UMLClassModel]
    relationships: List[UMLRelationship]
    sequence_diagram: List[SequenceMessage]
    theory: dict

