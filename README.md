# Honkai-StarBucks Project

## To Do

Tratar de todos os problemas com nulls... Se um char n tem lc por exemplo
Adicionar os campos dos multipliers de todos os sets... Ex: damage reduction
Endless game mode...
Co-op mode...
Remover email do login
Create inimigo custom...

Maneira de criar custoom MoC: reutiliazr a maneira dos moc default mas em vez de usar o id usar o id da db

## Overview

This project consists of several components for managing and simulating battles in the Honkai-StarBucks universe. It includes back-end servers for handling different functionalities and a front-end client built with Angular.

### Back-End

#### Honkai-StarBucks_BattleServer

This server manages the battle logic for the game and the conection to the python AI script to find the best outcome for each battle.

#### Honkai-StarBucks_LoginServer

This server handles user authentication and login functionalities.

#### Honkai-StarBucks_MainServer

This is the main server that handles various core functionalities.

### Front-End

#### Honkai-StarBucks_Client

The front-end client built with Angular.

## How to Run the Project

### Installing Necessary Dependencies

#### Honkai-StarBucks_TrailBlazersServer

1. Navigate to the project directory:
    ```sh
    cd .\Back-End\Honkai-StarBucks_TrailBlazersServer\TrailBlazersServer
    ```
2. Install the required dependencies:
    ```sh
    npm install starrail.js@latest
    ```
3. Fix any vulnerabilities:
    ```sh
    npm audit fix
    ```

### Executing the Project

Run the `start_servers.bat` file to start the servers:
```sh
.\start_servers.bat