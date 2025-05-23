#!/bin/bash

echo "Starting BattleServer..."
kitty --hold zsh -c "cd Back-End/Honkai-StarBucks_BattleServer && node app.js" &

echo "Starting LoginServer..."
kitty --hold zsh -c "cd Back-End/Honkai-StarBucks_LoginServer && node app.js" &

echo "Starting MainServer..."
kitty --hold zsh -c "cd Back-End/Honkai-StarBucks_MainServer && node app.js" &

echo "Starting TrailBlazersServer..."
kitty --hold zsh -c "cd Back-End/Honkai-StarBucks_TrailBlazersServer && node app.js" &

echo "Starting Front-End..."
kitty --hold zsh -c "cd Front-End/Honkai-StarBucks_Client && ng serve" &

echo "Waiting for Front-End to start..."

checkServer() {
    while ! curl -s http://localhost:4200 > /dev/null; do
        echo "Server not ready, checking again..."
        sleep 2
    done
}

checkServer

echo "Opening Front-End in the default web browser..."
xdg-open http://localhost:4200

echo "All servers started."
```