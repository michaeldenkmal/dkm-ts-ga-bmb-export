set expected_node_version=%1
rem https://stackoverflow.com/questions/108439/how-do-i-get-the-result-of-a-command-in-a-variable-in-windows
FOR /F "delims=" %%i IN ('nvm current') DO set current_node_version=%%i

if "%expected_node_version%"=="%current_node_version%" goto :ok
set node_version_ok=false
goto :EOF
:ok
set node_version_ok=true

