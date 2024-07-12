const Sequelize = require('sequelize'); // Import Sequelize library
const sequelize = require('../config/database'); // Import the database configuration

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING, // The email of the user as a string
    allowNull: false, // Email cannot be null
    unique: true // Email must be unique
  },
  password: {
    type: Sequelize.STRING, // The password of the user as a string
    allowNull: false // Password cannot be null
  },
  loggedIn: {
    type: Sequelize.BOOLEAN, // Indicates if the user is logged in
    defaultValue: false // Default value is false, meaning the user is not logged in
  }
});

// Sync the User model with the database and create the table if it doesn't exist
User.sync().then(() => {
  console.log('table created'); // Log a message when the table is created
});

// Export the User model
module.exports = User;
