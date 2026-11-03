import pytest
from services.blackbox_service import (
    evaluate_mark_logic,
    generate_bva_tests,
    generate_ep_tests,
    generate_all_tests,
    run_single_test,
    run_test_suite
)

def test_grade_boundaries():
    # 90-100: Grade A
    valid, grade, msg, _, _ = evaluate_mark_logic(90)
    assert valid and grade == "Grade A"
    valid, grade, msg, _, _ = evaluate_mark_logic(100)
    assert valid and grade == "Grade A"

    # 80-89: Grade B
    valid, grade, msg, _, _ = evaluate_mark_logic(80)
    assert valid and grade == "Grade B"
    valid, grade, msg, _, _ = evaluate_mark_logic(89.5)
    assert valid and grade == "Grade B"

    # 70-79: Grade C
    valid, grade, msg, _, _ = evaluate_mark_logic(70)
    assert valid and grade == "Grade C"
    valid, grade, msg, _, _ = evaluate_mark_logic(79)
    assert valid and grade == "Grade C"

    # 60-69: Grade D
    valid, grade, msg, _, _ = evaluate_mark_logic(60)
    assert valid and grade == "Grade D"
    valid, grade, msg, _, _ = evaluate_mark_logic(69)
    assert valid and grade == "Grade D"

    # 0-59: Grade F
    valid, grade, msg, _, _ = evaluate_mark_logic(0)
    assert valid and grade == "Grade F"
    valid, grade, msg, _, _ = evaluate_mark_logic(59)
    assert valid and grade == "Grade F"

def test_invalid_marks():
    # Negative mark
    valid, grade, _, _, _ = evaluate_mark_logic(-1)
    assert not valid and grade == "INVALID"

    # Mark > 100
    valid, grade, _, _, _ = evaluate_mark_logic(101)
    assert not valid and grade == "INVALID"

    # Non-numeric string
    valid, grade, _, _, _ = evaluate_mark_logic("fail")
    assert not valid and grade == "INVALID"

def test_bva_test_generation():
    bva_cases = generate_bva_tests()
    assert len(bva_cases) >= 12
    # Verify min, max, and outer boundaries are included
    inputs = [tc.input_value for tc in bva_cases]
    assert -1 in inputs
    assert 0 in inputs
    assert 100 in inputs
    assert 101 in inputs

def test_ep_test_generation():
    ep_cases = generate_ep_tests()
    assert len(ep_cases) >= 7
    # Verify representative values exist for all equivalence classes
    inputs = [tc.input_value for tc in ep_cases]
    assert -15 in inputs
    assert "abc" in inputs

def test_test_suite_execution():
    all_cases = generate_all_tests("ALL")
    summary = run_test_suite(all_cases)
    assert summary.total == len(all_cases)
    assert summary.passed == summary.total
    assert summary.failed == 0
    assert summary.pass_rate == 100.0

