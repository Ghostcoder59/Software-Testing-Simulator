@echo off
echo ========================================================
echo Starting Software Quality and Testing Simulator
echo ========================================================
echo.
echo Opening browser at http://localhost:8000 ...
start http://localhost:8000
echo.
echo Running server on port 8000 (Press Ctrl+C to stop)...
".\backend\venv\Scripts\uvicorn.exe" main:app --app-dir backend --host 127.0.0.1 --port 8000
pause

