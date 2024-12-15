# Honkai-StarBucks Project

The project is currently under active development. Features and functionalities are being added and refined. Please note that some parts of the project may not be fully functional or stable at this stage. 

## Overview

This project consists of several components for managing and simulating battles in the Honkai-StarBucks universe. It includes back-end servers for handling different functionalities and a front-end client built with Angular.

### Back-End

#### Honkai-StarBucks_BattleServer

This server manages the battle logic for the game and the conection to the python AI script to find the best outcome for each battle.

#### Honkai-StarBucks_LoginServer

This server handles user authentication and login functionalities.

#### Honkai-StarBucks_MainServer

This is the main server that handles various core functionalities and fowards requests to the specific server.

#### Honkai-StarBucks_TrailBlazersServer

This server manages all functionalities related to the Trail Blazers, including importing them from the game and creating them from scratch.

### Front-End

#### Honkai-StarBucks_Client

The front-end client built with Angular.

## How to Run the Project

### Installing Necessary Dependencies

#### Honkai-StarBucks_Front-End

1. Navigate to the project directory:
    ```sh
    cd .\Front-End\Honkai-StarBucks_Client
    ```
2. Install the required dependencies:
    ```sh
    npm install
    ```
3. Fix any vulnerabilities:
    ```sh
    npm audit fix
    ```

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

- Windows

    Run the `start_servers.bat` file to start the servers:
    ```sh
    .\start_servers.bat
    ```

- Linux 

    Run the `start_servers.sh` file to start the servers:
    ```sh
    ./start_servers.sh
    ```