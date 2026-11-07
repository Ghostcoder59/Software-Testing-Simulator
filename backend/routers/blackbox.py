from fastapi import APIRouter, HTTPException
from typing import List
from schemas.blackbox_schema import (
    TestCase,
    GenerateTestsRequest,
    RunTestRequest,
    RunSuiteRequest,
    TestSuiteSummary,
    EvaluateMarkRequest,
    EvaluateMarkResponse
)
from services.blackbox_service import (
    generate_all_tests,
    run_single_test,
    run_test_suite,
    evaluate_mark_logic
)

router = APIRouter(prefix="/api/blackbox", tags=["Black-Box Testing"])

@router.get("/status")
def get_blackbox_status():
    return {
        "module": "Black-Box Testing Simulator",
        "status": "ready",
        "specification": "College Marks-to-Grade conversion system (0-100)",
        "techniques": ["Boundary Value Analysis (BVA)", "Equivalence Partitioning (EP)"]
    }

@router.post("/generate-tests", response_model=List[TestCase])
def generate_tests_endpoint(payload: GenerateTestsRequest):
    """
    Generates test cases using Boundary Value Analysis, Equivalence Partitioning, or both.
    """
    return generate_all_tests(technique=payload.technique)

@router.post("/run-test", response_model=TestCase)
def run_single_test_endpoint(payload: RunTestRequest):
    """
    Executes a single test case against the grading system and compares actual vs expected output.
    """
    return run_single_test(payload.test_case)

@router.post("/run-suite", response_model=TestSuiteSummary)
def run_suite_endpoint(payload: RunSuiteRequest):
    """
    Executes an entire suite of test cases and computes pass/fail metrics.
    """
    return run_test_suite(payload.test_cases)

@router.post("/evaluate-mark", response_model=EvaluateMarkResponse)
def evaluate_mark_endpoint(payload: EvaluateMarkRequest):
    """
    Validates and grades a single user-provided mark value, identifying its partition and boundary status.
    """
    is_valid, grade, message, partition, is_boundary = evaluate_mark_logic(payload.mark)
    return EvaluateMarkResponse(
        input_value=payload.mark,
        is_valid=is_valid,
        grade=grade,
        message=message,
        partition=partition,
        is_boundary=is_boundary
    )
