@echo off
echo ===================================================
echo   FORENSIX INVESTIGATION PORTAL // FULL STACK
echo ===================================================
echo.
echo Starting Backend API Server on http://localhost:5000...
start "FORENSIX Backend API" cmd /k "cd backend && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting Frontend Dev Server on http://localhost:3000...
start "FORENSIX React Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are booting up.
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000/api
echo.
pause

