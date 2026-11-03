import pytest
from services.complexity_service import calculate_complexity, get_predefined_examples

def test_sequential_code_complexity():
    # N=4, E=3, P=1 -> V(G) = 3 - 4 + 2(1) = 1
    res = calculate_complexity(nodes=4, edges=3, components=1)
    assert res.valid is True
    assert res.cyclomatic_complexity == 1
    assert res.independent_paths == 1
    assert "Low Risk" in res.risk_level

def test_if_else_complexity():
    # N=4, E=4, P=1 -> V(G) = 4 - 4 + 2(1) = 2
    res = calculate_complexity(nodes=4, edges=4, components=1)
    assert res.valid is True
    assert res.cyclomatic_complexity == 2
    assert res.independent_paths == 2

def test_nested_decision_complexity():
    # N=6, E=7, P=1 -> V(G) = 7 - 6 + 2(1) = 3
    res = calculate_complexity(nodes=6, edges=7, components=1)
    assert res.valid is True
    assert res.cyclomatic_complexity == 3
    assert res.independent_paths == 3

def test_multi_component_complexity():
    # N=8, E=8, P=2 -> V(G) = 8 - 8 + 2(2) = 4
    res = calculate_complexity(nodes=8, edges=8, components=2)
    assert res.valid is True
    assert res.cyclomatic_complexity == 4

def test_invalid_graph_insufficient_edges():
    # For N=5, P=1, min edges = 4. If E=2, it is impossible
    res = calculate_complexity(nodes=5, edges=2, components=1)
    assert res.valid is False
    assert "Inconsistent" in res.error_message or "cannot be less than" in res.error_message

def test_risk_levels():
    # Low risk
    low = calculate_complexity(nodes=10, edges=12, components=1) # 12 - 10 + 2 = 4
    assert "Low Risk" in low.risk_level

    # Moderate risk
    mod = calculate_complexity(nodes=20, edges=32, components=1) # 32 - 20 + 2 = 14
    assert "Moderate Risk" in mod.risk_level

    # High risk
    high = calculate_complexity(nodes=30, edges=53, components=1) # 53 - 30 + 2 = 25
    assert "High Risk" in high.risk_level

def test_predefined_examples():
    examples = get_predefined_examples()
    assert len(examples) >= 4
    for ex in examples:
        assert ex.nodes >= 1
        assert ex.edges >= 0
        assert ex.components >= 1
        calc = calculate_complexity(ex.nodes, ex.edges, ex.components)
        assert calc.cyclomatic_complexity == ex.expected_vg

