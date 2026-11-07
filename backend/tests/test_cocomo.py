import pytest
from services.cocomo_service import calculate_cocomo

def test_cocomo_semi_detached_matches_lab_manual():
    # Matches Practical 3 Manual (Page 19): 50 KLOC, Semi-detached
    # E = 239.87 PM, T = 17.02 months, Staff = 14.09 persons
    res = calculate_cocomo(kloc=50.0, mode_key="semi-detached")
    assert res.effort == 239.87
    assert res.time == 17.02
    assert res.staff == 14.09
    assert res.coefficients.a == 3.0
    assert res.coefficients.b == 1.12

def test_cocomo_organic():
    res = calculate_cocomo(kloc=10.0, mode_key="organic")
    assert res.effort > 0
    assert res.time > 0
    assert res.staff > 0
    assert res.coefficients.a == 2.4

def test_cocomo_embedded():
    res = calculate_cocomo(kloc=100.0, mode_key="embedded")
    assert res.effort > 0
    assert res.time > 0
    assert res.coefficients.a == 3.6

def test_invalid_mode_raises_error():
    with pytest.raises(ValueError):
        calculate_cocomo(kloc=20.0, mode_key="invalid-mode")
