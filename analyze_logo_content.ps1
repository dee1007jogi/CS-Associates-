Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile((Resolve-Path "extracted_logo_from_stream.jpg"))
Write-Output "Image size: $($img.Width) x $($img.Height)"

# Find bounding box of non-white pixels
$minX = $img.Width; $maxX = 0; $minY = $img.Height; $maxY = 0

for ($y = 0; $y -lt $img.Height; $y += 2) {
    for ($x = 0; $x -lt $img.Width; $x += 2) {
        $p = $img.GetPixel($x, $y)
        if ($p.R -lt 245 -or $p.G -lt 245 -or $p.B -lt 245) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Content Bounding Box: X=[$minX, $maxX], Y=[$minY, $maxY]"
Write-Output "Content Width: $($maxX - $minX), Content Height: $($maxY - $minY)"

# Sample dark colors (Black/Gray text)
$darkColors = New-Object System.Collections.Generic.List[string]
for ($y = $minY; $y -le $maxY; $y += 2) {
    for ($x = $minX; $x -le $maxX; $x += 2) {
        $p = $img.GetPixel($x, $y)
        if ($p.R -lt 60 -and $p.G -lt 60 -and $p.B -lt 60) {
            $hex = "#{0:X2}{1:X2}{2:X2}" -f [int]$p.R, [int]$p.G, [int]$p.B
            $darkColors.Add($hex)
        }
    }
}
Write-Output "Dark text pixels: $($darkColors.Count)"

$img.Dispose()
