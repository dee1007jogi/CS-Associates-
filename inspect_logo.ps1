Add-Type -AssemblyName System.Drawing

$filePath = Join-Path (Get-Location) "extracted_logo_from_stream.jpg"
$img = [System.Drawing.Bitmap]::FromFile($filePath)
Write-Output "Image Dimensions: $($img.Width) x $($img.Height)"

$orangeList = New-Object System.Collections.Generic.List[string]
$allColors = New-Object System.Collections.Generic.List[string]

for ($y = 0; $y -lt $img.Height; $y += 3) {
    for ($x = 0; $x -lt $img.Width; $x += 3) {
        $p = $img.GetPixel($x, $y)
        $r = [int]$p.R
        $g = [int]$p.G
        $b = [int]$p.B
        $hex = "#{0:X2}{1:X2}{2:X2}" -f $r, $g, $b
        $allColors.Add($hex)
        
        # Check orange range: high Red, medium Green (around 60-160), low Blue (< 80)
        if ($r -gt 150 -and $g -gt 40 -and $g -lt 180 -and $b -lt 70) {
            $orangeList.Add($hex)
        }
    }
}
$img.Dispose()

Write-Output "Total sampled pixels: $($allColors.Count)"
Write-Output "Total orange pixels: $($orangeList.Count)"

Write-Output "`nTop 10 Orange Hex Codes in Logo:"
$orangeList | Group-Object | Sort-Object Count -Descending | Select-Object -First 10 | ForEach-Object {
    Write-Output "$($_.Name) - Count: $($_.Count)"
}

Write-Output "`nTop 15 Dominant Colors overall:"
$allColors | Group-Object | Sort-Object Count -Descending | Select-Object -First 15 | ForEach-Object {
    Write-Output "$($_.Name) - Count: $($_.Count)"
}
