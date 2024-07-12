const Sequelize = require('sequelize');

// Create a new instance of Sequelize to connect to the PostgreSQL database
module.exports = new Sequelize('codegig', 'postgres', '', {
  host: 'localhost', // The host of the database
  dialect: 'postgres', // The database dialect to use

  // Pool configuration to manage database connections
  pool: {
    max: 5, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in milliseconds) that pool will try to get connection before throwing error
    idle: 10000 // Maximum time (in milliseconds) that a connection can be idle before being released
  },
});
