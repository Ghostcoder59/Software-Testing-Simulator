# Software Quality and Testing Simulator

A modern, high-contrast **Black & White** web application developed for college Software Engineering laboratory practicals.

It features interactive demonstrations for:
1. **Experiment 8 (EXP-8)**: Cyclomatic Complexity Calculator ($V(G) = E - N + 2P$)
2. **Experiment 9 (EXP-9)**: Black-Box Testing Simulator (Boundary Value Analysis & Equivalence Partitioning)

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

To run the complete test suite (15 automated tests covering calculation formulas, boundary checks, and API endpoints):

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

### Method 2: Free Cloud Hosting (Render / Railway)

1. Push your project to GitHub.
2. In [Render](https://render.com/) or [Railway](https://railway.app/), create a **New Web Service** pointing to your repository.
3. Configure the service:
   - **Environment:** Docker
   - **Port:** `8000`
   - Render / Railway will automatically detect the `Dockerfile`, build the React frontend, install Python dependencies, and serve the unified application.

---

### Method 3: Separate Frontend & Backend Deployment

#### Backend on Render (Python Web Service):
- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Frontend on Vercel / Netlify:
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:** `VITE_API_URL=https://your-backend-url.onrender.com`

---

## 📋 Experiments Demonstration Guide

### Experiment 8: Cyclomatic Complexity Calculator

**Formula:**
$$V(G) = E - N + 2P$$
Where $E$ = Number of edges, $N$ = Number of nodes, and $P$ = Connected components.

#### Sample Demonstration Inputs:

| Scenario | Nodes (N) | Edges (E) | Components (P) | Expected V(G) | McCabe Risk Rating |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Sequential Code** | 4 | 3 | 1 | **1** | Low Risk (Simple) |
| **If-Else Decision** | 4 | 4 | 1 | **2** | Low Risk (Simple) |
| **While Loop (Iteration)** | 4 | 4 | 1 | **2** | Low Risk (Simple) |
| **Nested Decisions** | 6 | 7 | 1 | **3** | Low Risk (Simple) |
| **Multi-Module (P=2)** | 8 | 8 | 2 | **4** | Low Risk (Simple) |
| **Inconsistent Graph** | 5 | 2 | 1 | **Invalid** | Rejected: $E < N - P$ |

---

### Experiment 9: Black-Box Testing Simulator

**Grading Specification:**
- `90 – 100`: **Grade A** (Distinction)
- `80 – 89`: **Grade B** (Very Good)
- `70 – 79`: **Grade C** (Good)
- `60 – 69`: **Grade D** (Satisfactory / Pass)
- `0 – 59`: **Grade F** (Fail)
- Outside `0 – 100` or non-numeric: **INVALID**

#### Sample Boundary Value Analysis (BVA) Inputs:

| Test ID | Input | Expected Output | Classification | Rationale |
| :--- | :---: | :---: | :--- | :--- |
| **BVA-01** | `-1` | `INVALID` | Outer Lower Boundary | Just below minimum valid limit ($0$). |
| **BVA-02** | `0` | `Grade F` | Lower Boundary | Minimum valid score; boundary of Grade F. |
| **BVA-03** | `1` | `Grade F` | Inner Lower Boundary | Just above minimum valid score. |
| **BVA-05** | `59` | `Grade F` | Intra-Grade Boundary | Maximum score failing before passing Grade D ($60$). |
| **BVA-06** | `60` | `Grade D` | Intra-Grade Boundary | Minimum score satisfying passing Grade D. |
| **BVA-12** | `90` | `Grade A` | Intra-Grade Boundary | Lower threshold for distinction Grade A. |
| **BVA-14** | `100` | `Grade A` | Upper Boundary | Maximum valid score allowed. |
| **BVA-15** | `101` | `INVALID` | Outer Upper Boundary | Just above maximum valid score ($100$). |

#### Sample Equivalence Partitioning (EP) Inputs:

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

## 🎨 Design Philosophy: Black & White Monochrome

The UI adheres strictly to a clean, high-contrast, minimalist **Black & White** theme:
- **Palette**: Deep jet black (`#09090b`), pure white surfaces (`#ffffff`), and neutral slate borders (`#e4e4e7`).
- **Typography**: Clean sans-serif (`Inter`) with code/values rendered in monospace (`JetBrains Mono`).
- **Visuals**: Vector SVG Control Flow Graph with high-contrast circular nodes, decision diamonds, and directed arrows.
- **Accreditation**: Designed for professional Software Engineering laboratory presentations.
