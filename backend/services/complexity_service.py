from typing import Dict, Any, List, Optional
from schemas.complexity_schema import (
    ComplexityResponse,
    ComplexityExample,
    GraphVisualizationData,
    GraphNode,
    GraphEdge
)

def evaluate_risk(vg: int) -> tuple[str, str, str]:
    """
    Returns (risk_level, interpretation, recommendation) according to McCabe's metrics.
    """
    if vg <= 10:
        risk_level = "Low Risk (Simple)"
        interpretation = (
            f"V(G) = {vg}: The program has simple control flow with high testability. "
            "A small set of basis test paths is sufficient to achieve complete branch coverage."
        )
        recommendation = "Maintain current architecture; straightforward unit testing is sufficient."
    elif vg <= 20:
        risk_level = "Moderate Risk (Moderate Complexity)"
        interpretation = (
            f"V(G) = {vg}: Moderate structural complexity. The program contains multiple branches or loops. "
            "Defect risk is moderate, and testing requires systematic path coverage."
        )
        recommendation = "Review branch logic and consider breaking complex helper routines into sub-functions."
    elif vg <= 50:
        risk_level = "High Risk (Complex)"
        interpretation = (
            f"V(G) = {vg}: High structural complexity. The code contains deeply nested decisions or loops, "
            "making manual reasoning and automated test design significantly more error-prone."
        )
        recommendation = "Refactoring strongly recommended. Decompose large methods into cohesive smaller modules."
    else:
        risk_level = "Very High Risk (Untestable)"
        interpretation = (
            f"V(G) = {vg}: Extreme complexity. The software entity is considered practically untestable "
            "due to combinatorial explosion of execution paths."
        )
        recommendation = "Immediate modularization and architectural refactoring mandatory before deployment."

    return risk_level, interpretation, recommendation


def generate_generic_graph(nodes: int, edges: int) -> GraphVisualizationData:
    """
    Generates a generic SVG layout for a graph with N nodes and E edges.
    """
    node_list: List[GraphNode] = []
    edge_list: List[GraphEdge] = []

    # Lay out nodes in a clean vertical or grid fashion
    cols = 2 if nodes > 4 else 1
    for i in range(1, nodes + 1):
        if cols == 1:
            cx = 200
            cy = 40 + (i - 1) * 70
        else:
            col = (i - 1) % 2
            row = (i - 1) // 2
            cx = 120 + col * 160
            cy = 40 + row * 70

        node_type = "start" if i == 1 else ("end" if i == nodes else "statement")
        node_list.append(
            GraphNode(
                id=f"N{i}",
                label=f"N{i}",
                x=cx,
                y=cy,
                type=node_type
            )
        )

    # Connect nodes sequentially first, then add extra branch/cycle edges
    created_edges = 0
    for i in range(1, nodes):
        if created_edges < edges:
            edge_list.append(GraphEdge(source=f"N{i}", target=f"N{i+1}", label="flow"))
            created_edges += 1

    # If additional edges exist (e.g. branches or loops), link them cleanly
    curr_source = 1
    curr_target = nodes
    while created_edges < edges:
        edge_list.append(
            GraphEdge(
                source=f"N{curr_source}",
                target=f"N{curr_target}",
                label=f"branch {created_edges + 1}"
            )
        )
        created_edges += 1
        curr_source = (curr_source % (nodes - 1)) + 1
        curr_target = max(1, curr_target - 1)

    return GraphVisualizationData(nodes=node_list, edges=edge_list)


def calculate_complexity(nodes: int, edges: int, components: int = 1) -> ComplexityResponse:
    """
    Calculates McCabe Cyclomatic Complexity V(G) = E - N + 2P with input validation.
    """
    # Mathematical and structural validation
    # 1. Forest of P components with N vertices requires minimum E >= N - P edges.
    min_edges_required = nodes - components
    if edges < min_edges_required:
        return ComplexityResponse(
            nodes=nodes,
            edges=edges,
            components=components,
            cyclomatic_complexity=0,
            formula="V(G) = E - N + 2P",
            steps=[
                f"Validation Error: Inconsistent graph values.",
                f"For {nodes} node(s) and {components} component(s), minimum edges required is E >= (N - P) = ({nodes} - {components}) = {min_edges_required}.",
                f"Specified edges E = {edges} is mathematically impossible for the requested number of components."
            ],
            independent_paths=0,
            risk_level="Invalid Input",
            interpretation="The specified values do not form a valid or consistent Control Flow Graph.",
            recommendation="Ensure that the number of edges is at least (Nodes - Components).",
            valid=False,
            error_message=f"Inconsistent graph: E ({edges}) cannot be less than N - P ({nodes} - {components} = {min_edges_required})."
        )

    # 2. Maximum reasonable edges check for CFG
    max_reasonable_edges = nodes * (nodes + 1)
    if edges > max_reasonable_edges:
        return ComplexityResponse(
            nodes=nodes,
            edges=edges,
            components=components,
            cyclomatic_complexity=0,
            formula="V(G) = E - N + 2P",
            steps=[
                f"Validation Error: Edge count E = {edges} exceeds the maximum realistic upper bound ({max_reasonable_edges}) for {nodes} nodes."
            ],
            independent_paths=0,
            risk_level="Invalid Input",
            interpretation="Edge density is excessively high for a valid software Control Flow Graph.",
            recommendation="Review the graph model to ensure edges represent actual program branches.",
            valid=False,
            error_message="Excessive edge count for the given number of nodes."
        )

    # Cyclomatic Complexity Formula: V(G) = E - N + 2P
    # Step-by-step arithmetic
    term_p = 2 * components
    term_diff = edges - nodes
    vg = term_diff + term_p

    steps = [
        "1. Identify input graph parameters:",
        f"   • Nodes (N) = {nodes}",
        f"   • Edges (E) = {edges}",
        f"   • Connected Components (P) = {components}",
        "2. Apply McCabe's Cyclomatic Complexity Formula:",
        "   V(G) = E - N + 2P",
        "3. Substitute parameter values into the formula:",
        f"   V(G) = {edges} - {nodes} + 2({components})",
        f"   V(G) = ({edges} - {nodes}) + {term_p}",
        f"   V(G) = {term_diff} + {term_p}",
        f"4. Result: V(G) = {vg}",
        f"5. Independent Paths: The program contains exactly {vg} linearly independent execution paths."
    ]

    risk_level, interpretation, recommendation = evaluate_risk(vg)
    graph_data = generate_generic_graph(nodes, edges)

    return ComplexityResponse(
        nodes=nodes,
        edges=edges,
        components=components,
        cyclomatic_complexity=vg,
        formula="V(G) = E - N + 2P",
        steps=steps,
        independent_paths=vg,
        risk_level=risk_level,
        interpretation=interpretation,
        recommendation=recommendation,
        valid=True,
        error_message=None,
        graph_representation=graph_data
    )


def get_predefined_examples() -> List[ComplexityExample]:
    """
    Returns curated textbook software engineering examples of Control Flow Graphs.
    """
    return [
        ComplexityExample(
            id="example-sequential",
            name="Sequential Statements (Linear Flow)",
            category="Basic",
            description="Pure sequential execution with no branches, conditionals, or loops. Exactly one path.",
            nodes=4,
            edges=3,
            components=1,
            expected_vg=1,
            pseudocode=(
                "start();\n"
                "x = 10;\n"
                "y = x * 2;\n"
                "return y;"
            ),
            graph_representation=GraphVisualizationData(
                nodes=[
                    GraphNode(id="N1", label="1: Start", x=200, y=40, type="start"),
                    GraphNode(id="N2", label="2: x = 10", x=200, y=110, type="statement"),
                    GraphNode(id="N3", label="3: y = x * 2", x=200, y=180, type="statement"),
                    GraphNode(id="N4", label="4: Return y", x=200, y=250, type="end"),
                ],
                edges=[
                    GraphEdge(source="N1", target="N2", label="next"),
                    GraphEdge(source="N2", target="N3", label="next"),
                    GraphEdge(source="N3", target="N4", label="next"),
                ]
            )
        ),
        ComplexityExample(
            id="example-ifelse",
            name="Single If-Else Conditional",
            category="Branching",
            description="A binary decision predicate branching into two alternative execution paths before merging.",
            nodes=4,
            edges=4,
            components=1,
            expected_vg=2,
            pseudocode=(
                "start();\n"
                "if (score >= 50) {\n"
                "    status = 'PASS';\n"
                "} else {\n"
                "    status = 'FAIL';\n"
                "}\n"
                "return status;"
            ),
            graph_representation=GraphVisualizationData(
                nodes=[
                    GraphNode(id="N1", label="1: if (score >= 50)", x=200, y=40, type="decision"),
                    GraphNode(id="N2", label="2: status = 'PASS'", x=120, y=120, type="statement"),
                    GraphNode(id="N3", label="3: status = 'FAIL'", x=280, y=120, type="statement"),
                    GraphNode(id="N4", label="4: return status", x=200, y=200, type="end"),
                ],
                edges=[
                    GraphEdge(source="N1", target="N2", label="True"),
                    GraphEdge(source="N1", target="N3", label="False"),
                    GraphEdge(source="N2", target="N4", label="merge"),
                    GraphEdge(source="N3", target="N4", label="merge"),
                ]
            )
        ),
        ComplexityExample(
            id="example-while-loop",
            name="While Loop (Iteration / Cycle)",
            category="Iteration",
            description="A loop condition creating a backward edge (cycle) in the control flow graph.",
            nodes=4,
            edges=4,
            components=1,
            expected_vg=2,
            pseudocode=(
                "start();\n"
                "while (count < 10) {\n"
                "    count++;\n"
                "}\n"
                "return count;"
            ),
            graph_representation=GraphVisualizationData(
                nodes=[
                    GraphNode(id="N1", label="1: init count = 0", x=200, y=40, type="start"),
                    GraphNode(id="N2", label="2: while (count < 10)", x=200, y=110, type="decision"),
                    GraphNode(id="N3", label="3: count++", x=200, y=180, type="statement"),
                    GraphNode(id="N4", label="4: return count", x=200, y=260, type="end"),
                ],
                edges=[
                    GraphEdge(source="N1", target="N2", label="entry"),
                    GraphEdge(source="N2", target="N3", label="True (Loop)"),
                    GraphEdge(source="N3", target="N2", label="Back Edge"),
                    GraphEdge(source="N2", target="N4", label="False (Exit)"),
                ]
            )
        ),
        ComplexityExample(
            id="example-nested-decision",
            name="Nested Decision (If-Else inside If)",
            category="Complex Branching",
            description="Two sequential decision predicates producing 3 linearly independent basis paths.",
            nodes=6,
            edges=7,
            components=1,
            expected_vg=3,
            pseudocode=(
                "if (a > 0) {\n"
                "    if (b > 0) {\n"
                "        res = 1;\n"
                "    } else {\n"
                "        res = 2;\n"
                "    }\n"
                "} else {\n"
                "    res = 3;\n"
                "}\n"
                "return res;"
            ),
            graph_representation=GraphVisualizationData(
                nodes=[
                    GraphNode(id="N1", label="1: if (a > 0)", x=200, y=40, type="decision"),
                    GraphNode(id="N2", label="2: if (b > 0)", x=120, y=110, type="decision"),
                    GraphNode(id="N3", label="3: res = 3", x=280, y=110, type="statement"),
                    GraphNode(id="N4", label="4: res = 1", x=70, y=180, type="statement"),
                    GraphNode(id="N5", label="5: res = 2", x=170, y=180, type="statement"),
                    GraphNode(id="N6", label="6: return res", x=200, y=260, type="end"),
                ],
                edges=[
                    GraphEdge(source="N1", target="N2", label="True"),
                    GraphEdge(source="N1", target="N3", label="False"),
                    GraphEdge(source="N2", target="N4", label="True"),
                    GraphEdge(source="N2", target="N5", label="False"),
                    GraphEdge(source="N3", target="N6", label="merge"),
                    GraphEdge(source="N4", target="N6", label="merge"),
                    GraphEdge(source="N5", target="N6", label="merge"),
                ]
            )
        ),
        ComplexityExample(
            id="example-multicomponent",
            name="Multi-Component Program (P = 2)",
            category="Multi-Module",
            description="Two disconnected independent routines (or caller/callee components) evaluated together.",
            nodes=8,
            edges=8,
            components=2,
            expected_vg=4,
            pseudocode=(
                "// Component 1: checkAuth(user)\n"
                "if (user.isValid()) return true; else return false;\n\n"
                "// Component 2: formatData(raw)\n"
                "if (raw != null) return raw.trim(); else return '';"
            ),
            graph_representation=GraphVisualizationData(
                nodes=[
                    # Component 1
                    GraphNode(id="N1", label="C1.1: Start Auth", x=120, y=40, type="start"),
                    GraphNode(id="N2", label="C1.2: isValid()", x=120, y=100, type="decision"),
                    GraphNode(id="N3", label="C1.3: true", x=70, y=160, type="statement"),
                    GraphNode(id="N4", label="C1.4: false", x=170, y=160, type="end"),
                    # Component 2
                    GraphNode(id="N5", label="C2.1: Start Data", x=280, y=40, type="start"),
                    GraphNode(id="N6", label="C2.2: raw != null", x=280, y=100, type="decision"),
                    GraphNode(id="N7", label="C2.3: trim()", x=230, y=160, type="statement"),
                    GraphNode(id="N8", label="C2.4: empty", x=330, y=160, type="end"),
                ],
                edges=[
                    # C1 Edges
                    GraphEdge(source="N1", target="N2", label=""),
                    GraphEdge(source="N2", target="N3", label="T"),
                    GraphEdge(source="N2", target="N4", label="F"),
                    GraphEdge(source="N3", target="N4", label=""),
                    # C2 Edges
                    GraphEdge(source="N5", target="N6", label=""),
                    GraphEdge(source="N6", target="N7", label="T"),
                    GraphEdge(source="N6", target="N8", label="F"),
                    GraphEdge(source="N7", target="N8", label=""),
                ]
            )
        )
    ]

