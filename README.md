 # MaixusGig

## Description
MaixusGig is a simple web application designed to help coders find job opportunities.

 Version: 1.0.0
 License: MIT

 Dependencies:
   - body-parser: ^1.20.2
   - express: ^4.19.2
   - express-handlebars: ^7.1.3
   - express-session: ^1.18.0
   - method-override: ^3.0.0
   - moment: ^2.30.1
   - pg: ^8.12.0
   - pg-hstore: ^2.3.4
   - sequelize: ^6.37.3

 ## Installation
 To run MaixusGig locally, follow these steps:
 
 1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd maixusgig
    ```
 
 2. Install dependencies:
    ```bash
    npm install
    ```
 
 3. Set up your PostgreSQL database:
    - Ensure PostgreSQL is installed and running.
    - Create a database named `codegig` (or as specified in your `config/database.js`).
    - Update database configuration in `config/database.js` if necessary.
 
 4. Start the application:
    ```bash
    npm run start
    ```
    This will start the server at `http://localhost:5000`.
 
 ## Usage
 - Navigate to `http://localhost:5000` in your web browser to use the application.
 - Register an account or log in if you already have one.
 - View available gigs, add new gigs, and apply to gigs that interest you.
 - Leave comments on gigs to interact with other users.
 
 ## Technologies Used' - Node.js
 - Express.js
 - Sequelize (ORM for PostgreSQL)
 - Handlebars (templating engine)
 - Other dependencies listed in `package.json`
 
 ## Credits
 - Author: Xavier Mendoza
 
 ## License
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Mozilla
 This project is licensed under the MIT License - see the LICENSE file for details.
