import math
from schemas.cocomo_schema import CocomoResponse, CocomoCoefficients

COCOMO_MODES = {
    "organic": {
        "name": "Organic Mode",
        "a": 2.4,
        "b": 1.05,
        "c": 2.5,
        "d": 0.38,
        "desc": "Small, well-understood software projects handled by experienced, stable teams in familiar environments.",
        "rec": "Minimal overhead needed. Good for internal utilities, business tools, or routine application development."
    },
    "semi-detached": {
        "name": "Semi-Detached Mode",
        "a": 3.0,
        "b": 1.12,
        "c": 2.5,
        "d": 0.35,
        "desc": "Medium-sized projects with mixed team experience and moderately stringent requirements (e.g., DBMS, compilers, operating utilities).",
        "rec": "Standard structured project management required with scheduled milestone reviews."
    },
    "embedded": {
        "name": "Embedded Mode",
        "a": 3.6,
        "b": 1.20,
        "c": 2.5,
        "d": 0.32,
        "desc": "Complex systems constrained by tight hardware, software, regulatory, or operational specifications (e.g., avionics, ATM controllers).",
        "rec": "Requires rigorous testing, strict configuration management, and specialized engineering personnel."
    }
}

def calculate_cocomo(kloc: float, mode_key: str, cost_per_pm: float = 5000.0) -> CocomoResponse:
    key = mode_key.strip().lower()
    if key not in COCOMO_MODES:
        raise ValueError(f"Invalid mode '{mode_key}'. Allowed: 'organic', 'semi-detached', 'embedded'.")

    params = COCOMO_MODES[key]
    a, b, c, d = params["a"], params["b"], params["c"], params["d"]

    # Basic COCOMO Equations:
    # Effort (Person-Months): E = a * (KLOC)^b
    effort = a * math.pow(kloc, b)

    # Development Time (Months): T = c * (E)^d
    time = c * math.pow(effort, d)

    # Average Staff Size (Persons): Staff = E / T
    staff = effort / time if time > 0 else 0

    # Total Cost = Effort * Cost per person-month
    total_cost = effort * cost_per_pm

    # Productivity (KLOC / person-month)
    productivity = kloc / effort if effort > 0 else 0

    steps = [
        f"1. Identify project mode parameters for {params['name']}:",
        f"   • a = {a}, b = {b}, c = {c}, d = {d}",
        f"   • Software Size = {kloc:.2f} KLOC",
        f"2. Calculate Development Effort (Person-Months):",
        f"   E = a × (KLOC)^b = {a} × ({kloc:.2f})^{b}",
        f"   E = {a} × {math.pow(kloc, b):.4f} = {effort:.2f} person-months",
        f"3. Calculate Project Duration / Development Time (Months):",
        f"   T = c × (E)^d = {c} × ({effort:.2f})^{d}",
        f"   T = {c} × {math.pow(effort, d):.4f} = {time:.2f} months",
        f"4. Calculate Average Staff Requirement (Persons):",
        f"   Staff = E / T = {effort:.2f} / {time:.2f} = {staff:.2f} persons",
        f"5. Estimated Total Project Cost:",
        f"   Cost = E × Rate = {effort:.2f} PM × ${cost_per_pm:,.2f} = ${total_cost:,.2f}"
    ]

    return CocomoResponse(
        kloc=kloc,
        mode=key,
        mode_name=params["name"],
        coefficients=CocomoCoefficients(a=a, b=b, c=c, d=d),
        effort=round(effort, 2),
        time=round(time, 2),
        staff=round(staff, 2),
        estimated_cost=round(total_cost, 2),
        productivity=round(productivity, 4),
        formula_steps=steps,
        description=params["desc"],
        recommendation=params["rec"]
    )

