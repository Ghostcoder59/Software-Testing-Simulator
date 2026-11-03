# Helper script to push repository to GitHub using Visual Studio's Git executable
$gitPath = "C:\Program Files\Microsoft Visual Studio\18\Professional\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"

Write-Host "Connecting to GitHub repository: https://github.com/Ghostcoder59/se-simulator..." -ForegroundColor Cyan
& $gitPath push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Your repository is now live at: https://github.com/Ghostcoder59/se-simulator" -ForegroundColor Green
} else {
    Write-Host "`nIf you received an authentication error, please ensure you have created the 'se-simulator' repository at https://github.com/new and allowed GitHub login." -ForegroundColor Yellow
}
