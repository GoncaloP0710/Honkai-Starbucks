# Honkai-StarBucks Project

## Overview

This project consists of several components for managing and simulating battles in the Honkai-StarBucks universe. It includes back-end servers for handling different functionalities and a front-end client built with Angular.

## Back-End

### Honkai-StarBucks_BattleServer

This server manages the battle logic for the game and the conection to the python AI script to find the best outcome for each battle.

### Honkai-StarBucks_LoginServer

This server handles user authentication and login functionalities.

### Honkai-StarBucks_MainServer

This is the main server that handles various core functionalities.

#### Directory Structure

- `controller/`: Contains controllers for different modules.
- `models/`: Contains the data models.
- `routes/`: Defines the API routes.
- `app.js`: The main application file.
- `cache.js`: Manages caching operations.
- `trash.js`: Temporary or deprecated code (consider removing or refactoring).
- `package.json`: Node.js project metadata.
- `package-lock.json`: Lockfile for npm dependencies.

## BattleSimulator_AI

This directory contains the AI logic for simulating battles.

## Front-End

### Honkai-StarBucks_Client

The front-end client built with Angular.

## How to run the project

### Back-End

#### BattleServer
```bash
cd Back-End/Honkai-StarBucks_BattleServer/BattleServer
node app.js
```
#### LoginServer
```bash
cd Back-End/Honkai-StarBucks_LoginServer/LoginServer
node app.js
```
#### MainServer
```bash
cd Back-End/Honkai-StarBucks_MainServer
node app.js
```
### Front-End
```bash
cd Front-End/Honkai-StarBucks_Client
ng serve
```