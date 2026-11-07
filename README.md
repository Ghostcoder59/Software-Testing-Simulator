# Software Quality and Testing Simulator

A modern, high-contrast **Black & White** web application developed for college Software Engineering laboratory practicals.

It features four interactive simulation modules:
1. **Cyclomatic Complexity Calculator** ($V(G) = E - N + 2P$)
2. **Black-Box Testing Simulator** (Boundary Value Analysis & Equivalence Partitioning)
3. **Basic COCOMO Cost Model** (Software Effort, Schedule Duration, and Staffing Estimation)
4. **Release & Deployment Strategies** (Blue-Green, Canary Progressive Delivery, and Rolling Updates)

---

## ⚡ How to Run the Project (Windows 11 / VS Code)

You can run the project in **Development Mode** (Hot Reloading) or in **Unified Production Mode** (Single Port).

### Option 1: Standard Development Mode (Recommended for Development)

Open VS Code and press `` Ctrl + ` `` to open PowerShell. Use **two terminal tabs**:

#### Terminal 1 — Start FastAPI Backend:
```powershell
cd "c:\Users\Lenovo\Downloads\SE PROJECT\backend"
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
```
- **Backend API:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

#### Terminal 2 — Start React Frontend:
```powershell
cd "c:\Users\Lenovo\Downloads\SE PROJECT\frontend"
npm run dev
```
- **Web Interface:** Open **[http://localhost:5173](http://localhost:5173)** in your browser.
- Look for the top-right pill: **`● Backend Online (FastAPI)`**.

---

### Option 2: Unified Single-Server Mode (Runs on a Single Port)

You can build the React frontend into static assets and let FastAPI serve both the frontend and API simultaneously on port 8000:

```powershell
cd "c:\Users\Lenovo\Downloads\SE PROJECT"

# 1. Build React frontend
npm run build --prefix frontend

# 2. Start FastAPI (serves both React UI and REST API on port 8000)
.\backend\venv\Scripts\uvicorn.exe main:app --app-dir backend --port 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser!

---

## 🧪 Running Automated Unit Tests

To run the complete automated test suite (22 automated tests covering calculation formulas, boundary checks, and API endpoints):

```powershell
cd "c:\Users\Lenovo\Downloads\SE PROJECT"
.\backend\venv\Scripts\pytest.exe backend\tests -v
```

---

## 🚀 How to Deploy the Application

### Method 1: Docker (Single-Command Container Deployment)

Ensure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is running:

```powershell
cd "c:\Users\Lenovo\Downloads\SE PROJECT"

# Build and start container
docker compose up --build
```
Access the application at **[http://localhost:8000](http://localhost:8000)**.

To stop the container:
```powershell
docker compose down
```

---

### Method 2: Cloud Deployment (Render Backend + Vercel Frontend)

1. **Backend on Render:**
   - Push repository to GitHub.
   - Create a **New Web Service** on [Render](https://render.com/).
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `uvicorn main:app --app-dir backend --host 0.0.0.0 --port $PORT`
2. **Frontend on Vercel:**
   - Import repository on [Vercel](https://vercel.com/).
   - Root Directory: `frontend`
   - Environment Variable: `VITE_API_URL=https://software-testing-simulator.onrender.com`

---

## 📋 Interactive Simulation Modules Reference

### 1. Cyclomatic Complexity Calculator

**Formula:**
$$V(G) = E - N + 2P$$
Where $E$ = Number of edges, $N$ = Number of nodes, and $P$ = Connected components.

| Scenario | Nodes (N) | Edges (E) | Components (P) | Result V(G) | McCabe Risk Rating |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Sequential Code** | 4 | 3 | 1 | **1** | Low Risk (Simple) |
| **If-Else Decision** | 4 | 4 | 1 | **2** | Low Risk (Simple) |
| **While Loop (Iteration)** | 4 | 4 | 1 | **2** | Low Risk (Simple) |
| **Nested Decisions** | 6 | 7 | 1 | **3** | Low Risk (Simple) |
| **Multi-Module (P=2)** | 8 | 8 | 2 | **4** | Low Risk (Simple) |
| **Inconsistent Graph** | 5 | 2 | 1 | **Invalid** | Rejected: $E < N - P$ |

---

### 2. Black-Box Testing Simulator

**Grading Specification:**
- `90 – 100`: **Grade A** (Distinction)
- `80 – 89`: **Grade B** (Very Good)
- `70 – 79`: **Grade C** (Good)
- `60 – 69`: **Grade D** (Satisfactory / Pass)
- `0 – 59`: **Grade F** (Fail)
- Outside `0 – 100` or non-numeric: **INVALID**

#### Boundary Value Analysis (BVA) Reference:

| Test ID | Input | Expected Output | Classification | Rationale |
| :--- | :---: | :---: | :--- | :--- |
| **BVA-01** | `-1` | `INVALID` | Outer Lower Boundary | $Min - 1$: verifies rejection of negative marks. |
| **BVA-02** | `0` | `Grade F` | Lower Boundary | Minimum valid score; boundary of Grade F. |
| **BVA-03** | `1` | `Grade F` | Inner Lower Boundary | Just above minimum valid score. |
| **BVA-05** | `59` | `Grade F` | Intra-Grade Boundary | Maximum score failing before passing Grade D ($60$). |
| **BVA-06** | `60` | `Grade D` | Intra-Grade Boundary | Minimum score satisfying passing Grade D. |
| **BVA-12** | `90` | `Grade A` | Intra-Grade Boundary | Lower threshold for distinction Grade A. |
| **BVA-14** | `100` | `Grade A` | Upper Boundary | Maximum valid score allowed. |
| **BVA-15** | `101` | `INVALID` | Outer Upper Boundary | Just above maximum valid score ($100$). |

#### Equivalence Partitioning (EP) Reference:

| Test ID | Input | Expected Output | Equivalence Class |
| :--- | :---: | :---: | :--- |
| **EP-01** | `-15` | `INVALID` | Class 1: Negative numbers ($< 0$) |
| **EP-02** | `35` | `Grade F` | Class 2: Valid Failing score ($0 \le x \le 59$) |
| **EP-03** | `65` | `Grade D` | Class 3: Valid Passing score ($60 \le x \le 69$) |
| **EP-04** | `75` | `Grade C` | Class 4: Valid Average score ($70 \le x \le 79$) |
| **EP-05** | `85` | `Grade B` | Class 5: Valid High score ($80 \le x \le 89$) |
| **EP-06** | `95` | `Grade A` | Class 6: Valid Distinction score ($90 \le x \le 100$) |
| **EP-07** | `115` | `INVALID` | Class 7: Excess score ($> 100$) |
| **EP-08** | `"abc"` | `INVALID` | Class 8: Non-numeric invalid input |

---

### 3. Basic COCOMO Cost Estimation

**Formulas:**
* Effort ($E$): $E = a \times (\text{KLOC})^b$ (Person-Months)
* Development Time ($T$): $T = c \times (E)^d$ (Months)
* Average Team Size ($P$): $P = E / T$ (Persons)

| Project Category | $a$ | $b$ | $c$ | $d$ | Characteristic |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Organic** | 2.4 | 1.05 | 2.5 | 0.38 | Small, straightforward, experienced team |
| **Semi-detached** | 3.0 | 1.12 | 2.5 | 0.35 | Medium size, mixed experience, moderately strict |
| **Embedded** | 3.6 | 1.20 | 2.5 | 0.32 | Complex system with tight hardware/regulatory constraints |

**Benchmark Case (50 KLOC Semi-detached):**
* Effort: **239.87 person-months**
* Duration: **17.02 months**
* Average Team Size: **14.09 persons**

---

### 4. Release & Deployment Strategies Simulator

* **Blue-Green Deployment:** Provisions parallel environments. Routes 100% of live traffic to Blue (v1.0), verifies Green (v2.0), flips traffic via router, with instant zero-downtime rollback capability.
* **Canary Release:** Progressively allocates user traffic percentages (e.g. 10% &rarr; 25% &rarr; 50% &rarr; 100%) while monitoring telemetry and error budgets.
* **Rolling Update:** Iteratively upgrades cluster nodes in configurable batch sizes with continuous cluster uptime.

---

## 🎨 Design Philosophy: Black & White Monochrome

The UI adheres strictly to a clean, high-contrast, minimalist **Black & White** theme:
* **Palette:** Deep jet black (`#09090b`), pure white surfaces (`#ffffff`), and neutral slate borders (`#e4e4e7`).
* **Typography:** Clean sans-serif (`Inter`) with code/values rendered in monospace (`JetBrains Mono`).
* **Visuals:** Vector SVG Control Flow Graph with high-contrast circular nodes, decision diamonds, and directed arrows.
