Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "   FORENSIX INVESTIGATION PORTAL // FULL STACK" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Backend API on http://localhost:5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

Start-Sleep -Seconds 2

Write-Host "Starting Frontend on http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host ""
Write-Host "Both processes initiated:" -ForegroundColor Yellow
Write-Host "  -> Frontend:    http://localhost:3000" -ForegroundColor Cyan
Write-Host "  -> Backend API: http://localhost:5000/api" -ForegroundColor Cyan

