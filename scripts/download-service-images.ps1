# download-service-images.ps1
# Usage:
# 1. Open this file and replace the placeholder URLs in the $images list with the direct image URLs you downloaded or copied from Pexels/Unsplash.
# 2. Run from repository root in PowerShell: `powershell -ExecutionPolicy Bypass -File .\scripts\download-service-images.ps1`
# This script will download each image into `public/images/services/` with the filename specified.

$images = @(
    @{ url = 'https://example.com/path/to/root-canal.jpg'; filename = 'root-canal.jpg' },
    @{ url = 'https://example.com/path/to/teeth-whitening.jpg'; filename = 'teeth-whitening.jpg' },
    @{ url = 'https://example.com/path/to/braces-aligners.jpg'; filename = 'braces-aligners.jpg' },
    @{ url = 'https://example.com/path/to/dental-implants.jpg'; filename = 'dental-implants.jpg' },
    @{ url = 'https://example.com/path/to/cosmetic-dentistry.jpg'; filename = 'cosmetic-dentistry.jpg' },
    @{ url = 'https://example.com/path/to/oral-surgery.jpg'; filename = 'oral-surgery.jpg' }
)

$destDir = Join-Path -Path (Resolve-Path "public/images") -ChildPath "services"
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

foreach ($item in $images) {
    $url = $item.url
    $file = Join-Path $destDir $item.filename
    Write-Host "Downloading $url -> $file"
    try {
        Invoke-WebRequest -Uri $url -OutFile $file -UseBasicParsing -ErrorAction Stop
    } catch {
        Write-Host "Failed to download $url : $_" -ForegroundColor Red
    }
}

Write-Host "Done. Run `npm run build` to include images in the site." -ForegroundColor Green
