from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
# Removed unused routers for removed modules
from routers.cocomo import router as cocomo_router
from routers.deployment import router as deployment_router
from routers.library import router as library_router

app = FastAPI(
    title="Software Engineering Laboratory Simulation Platform API",
    description="Backend API for the restructured platform",
    version="2.0.0",
)

# CORS configuration allowing local development and deployed Vercel frontend domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API module routers (only the kept modules)
app.include_router(cocomo_router)
app.include_router(deployment_router)
app.include_router(library_router)

@app.get("/api/info")
def get_api_info():
    return {
        "message": "Welcome to Software Engineering Laboratory Simulation Platform API",
        "docs_url": "/docs",
        "status": "online",
        "modules": [
            "Software Development & Design",
            "Software Estimation & Documentation",
            "Software Testing",
            "Release & Deployment",
            "Case Study Workspace (optional)",
        ],
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": "Software Engineering Laboratory Simulation Platform",
        "version": "2.0.0",
    }

# Unified Mode: If frontend/dist exists, serve static assets & React SPA directly
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="static")
else:
    @app.get("/")
    def read_root():
        return {
            "message": "Welcome to Software Engineering Laboratory Simulation Platform API",
            "docs_url": "/docs",
            "status": "online",
        }
