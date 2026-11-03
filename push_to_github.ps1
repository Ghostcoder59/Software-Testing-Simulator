# Helper script to push repository to GitHub using Visual Studio's Git executable
$gitPath = "C:\Program Files\Microsoft Visual Studio\18\Professional\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"

Write-Host "Pushing to GitHub repository: https://github.com/Ghostcoder59/Software-Testing-Simulator..." -ForegroundColor Cyan
& $gitPath push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Your repository is now live at: https://github.com/Ghostcoder59/Software-Testing-Simulator" -ForegroundColor Green
} else {
    Write-Host "`nIf you received an authentication error, please allow the GitHub login prompt." -ForegroundColor Yellow
}
