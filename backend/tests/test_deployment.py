import pytest
from services.deployment_service import (
    simulate_blue_green,
    simulate_canary,
    simulate_rolling_update
)

def test_blue_green_switch_and_rollback():
    # Initial state (Blue active)
    init_state = simulate_blue_green(switch_to_green=False)
    assert init_state.active_environment == "Blue"
    assert init_state.traffic_blue == 100

    # Switch to Green
    switched = simulate_blue_green(switch_to_green=True, green_healthy=True)
    assert switched.active_environment == "Green"
    assert switched.traffic_green == 100
    assert switched.can_rollback is True

    # Failed health check blocks switch
    blocked = simulate_blue_green(switch_to_green=True, green_healthy=False)
    assert blocked.active_environment == "Blue"
    assert blocked.traffic_blue == 100

def test_canary_rollout():
    # 0% canary
    c0 = simulate_canary(0)
    assert c0.traffic_v1 == 100
    assert c0.traffic_v2 == 0

    # 25% canary
    c25 = simulate_canary(25)
    assert c25.traffic_v1 == 75
    assert c25.traffic_v2 == 25
    assert c25.health == "Healthy"

    # 100% canary
    c100 = simulate_canary(100)
    assert c100.traffic_v1 == 0
    assert c100.traffic_v2 == 100

def test_rolling_update():
    # Initial step 0
    r0 = simulate_rolling_update(total_servers=6, batch_size=2, current_step=0)
    assert r0.updated_servers == 0
    assert r0.is_complete is False

    # Step 1 (2 updated)
    r1 = simulate_rolling_update(total_servers=6, batch_size=2, current_step=1)
    assert r1.updated_servers == 2
    assert r1.remaining_servers == 4

    # Final step 3 (all 6 updated)
    r3 = simulate_rolling_update(total_servers=6, batch_size=2, current_step=3)
    assert r3.updated_servers == 6
    assert r3.is_complete is True
