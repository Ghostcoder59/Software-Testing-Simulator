from typing import List, Dict, Any, Tuple
from schemas.blackbox_schema import (
    TestCase,
    TestSuiteSummary,
    EvaluateMarkResponse
)

def evaluate_mark_logic(input_value: Any) -> Tuple[bool, str, str, str, bool]:
    """
    Core implementation under test for the Marks-to-Grade conversion specification.
    Returns: (is_valid, grade, message, partition, is_boundary)
    """
    # 1. Type and numeric conversion validation
    try:
        # Check for strings that can't be parsed
        if isinstance(input_value, str):
            clean_str = input_value.strip()
            # If empty
            if not clean_str:
                return (False, "INVALID", "Invalid input: Empty value provided.", "Non-numeric / Empty", False)
            mark = float(clean_str)
        else:
            mark = float(input_value)
    except (ValueError, TypeError):
        return (
            False,
            "INVALID",
            f"Invalid input: '{input_value}' is not a valid numerical mark.",
            "Non-numeric Invalid Partition",
            False
        )

    # 2. Domain boundary checks (0 - 100)
    if mark < 0:
        return (
            False,
            "INVALID",
            f"Invalid input: Mark {mark} is below the allowable minimum score (0).",
            "Invalid Low Range (< 0)",
            mark == -1
        )
    if mark > 100:
        return (
            False,
            "INVALID",
            f"Invalid input: Mark {mark} exceeds the allowable maximum score (100).",
            "Invalid High Range (> 100)",
            mark == 101
        )

    # 3. Equivalence Partition & Grade Allocation
    is_boundary = mark in [0, 1, 59, 60, 69, 70, 79, 80, 89, 90, 99, 100]

    if 90 <= mark <= 100:
        return (True, "Grade A", f"Marks {mark} is in the range [90–100]: Excellent Performance.", "Valid Partition [90–100]", is_boundary)
    elif 80 <= mark < 90:
        return (True, "Grade B", f"Marks {mark} is in the range [80–89]: Very Good Performance.", "Valid Partition [80–89]", is_boundary)
    elif 70 <= mark < 80:
        return (True, "Grade C", f"Marks {mark} is in the range [70–79]: Good / Competent.", "Valid Partition [70–79]", is_boundary)
    elif 60 <= mark < 70:
        return (True, "Grade D", f"Marks {mark} is in the range [60–69]: Satisfactory / Pass.", "Valid Partition [60–69]", is_boundary)
    else:  # 0 <= mark < 60
        return (True, "Grade F", f"Marks {mark} is in the range [0–59]: Fail / Unsatisfactory.", "Valid Partition [0–59]", is_boundary)


def generate_bva_tests() -> List[TestCase]:
    """
    Generates test cases using Boundary Value Analysis (BVA).
    Focuses on Min-1, Min, Min+1, Nominal, Max-1, Max, Max+1, plus intra-grade boundary thresholds.
    """
    bva_definitions = [
        # (id, input, expected, category, reason)
        ("BVA-01", -1, "INVALID", "Boundary (Invalid)", "Global minimum outer boundary (Min - 1). Tests system rejection of negative numbers."),
        ("BVA-02", 0, "Grade F", "Boundary (Valid)", "Global minimum boundary (Min). Lowest valid mark possible; tests lower limit of Grade F."),
        ("BVA-03", 1, "Grade F", "Boundary (Valid)", "Global minimum inner boundary (Min + 1). Tests lowest non-zero valid mark."),
        ("BVA-04", 50, "Grade F", "Nominal (Valid)", "Nominal / typical midpoint value within standard failing partition."),
        ("BVA-05", 59, "Grade F", "Boundary (Valid)", "Upper boundary of Grade F partition (59). Just below the threshold of passing (Grade D)."),
        ("BVA-06", 60, "Grade D", "Boundary (Valid)", "Lower boundary of Grade D partition (60). Lowest mark achieving passing grade."),
        ("BVA-07", 69, "Grade D", "Boundary (Valid)", "Upper boundary of Grade D partition (69). Borderline point before Grade C."),
        ("BVA-08", 70, "Grade C", "Boundary (Valid)", "Lower boundary of Grade C partition (70). Exactly satisfies Grade C threshold."),
        ("BVA-09", 79, "Grade C", "Boundary (Valid)", "Upper boundary of Grade C partition (79). Borderline point before Grade B."),
        ("BVA-10", 80, "Grade B", "Boundary (Valid)", "Lower boundary of Grade B partition (80). Exactly satisfies Grade B threshold."),
        ("BVA-11", 89, "Grade B", "Boundary (Valid)", "Upper boundary of Grade B partition (89). Borderline point before Grade A."),
        ("BVA-12", 90, "Grade A", "Boundary (Valid)", "Lower boundary of Grade A partition (90). Exactly satisfies Grade A distinction threshold."),
        ("BVA-13", 99, "Grade A", "Boundary (Valid)", "Global maximum inner boundary (Max - 1). Near perfect score in Grade A partition."),
        ("BVA-14", 100, "Grade A", "Boundary (Valid)", "Global maximum boundary (Max). Highest valid mark allowed in the system."),
        ("BVA-15", 101, "INVALID", "Boundary (Invalid)", "Global maximum outer boundary (Max + 1). Tests system rejection of marks exceeding 100."),
    ]

    tests: List[TestCase] = []
    for test_id, inp, exp, cat, reason in bva_definitions:
        tests.append(
            TestCase(
                id=test_id,
                technique="Boundary Value Analysis (BVA)",
                category=cat,
                input_value=inp,
                expected_output=exp,
                actual_output=None,
                status="PENDING",
                reason=reason
            )
        )
    return tests


def generate_ep_tests() -> List[TestCase]:
    """
    Generates test cases using Equivalence Partitioning (EP).
    Identifies representative values for each disjoint valid and invalid equivalence class.
    """
    ep_definitions = [
        # (id, input, expected, category, reason)
        ("EP-01", -15, "INVALID", "Invalid Partition", "Class 1: Marks < 0. Representative negative value testing rejection of sub-zero inputs."),
        ("EP-02", 35, "Grade F", "Valid Partition", "Class 2: 0 <= Marks <= 59. Representative failing score testing Grade F partition."),
        ("EP-03", 65, "Grade D", "Valid Partition", "Class 3: 60 <= Marks <= 69. Representative passing score testing Grade D partition."),
        ("EP-04", 75, "Grade C", "Valid Partition", "Class 4: 70 <= Marks <= 79. Representative competent score testing Grade C partition."),
        ("EP-05", 85, "Grade B", "Valid Partition", "Class 5: 80 <= Marks <= 89. Representative very good score testing Grade B partition."),
        ("EP-06", 95, "Grade A", "Valid Partition", "Class 6: 90 <= Marks <= 100. Representative distinction score testing Grade A partition."),
        ("EP-07", 115, "INVALID", "Invalid Partition", "Class 7: Marks > 100. Representative excess score testing rejection of marks > 100."),
        ("EP-08", "abc", "INVALID", "Invalid Partition", "Class 8: Non-numeric alphanumeric string. Tests robust rejection of improper types."),
    ]

    tests: List[TestCase] = []
    for test_id, inp, exp, cat, reason in ep_definitions:
        tests.append(
            TestCase(
                id=test_id,
                technique="Equivalence Partitioning (EP)",
                category=cat,
                input_value=inp,
                expected_output=exp,
                actual_output=None,
                status="PENDING",
                reason=reason
            )
        )
    return tests


def generate_all_tests(technique: str = "ALL") -> List[TestCase]:
    """
    Generates test cases based on requested technique ("ALL", "BVA", "EP").
    """
    t = technique.upper()
    if t == "BVA":
        return generate_bva_tests()
    elif t == "EP":
        return generate_ep_tests()
    else:
        return generate_bva_tests() + generate_ep_tests()


def run_single_test(test_case: TestCase) -> TestCase:
    """
    Executes a single test case against the grading system and compares actual vs expected output.
    """
    is_valid, grade, message, partition, is_boundary = evaluate_mark_logic(test_case.input_value)
    
    actual = grade if is_valid else "INVALID"
    
    # Compare actual output with expected
    status = "PASS" if actual == test_case.expected_output else "FAIL"

    return TestCase(
        id=test_case.id,
        technique=test_case.technique,
        category=test_case.category,
        input_value=test_case.input_value,
        expected_output=test_case.expected_output,
        actual_output=actual,
        status=status,
        reason=test_case.reason
    )


def run_test_suite(test_cases: List[TestCase]) -> TestSuiteSummary:
    """
    Executes a complete test suite and aggregates summary metrics (total, passed, failed, pass_rate).
    """
    executed_cases: List[TestCase] = []
    passed = 0
    failed = 0

    for tc in test_cases:
        res = run_single_test(tc)
        executed_cases.append(res)
        if res.status == "PASS":
            passed += 1
        elif res.status == "FAIL":
            failed += 1

    total = len(executed_cases)
    pass_rate = round((passed / total * 100), 1) if total > 0 else 0.0

    return TestSuiteSummary(
        total=total,
        passed=passed,
        failed=failed,
        pending=0,
        pass_rate=pass_rate,
        results=executed_cases
    )

