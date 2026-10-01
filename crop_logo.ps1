Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path (Get-Location) "extracted_logo_from_stream.jpg"
$orig = [System.Drawing.Bitmap]::FromFile($srcPath)

# 1. Save cropped logo on white
$rect = New-Object System.Drawing.Rectangle(410, 25, 745, 735)
$cropped = $orig.Clone($rect, $orig.PixelFormat)
$croppedPath = Join-Path (Get-Location) "src\assets\images\cs_logo_emblem.jpg"
$cropped.Save($croppedPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

# 2. Save transparent PNG version (removing white background)
$pngBitmap = New-Object System.Drawing.Bitmap($cropped.Width, $cropped.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $cropped.Height; $y++) {
    for ($x = 0; $x -lt $cropped.Width; $x++) {
        $p = $cropped.GetPixel($x, $y)
        # If nearly white, make transparent
        if ($p.R -gt 240 -and $p.G -gt 240 -and $p.B -gt 240) {
            $pngBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            # Smooth edge alpha for semi-white antialiasing
            $distFromWhite = [math]::Min(255 - $p.R, [math]::Min(255 - $p.G, 255 - $p.B))
            if ($p.R -gt 220 -and $p.G -gt 220 -and $p.B -gt 220) {
                $alpha = [math]::Min(255, [int]($distFromWhite * 7))
                $pngBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
            } else {
                $pngBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
            }
        }
    }
}
$pngPath = Join-Path (Get-Location) "src\assets\images\cs_logo_transparent.png"
$pngBitmap.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output "Successfully saved cs_logo_emblem.jpg and cs_logo_transparent.png"

$orig.Dispose()
$cropped.Dispose()
$pngBitmap.Dispose()
