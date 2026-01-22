$node_version = "22.20.0"

function Test-NodeVersion {
    param([string]$Expected)
    $version_str="v$($Expected)"
    $current = nvm current
    $ret = ($version_str -eq $current)
    if ( !($ret) ) {
        Write-Error "Falsche Nodeversion soll $node_version sein, ist aber q@$($current)"
    }
    return $ret
}

if (Test-NodeVersion -Expected $node_version) {
    vite build
}
