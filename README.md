<img src="https://readme-typing-svg.herokuapp.com?font=Lexend+Giga&size=25&pause=1000&color=CCA9DD&vCenter=true&width=350&height=25&lines=HONKAI-STARBUKS" width="600"/>

<div align="center">
<a href="#overview"><kbd> <br> Overview<br> </kbd></a>&ensp;&ensp;
<a href="#techused"><kbd> <br>Tech used<br> </kbd></a>&ensp;&ensp;
<a href="#nextsteps"><kbd> <br> Next steps <br> </kbd></a>&ensp;&ensp;
<a href="#installation"><kbd> <br> Installation <br> </kbd></a>&ensp;&ensp;
</div>

<div style="margin-top: 60px;">
    <img src="README-Files/home.png" alt="plot" width="400"/> <img src="README-Files/tierlist.png" alt="plot" width="400"/>
    <img src="README-Files/trailblazers.png" alt="plot" width="400"/> <img src="README-Files/teams.png" alt="plot" width="400"/>
</div>

<a id="overview"></a>
<img src="https://readme-typing-svg.herokuapp.com?font=Lexend+Giga&size=25&pause=1000&color=CCA9DD&vCenter=true&width=435&height=25&lines=OVERVIEW" width="450"/>

> [!IMPORTANT]
> The project is currently under active development. 
> Features and functionalities are being added and refined. 
> Please note that some parts of the project may not be fully functional or stable at this stage. 

<div align="center" style="margin-top: 40px; margin-bottom: 40px;">
    <img src="README-Files/draw.png" style="width: 60%; margin: 10px;"/>
</div>

This project consists of several components for managing and simulating battles in the Honkai-StarBucks universe. It includes back-end servers for handling different functionalities and a front-end client built with Angular.

`Honkai-StarBucks_MainServer` - This is the entry point of the system. It acts as a central router that handles initial requests from the frontend and delegates them to the appropriate microservices. It helps decouple the frontend from direct dependencies on individual services, promoting scalability and maintainability.

`Honkai-StarBucks_LoginServer` - Responsible for handling user authentication and account-related operations, this service connects to a MongoDB database to store and manage login credentials.

`Honkai-StarBucks_TrailBlazersServer` - This microservice manages player data and team configurations. It connects to MongoDB to store detailed information about each user’s characters and their team setups. Additionally, it integrates with starrail.js to retrieve game-specific data. It supports features like creating and deleting teams...

`Honkai-StarBucks_BattleServer` - Currently under development, this microservice will encapsulate all battle-related logic. It will be responsible for processing combat mechanics, handling real-time battle scenarios, and ensuring fair and balanced gameplay outcomes. Once implemented, it will form the core gameplay loop of the application.

> [!IMPORTANT]
> Inter-service Communication: Microservices currently communicate using Axios for HTTP-based messaging. 
> There are plans to upgrade to gRPC, which will provide faster, more efficient communication and better support for future scaling needs. 

---

<a id="techused"></a>
<img src="https://readme-typing-svg.herokuapp.com?font=Lexend+Giga&size=25&pause=1000&color=CCA9DD&vCenter=true&width=435&height=25&lines=TECH-USED" width="450"/>

`MongoDB` is used as the database for storing and managing application data.
It is a NoSQL database, which makes it suitable for handling flexible and hierarchical data structures.

`Node.js` servers handle requests from the front-end and interact with MongoDB to fetch or store data.

`Angular` communicates with the back-end servers via HTTP requests to display data and handle user interactions.
It provides a framework for creating dynamic, single-page applications (SPAs).

StarRail.js is a library for interacting with Honkai: Star Rail game data.
It provides APIs or utilities for retrieving game-specific information.
The `TrailBlazersServer` uses `StarRail.js` to fetch game-specific data, which is then stored in MongoDB or sent directly to the front-end.

<div align="center">
    <ul>
    <a href="https://nodejs.org/en" target="_blank">Node.js</a>
    <a href="https://angular.dev/" target="_blank">Angular</a>
    <a href="https://github.com/mongodb/mongo" target="_blank">MongoDB</a>
    <a href="https://github.com/yuko1101/starrail.js" target="_blank">StarRail.js</a>
    </ul>
</div>

---

<a id="nextsteps"></a>
<img src="https://readme-typing-svg.herokuapp.com?font=Lexend+Giga&size=25&pause=1000&color=CCA9DD&vCenter=true&width=435&height=25&lines=NEXT-STEPS" width="450"/>

<div align="center">
    <p><strong>PvP:</strong> Face other players by trying to clear MoC faster.</p>
    <p><strong>Team Stats:</strong> Get stats of your team to help create the best one possible.</p>
    <p><strong>Relic/Build Stats:</strong> Evaluate your relics and builds.</p>
    <p><strong>Guides:</strong> Guides for building every character.</p>
    <p><strong>News:</strong> All the most recent news of the game.</p>
</div>

---

<a id="installation"></a>
<img src="https://readme-typing-svg.herokuapp.com?font=Lexend+Giga&size=25&pause=1000&color=CCA9DD&vCenter=true&width=435&height=25&lines=INSTALLATION" width="450"/>

> [!CAUTION]
> You will need to install the necessary modules. 
> Use ```npm install``` for all the servers.
> Use ```npm install --legacy-peer-deps``` for the front-end

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
