# Software Quality and Testing Simulator

A modern, interactive web-based application designed to demonstrate fundamental concepts of **Software Engineering, Software Quality Assurance, and Software Testing** through practical simulations.

Built with a clean, high-contrast **Black & White monochrome interface**, the application integrates four essential software engineering concepts into a unified platform, allowing users to explore calculations, validate test cases, estimate development costs, and understand modern deployment strategies.

## 🚀 Live Application

**Access the deployed application here:**

[Software Quality and Testing Simulator](https://software-testing-simulator.vercel.app)

The application is publicly accessible through its deployed web interface.

---

## 🧪 Core Simulation Modules

The application consists of four interactive modules:

1. **Cyclomatic Complexity Calculator** – Measures program complexity and estimates the number of independent execution paths.
2. **Black-Box Testing Simulator** – Demonstrates Boundary Value Analysis (BVA) and Equivalence Partitioning (EP).
3. **Basic COCOMO Cost Estimator** – Calculates software development effort, estimated duration, and average team size.
4. **Release & Deployment Strategies Simulator** – Demonstrates Blue-Green Deployment, Canary Releases, and Rolling Updates.

---

## 📋 Module Specifications

### 1. Cyclomatic Complexity Calculator

Cyclomatic Complexity is a software metric used to measure the logical complexity of a program by calculating the number of independent paths through its control flow graph.

**Formula:**

\[
V(G) = E - N + 2P
\]

Where:
- **E:** Number of edges in the control flow graph.
- **N:** Number of nodes in the control flow graph.
- **P:** Number of connected components.

**Simulation Scenarios:**

| Scenario | Nodes (N) | Edges (E) | Components (P) | Complexity |
|---|---:|---:|---:|---:|
| Sequential Code | 4 | 3 | 1 | **1** |
| If-Else Decision | 4 | 4 | 1 | **2** |
| While Loop | 4 | 4 | 1 | **2** |
| Nested Decisions | 6 | 7 | 1 | **3** |
| Multi-Module | 8 | 8 | 2 | **4** |
| Inconsistent Graph | 5 | 2 | 1 | **Invalid** |

The module also provides a visual representation of the Control Flow Graph (CFG), helping users understand nodes, edges, decision points, and execution paths.

### 2. Black-Box Testing Simulator

Black-Box Testing is a software testing technique in which the functionality of an application is verified without examining its internal source code.

This module uses a **Marks-to-Grade Conversion System** to demonstrate two important black-box testing techniques.

**Grading Specification:**

| Marks Range | Expected Grade | Description |
|---|---|---|
| 90–100 | Grade A | Distinction |
| 80–89 | Grade B | Very Good |
| 70–79 | Grade C | Good |
| 60–69 | Grade D | Satisfactory / Pass |
| 0–59 | Grade F | Fail |
| Outside 0–100 | INVALID | Invalid Input |

**A. Boundary Value Analysis (BVA)**

BVA focuses on testing values at, immediately below, and immediately above the boundaries of an input range.

| Test ID | Input | Expected Output |
|---|---:|---|
| BVA-01 | -1 | INVALID |
| BVA-02 | 0 | Grade F |
| BVA-03 | 1 | Grade F |
| BVA-05 | 59 | Grade F |
| BVA-06 | 60 | Grade D |
| BVA-12 | 90 | Grade A |
| BVA-14 | 100 | Grade A |
| BVA-15 | 101 | INVALID |

**B. Equivalence Partitioning (EP)**

EP divides input data into groups or classes that are expected to behave similarly. Instead of testing every possible input, representative values from each class are selected.

| Test ID | Input | Expected Output | Equivalence Class |
|---|---:|---|---|
| EP-01 | -15 | INVALID | Negative Numbers |
| EP-02 | 35 | Grade F | Valid Failing Marks |
| EP-03 | 65 | Grade D | Satisfactory Marks |
| EP-04 | 75 | Grade C | Average Marks |
| EP-05 | 85 | Grade B | High Marks |
| EP-06 | 95 | Grade A | Distinction Marks |
| EP-07 | 115 | INVALID | Excess Marks |
| EP-08 | "abc" | INVALID | Non-Numeric Input |

The simulator helps users understand how test cases are designed, executed, and classified based on expected application behaviour.

### 3. Basic COCOMO Cost Estimation

The Constructive Cost Model (COCOMO) is a software cost estimation model used to predict the effort, development time, and staffing requirements of a software project.

The simulator implements the Basic COCOMO model using three project categories.

**Estimation Formulas:**

**Development Effort:**

\[
E = a \times (KLOC)^b
\]

**Development Time:**

\[
T = c \times (E)^d
\]

**Average Team Size:**

\[
P = \frac{E}{T}
\]

Where:
- **E:** Estimated effort in person-months.
- **T:** Development duration in months.
- **P:** Average number of developers.
- **KLOC:** Thousands of Lines of Code.
- **a, b, c, d:** Model-specific constants.

**Project Categories:**

| Project Mode | a | b | c | d | Characteristics |
|---|---:|---:|---:|---:|---|
| Organic | 2.4 | 1.05 | 2.5 | 0.38 | Small and relatively simple projects |
| Semi-detached | 3.0 | 1.12 | 2.5 | 0.35 | Medium-sized projects with mixed experience |
| Embedded | 3.6 | 1.20 | 2.5 | 0.32 | Complex projects with strict constraints |

**Benchmark Example: 50 KLOC Semi-detached Project**

- Estimated Effort: **239.87 Person-Months**
- Development Duration: **17.02 Months**
- Average Team Size: **14.09 Persons**

The module allows users to explore how project size and complexity influence software development resources and timelines.

### 4. Release & Deployment Strategies Simulator

This module demonstrates three commonly used software deployment strategies and explains how software updates can be delivered while maintaining application availability.

**A. Blue-Green Deployment**

- Maintains two parallel environments: Blue (current version) and Green (new version).
- Live traffic initially operates through the Blue environment.
- The Green environment is prepared and verified before release.
- Traffic is switched to Green after successful validation.
- Provides a straightforward rollback mechanism by switching traffic back to Blue.

**B. Canary Release**

- Introduces a new software version to a small percentage of users.
- Gradually increases traffic allocation, for example, 10% → 25% → 50% → 100%.
- Monitors application performance, errors, and system health.
- Helps identify potential issues before a full-scale release.

**C. Rolling Update**

- Replaces existing application instances with updated versions in batches.
- Maintains service availability while updates are performed.
- Allows continuous deployment without replacing the entire application simultaneously.
- Supports controlled and incremental software upgrades.

---

## 🛠️ Technology Stack

The application follows a modern frontend-backend architecture.

| Technology | Purpose |
|---|---|
| React.js | Interactive frontend development |
| Vite | Frontend development and build tooling |
| Python | Backend programming |
| FastAPI | REST API development and backend processing |
| Pytest | Automated unit and API testing |
| SVG | Vector-based control flow graph visualization |

### Application Architecture

The project uses a frontend-backend architecture in which React handles the user interface and interactions, while FastAPI manages backend operations, calculations, and API communication.

This separation improves modularity, maintainability, and scalability.

---

## 🧪 Software Testing & Quality Assurance

The project includes an automated test suite consisting of **22 automated tests** covering:

- Mathematical calculation formulas.
- Input validation and boundary conditions.
- Equivalence partitioning scenarios.
- Backend API endpoints.
- Expected outputs and error-handling behaviour.

These tests help verify the correctness and reliability of the application's core functionality.

---

## 🎨 UI/UX Design Philosophy

The application follows a minimalist **Black & White Monochrome Design System**, emphasizing readability, consistency, and functionality.

**Design Characteristics:**

- **Colour Palette:** Deep Jet Black (`#09090b`), Pure White (`#ffffff`), and Neutral Slate (`#e4e4e7`).
- **Typography:** Inter for interface text and JetBrains Mono for technical values and code.
- **Visualizations:** SVG-based Control Flow Graphs featuring circular nodes, decision diamonds, and directional arrows.
- **Interface:** High-contrast surfaces, clean layouts, and interactive simulation components.

The overall design aims to provide a distraction-free environment for understanding complex software engineering concepts.

---

## 🎯 Project Objective

The primary objective of the Software Quality and Testing Simulator is to transform theoretical software engineering concepts into practical, interactive learning experiences.

By integrating software complexity measurement, black-box testing techniques, cost estimation models, and deployment strategies, the project provides a unified educational platform for students to understand important aspects of software development and quality assurance.

**The project demonstrates the practical application of software engineering principles through interactive simulations, structured calculations, and automated testing.**
