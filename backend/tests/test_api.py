from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

client = TestClient(app)

def test_health_endpoints():
    r1 = client.get("/api/info")
    assert r1.status_code == 200
    assert r1.json()["status"] == "online"

    r2 = client.get("/api/health")
    assert r2.status_code == 200
    assert r2.json()["status"] == "healthy"

def test_complexity_endpoints():
    # Calculate endpoint
    payload = {"nodes": 4, "edges": 4, "components": 1}
    res = client.post("/api/complexity/calculate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["cyclomatic_complexity"] == 2
    assert data["valid"] is True

    # Examples endpoint
    ex_res = client.get("/api/complexity/examples")
    assert ex_res.status_code == 200
    assert len(ex_res.json()) >= 4

def test_blackbox_endpoints():
    # Generate tests
    gen_res = client.post("/api/blackbox/generate-tests", json={"technique": "ALL"})
    assert gen_res.status_code == 200
    tests = gen_res.json()
    assert len(tests) > 10

    # Run single test
    tc = tests[0]
    single_res = client.post("/api/blackbox/run-test", json={"test_case": tc})
    assert single_res.status_code == 200
    assert single_res.json()["status"] in ["PASS", "FAIL"]

    # Run suite
    suite_res = client.post("/api/blackbox/run-suite", json={"test_cases": tests})
    assert suite_res.status_code == 200
    summary = suite_res.json()
    assert summary["total"] == len(tests)
    assert summary["passed"] > 0

    # Evaluate mark
    eval_res = client.post("/api/blackbox/evaluate-mark", json={"mark": 88})
    assert eval_res.status_code == 200
    assert eval_res.json()["grade"] == "Grade B"
    assert eval_res.json()["is_valid"] is True
