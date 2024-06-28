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
  - `CharacterController.js`: Manages character-related operations.
  - `LoginController.js`: Manages login operations.
  - `RelicController.js`: Manages relic-related operations.
- `models/`: Contains the data models.
- `routes/`: Defines the API routes.
  - `Character.js`: Routes for character operations.
  - `Login.js`: Routes for login operations.
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

#### Directory Structure

- `.angular/`: Angular configuration files.
- `.vscode/`: Visual Studio Code workspace settings.
- `node_modules/`: Node.js dependencies.
- `public/`: Static assets.
- `src/`: Source code for the Angular application.
- `.editorconfig`: Configuration for code editors.
- `.gitignore`: Specifies which files to ignore in version control.
- `angular.json`: Angular CLI configuration.
- `package.json`: Node.js project metadata.
- `package-lock.json`: Lockfile for npm dependencies.
- `README.md`: Project documentation.
- `tsconfig.app.json`: TypeScript configuration for the app.
- `tsconfig.json`: TypeScript configuration.
- `tsconfig.spec.json`: TypeScript configuration for testing.


## How to run the project

### Back-End

### BattleServer
```bash
cd Back-End/Honkai-StarBucks_BattleServer/BattleServer
node app.js
```
### LoginServer
```bash
cd Back-End/Honkai-StarBucks_LoginServer/LoginServer
node app.js
```
### MainServer
```bash
cd Back-End/Honkai-StarBucks_MainServer
node app.js
```
## Front-End
```bash
cd Front-End/Honkai-StarBucks_Client
ng serve
```