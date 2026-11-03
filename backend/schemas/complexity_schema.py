from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ComplexityRequest(BaseModel):
    nodes: int = Field(..., description="Number of nodes (N) in the Control Flow Graph", ge=1)
    edges: int = Field(..., description="Number of edges (E) in the Control Flow Graph", ge=0)
    components: int = Field(default=1, description="Number of connected components (P)", ge=1)

class GraphNode(BaseModel):
    id: str
    label: str
    x: int
    y: int
    type: str = "statement"  # start, decision, statement, end

class GraphEdge(BaseModel):
    source: str
    target: str
    label: Optional[str] = None

class GraphVisualizationData(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

class ComplexityResponse(BaseModel):
    nodes: int
    edges: int
    components: int
    cyclomatic_complexity: int
    formula: str
    steps: List[str]
    independent_paths: int
    risk_level: str
    interpretation: str
    recommendation: str
    valid: bool
    error_message: Optional[str] = None
    graph_representation: Optional[GraphVisualizationData] = None

class ComplexityExample(BaseModel):
    id: str
    name: str
    category: str
    description: str
    nodes: int
    edges: int
    components: int
    expected_vg: int
    pseudocode: str
    graph_representation: GraphVisualizationData

