@echo off

echo Starting BattleServer...
start cmd /k "cd /d Back-End\Honkai-StarBucks_BattleServer && node app.js"

echo Starting LoginServer...
start cmd /k "cd /d Back-End\Honkai-StarBucks_LoginServer && node app.js"

echo Starting MainServer...
start cmd /k "cd /d Back-End\Honkai-StarBucks_MainServer && node app.js"

echo Starting TrailBlazersServer...
start cmd /k "cd /d Back-End\Honkai-StarBucks_TrailBlazersServer && node app.js"

echo Starting Front-End...
start cmd /k "cd /d Front-End\Honkai-StarBucks_Client && ng serve"

echo Waiting for Front-End to start...

:checkServer
timeout /t 2 > nul
curl -s http://localhost:4200 > nul
if errorlevel 1 (
    echo Server not ready, checking again...
    goto checkServer
)

echo Opening Front-End in the default web browser...
start http://localhost:4200

echo All servers started.
