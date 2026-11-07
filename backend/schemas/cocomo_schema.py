from pydantic import BaseModel, Field
from typing import List, Optional

class CocomoRequest(BaseModel):
    kloc: float = Field(..., description="Project size in KLOC (Thousands of Lines of Code)", gt=0)
    mode: str = Field(..., description="Project category: 'organic', 'semi-detached', or 'embedded'")
    cost_per_pm: Optional[float] = Field(default=5000.0, description="Cost per person-month in currency", ge=0)

class CocomoCoefficients(BaseModel):
    a: float
    b: float
    c: float
    d: float

class CocomoResponse(BaseModel):
    kloc: float
    mode: str
    mode_name: str
    coefficients: CocomoCoefficients
    effort: float              # Person-months
    time: float                # Months
    staff: float               # Persons (team size)
    estimated_cost: float      # Currency
    productivity: float        # KLOC / person-month
    formula_steps: List[str]
    description: str
    recommendation: str
