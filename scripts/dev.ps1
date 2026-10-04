param(
    [ValidateSet('dev', 'build', 'typecheck', 'test', 'preview', 'install')]
    [string]$Action = 'dev'
)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$portableNodeRoot = Join-Path $projectRoot '.tools\node-22'
$previousPath = $env:Path
Push-Location -LiteralPath $projectRoot
try {
    if (Test-Path -LiteralPath (Join-Path $portableNodeRoot 'node.exe')) {
        $env:Path = $portableNodeRoot + ';' + $env:Path
    }
    if ($Action -eq 'install') { & npm.cmd ci }
    else { & npm.cmd run $Action }
    if ($LASTEXITCODE -ne 0) { throw "npm failed (exit $LASTEXITCODE)." }
} finally {
    Pop-Location
    $env:Path = $previousPath
}
