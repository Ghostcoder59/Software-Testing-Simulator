import math
from schemas.deployment_schema import (
    BlueGreenResponse,
    CanaryResponse,
    RollingUpdateResponse,
    ServerInstance
)

def simulate_blue_green(switch_to_green: bool, green_healthy: bool = True) -> BlueGreenResponse:
    if switch_to_green:
        if not green_healthy:
            return BlueGreenResponse(
                active_environment="Blue",
                active_version="1.0",
                idle_environment="Green",
                idle_version="2.0",
                traffic_blue=100,
                traffic_green=0,
                can_rollback=False,
                status_message="Switch blocked! Green environment health check failed. Traffic remains 100% on Blue."
            )
        return BlueGreenResponse(
            active_environment="Green",
            active_version="2.0",
            idle_environment="Blue",
            idle_version="1.0",
            traffic_blue=0,
            traffic_green=100,
            can_rollback=True,
            status_message="Traffic router switched 100% traffic to Green (v2.0). Blue (v1.0) is idle and ready for instant rollback."
        )
    else:
        return BlueGreenResponse(
            active_environment="Blue",
            active_version="1.0",
            idle_environment="Green",
            idle_version="2.0",
            traffic_blue=100,
            traffic_green=0,
            can_rollback=False,
            status_message="Production is running on Blue (v1.0). Green (v2.0) is deployed in staging for smoke testing."
        )

def simulate_canary(percentage: int, simulate_error: bool = False) -> CanaryResponse:
    p = max(0, min(100, percentage))
    traffic_v1 = 100 - p
    traffic_v2 = p

    if simulate_error and p > 0:
        error_rate = round(min(25.0, p * 0.4 + 4.5), 1)
        health = "Degraded" if error_rate > 10 else "Warning"
        status_msg = f"Canary version (v2.0) is showing elevated error rate ({error_rate}%). Rollback recommended!"
        rec = "Halt progressive rollout. Revert traffic to 100% v1.0 and inspect error logs."
    elif p == 0:
        error_rate = 0.0
        health = "Healthy"
        status_msg = "Canary rollout stopped. All 100% of user traffic is safely routed to stable v1.0."
        rec = "Ready to begin canary deployment. Start by routing 10% of users to v2.0."
    elif p < 100:
        error_rate = 0.1
        health = "Healthy"
        status_msg = f"Canary testing active: {p}% of users receiving new v2.0, {traffic_v1}% on stable v1.0."
        rec = f"Metrics are stable with {error_rate}% errors. Safe to advance traffic percentage."
    else:
        error_rate = 0.1
        health = "Healthy"
        status_msg = "Canary release complete! 100% of production traffic has successfully migrated to v2.0."
        rec = "Decommission v1.0 instances. Full deployment successful."

    return CanaryResponse(
        percentage=p,
        traffic_v1=traffic_v1,
        traffic_v2=traffic_v2,
        version_1_status="Stable (Active)" if traffic_v1 > 0 else "Decommissioned",
        version_2_status="Canary (Active)" if p < 100 and p > 0 else ("Full Production" if p == 100 else "Idle"),
        error_rate=error_rate,
        health=health,
        status_message=status_msg,
        recommended_action=rec
    )

def simulate_rolling_update(total_servers: int = 6, batch_size: int = 2, current_step: int = 0) -> RollingUpdateResponse:
    n = max(1, min(20, total_servers))
    batch = max(1, min(n, batch_size))
    total_steps = math.ceil(n / batch)
    step = max(0, min(total_steps, current_step))

    updated_count = min(n, step * batch)
    remaining = n - updated_count
    is_complete = updated_count >= n

    server_list = []
    for i in range(1, n + 1):
        if i <= updated_count:
            server_list.append(ServerInstance(server_id=i, version="v2.0", status="Active (v2.0)"))
        elif i <= updated_count + (0 if is_complete else batch) and step < total_steps:
            server_list.append(ServerInstance(server_id=i, version="v1.0", status="Active (v1.0)"))
        else:
            server_list.append(ServerInstance(server_id=i, version="v1.0", status="Active (v1.0)"))

    if is_complete:
        msg = f"Rolling update finished! All {n} server instances have been upgraded to Version 2.0 with zero downtime."
    elif step == 0:
        msg = f"Ready to start rolling update across {n} servers in batches of {batch}. All servers running Version 1.0."
    else:
        msg = f"Step {step}/{total_steps} completed: {updated_count} servers upgraded to v2.0, {remaining} servers still serving v1.0."

    return RollingUpdateResponse(
        total_servers=n,
        batch_size=batch,
        current_step=step,
        total_steps=total_steps,
        updated_servers=updated_count,
        remaining_servers=remaining,
        is_complete=is_complete,
        servers=server_list,
        status_message=msg
    )

