from typing import Dict, List
from schemas.sdlc_schema import (
    SDLCModelInfo, SDLCSimulationRequest, SDLCSimulationResponse, SDLCSimulationStep
)

SDLC_MODELS: Dict[str, SDLCModelInfo] = {
    "waterfall": SDLCModelInfo(
        id="waterfall",
        name="Waterfall Model",
        description="A linear-sequential life cycle model where each phase must be completed before the next begins.",
        approach="Sequential phase-by-phase development with strict phase gates.",
        advantages=[
            "Simple and easy to understand and use.",
            "Phases are clearly defined and processed one at a time.",
            "Well-documented milestones and deliverables.",
            "Cost and schedule can be determined upfront."
        ],
        disadvantages=[
            "High risk and uncertainty in early stages.",
            "Not suitable for complex, changing, or object-oriented projects.",
            "Working software is delivered late in the life cycle.",
            "Difficult to accommodate scope changes once development starts."
        ],
        best_suited_for="Projects with stable, unambiguous, well-understood requirements (e.g. standard regulatory systems).",
        stages=[
            "Collecting software requirements",
            "Preparing system architecture",
            "Writing program code",
            "Testing the complete application",
            "Installing the software",
            "Providing maintenance and updates"
        ]
    ),
    "incremental": SDLCModelInfo(
        id="incremental",
        name="Incremental Model",
        description="Delivers the software in a succession of releases (increments), each adding operational functionality.",
        approach="Delivering the product in smaller usable releases with early feature exposure.",
        advantages=[
            "Generates working software quickly and early during the software life cycle.",
            "More flexible and less costly to change scope and requirements.",
            "Easier to test and debug during a smaller iteration.",
            "Lower initial delivery risk and early customer value realization."
        ],
        disadvantages=[
            "Requires good planning and modular design upfront.",
            "Total cost may be higher than waterfall if architecture lacks extensibility.",
            "Clear definition of complete system needed before breaking into pieces."
        ],
        best_suited_for="Major enterprise applications where core functionality must be deployed quickly.",
        stages=[
            "Release 1: Basic login and registration",
            "Release 2: Dashboard and report generation",
            "Release 3: Payment and notification features"
        ]
    ),
    "prototype": SDLCModelInfo(
        id="prototype",
        name="Prototyping Model",
        description="Creates an initial mock-up version of the software to clarify user requirements through iterative review.",
        approach="Building mock-ups, soliciting user feedback, and refining until requirements are stabilized.",
        advantages=[
            "Users are actively involved in the development and requirement validation.",
            "Errors are detected much earlier in the requirement phase.",
            "Missing functionality can be identified easily.",
            "Confusing or ambiguous user desires are clarified quickly."
        ],
        disadvantages=[
            "Can lead to scope creep or endless iterative loops.",
            "Users may mistake a rough prototype for the finished robust product.",
            "Developers may compromise quality to produce a fast prototype."
        ],
        best_suited_for="Interactive user-interface heavy systems where customers are uncertain of exact needs.",
        stages=[
            "Discussing initial user requirements",
            "Creating sample interface / mockups",
            "Showing prototype to user for evaluation",
            "Modifying requirements and design based on feedback",
            "Developing final application once approved",
            "Performing final testing",
            "Releasing completed software"
        ]
    ),
    "agile": SDLCModelInfo(
        id="agile",
        name="Agile / Scrum Model",
        description="Iterative and incremental development divided into time-boxed sprints (1-4 weeks) with continuous stakeholder feedback.",
        approach="Repeated sprint cycles with backlog prioritization, daily standups, and rapid delivery.",
        advantages=[
            "Highly adaptive to changing business priorities and customer feedback.",
            "Continuous delivery of valuable, working software in every sprint.",
            "Close daily collaboration between developers and business stakeholders.",
            "Continuous automated testing ensures high software quality."
        ],
        disadvantages=[
            "Requires experienced, disciplined, self-organizing teams.",
            "Difficult to assess final project costs and timelines at project inception.",
            "Less emphasis on formal heavy architectural documentation."
        ],
        best_suited_for="Dynamic web, mobile, SaaS, and start-up products with evolving requirements.",
        stages=[
            "Sprint Planning & Backlog Selection",
            "Sprint Development",
            "Continuous Testing & Integration",
            "Sprint Review & Demonstration",
            "Team Retrospective & Feedback"
        ]
    )
}

def get_all_sdlc_models() -> List[SDLCModelInfo]:
    return list(SDLC_MODELS.values())

def simulate_sdlc_execution(req: SDLCSimulationRequest) -> SDLCSimulationResponse:
    mid = req.model_id.strip().lower()
    if mid not in SDLC_MODELS:
        raise ValueError(f"Invalid model '{req.model_id}'. Allowed: waterfall, incremental, prototype, agile.")

    model = SDLC_MODELS[mid]
    steps: List[SDLCSimulationStep] = []
    sc = req.scenario or "Target Project"

    if mid == "waterfall":
        for i, stage in enumerate(model.stages, 1):
            steps.append(SDLCSimulationStep(
                step_number=i,
                phase=f"Phase {i}",
                activity=f"{stage} for {sc}",
                status="COMPLETED",
                deliverable=f"Approved Phase {i} Document & Verified Milestone"
            ))
        summary = f"Waterfall simulation finished: {sc} was developed through strict sequential phases. Final deliverable released after complete testing."

    elif mid == "incremental":
        step_counter = 1
        increments = [
            ("Increment 1", "Core authentication and student account registration"),
            ("Increment 2", "Student profiles, course enrollment, and attendance records"),
            ("Increment 3", "Examination grading, fee billing, and administrative reporting")
        ]
        for inc_name, feat in increments:
            steps.append(SDLCSimulationStep(
                step_number=step_counter,
                phase=inc_name,
                activity=f"Planning & Architecture for {feat}",
                status="COMPLETED",
                deliverable=f"{inc_name} Functional Design"
            ))
            step_counter += 1
            steps.append(SDLCSimulationStep(
                step_number=step_counter,
                phase=inc_name,
                activity=f"Developing & Testing: {feat}",
                status="COMPLETED",
                deliverable=f"{inc_name} Working Binary Deployed"
            ))
            step_counter += 1
        summary = f"Incremental simulation finished: {sc} was successfully delivered across 3 iterative production increments."

    elif mid == "prototype":
        rounds = max(1, min(req.prototype_satisfaction_round or 2, 4))
        step_counter = 1
        steps.append(SDLCSimulationStep(
            step_number=step_counter,
            phase="Requirement Elicitation",
            activity=f"Discussing initial requirements for {sc} with stakeholders",
            status="COMPLETED",
            deliverable="Initial User Needs Brief"
        ))
        step_counter += 1

        for r in range(1, rounds + 1):
            steps.append(SDLCSimulationStep(
                step_number=step_counter,
                phase=f"Prototype v{r}.0",
                activity=f"Building interactive UI mockup for {sc} (Round {r})",
                status="COMPLETED",
                deliverable=f"Clickable Prototype Version {r}.0"
            ))
            step_counter += 1

            if r < rounds:
                steps.append(SDLCSimulationStep(
                    step_number=step_counter,
                    phase=f"Stakeholder Review {r}",
                    activity="User feedback: Needs workflow adjustments and additional field validations.",
                    status="REVISE",
                    deliverable=f"Feedback Log #{r} for Next Iteration"
                ))
            else:
                steps.append(SDLCSimulationStep(
                    step_number=step_counter,
                    phase=f"Final Approval",
                    activity="Stakeholder evaluation: Prototype approved. All requirements validated.",
                    status="APPROVED",
                    deliverable="Signed Functional Specification"
                ))
            step_counter += 1

        steps.append(SDLCSimulationStep(
            step_number=step_counter,
            phase="Full Construction",
            activity=f"Engineering production backend and enterprise database for {sc}",
            status="COMPLETED",
            deliverable="Production Certified Release"
        ))
        summary = f"Prototyping simulation completed: Requirements stabilized after {rounds} mock-up iterations, followed by production engineering."

    else:  # agile
        sprints = [
            ("Sprint 1 (Weeks 1-2)", "Student registration & authentication workflows"),
            ("Sprint 2 (Weeks 3-4)", "Course enrollment & faculty assignment services"),
            ("Sprint 3 (Weeks 5-6)", "Automated attendance tracking & mark entry module"),
            ("Sprint 4 (Weeks 7-8)", "Academic transcript generation & student analytics")
        ]
        step_counter = 1
        for sprint_name, focus in sprints:
            steps.append(SDLCSimulationStep(
                step_number=step_counter,
                phase=sprint_name,
                activity=f"Backlog selection & TDD development of {focus}",
                status="COMPLETED",
                deliverable=f"Potentially Shippable Product Increment ({sprint_name})"
            ))
            step_counter += 1
            steps.append(SDLCSimulationStep(
                step_number=step_counter,
                phase=f"{sprint_name} Review",
                activity=f"Live sprint demonstration and velocity retrospective for {sc}",
                status="COMPLETED",
                deliverable="Accepted User Stories & Updated Burn-down Chart"
            ))
            step_counter += 1
        summary = f"Agile Scrum simulation completed: {sc} successfully delivered 4 production sprints with continuous stakeholder feedback."

    return SDLCSimulationResponse(
        model_id=model.id,
        model_name=model.name,
        scenario=sc,
        steps=steps,
        summary=summary
    )

