from pydantic import BaseModel, Field
from typing import List, Optional, Union, Any

class TestCase(BaseModel):
    id: str
    technique: str  # "Boundary Value Analysis (BVA)" or "Equivalence Partitioning (EP)"
    category: str   # "Valid", "Invalid", "Boundary"
    input_value: Any
    expected_output: str
    actual_output: Optional[str] = None
    status: Optional[str] = "PENDING"  # "PASS", "FAIL", "PENDING"
    reason: str

class GenerateTestsRequest(BaseModel):
    technique: str = Field(default="ALL", description="'ALL', 'BVA', or 'EP'")

class RunTestRequest(BaseModel):
    test_case: TestCase

class RunSuiteRequest(BaseModel):
    test_cases: List[TestCase]

class TestSuiteSummary(BaseModel):
    total: int
    passed: int
    failed: int
    pending: int
    pass_rate: float
    results: List[TestCase]

class EvaluateMarkRequest(BaseModel):
    mark: Any = Field(..., description="Mark value to validate and grade (0-100 or boundary/invalid)")

class EvaluateMarkResponse(BaseModel):
    input_value: Any
    is_valid: bool
    grade: str
    message: str
    partition: str
    is_boundary: bool

