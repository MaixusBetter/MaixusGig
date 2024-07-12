const Sequelize = require('sequelize'); // Import Sequelize library
const sequelize = require('../config/database'); // Import the database configuration

// Define the Comment model
const Comment = sequelize.define('Comment', {
  content: {
    type: Sequelize.STRING, // The content of the comment as a string
    allowNull: false // Content cannot be null
  },
  author: {
    type: Sequelize.STRING, // The author of the comment as a string
    allowNull: false // Author cannot be null
  }
});

// Sync the Comment model with the database and create the table if it doesn't exist
Comment.sync().then(() => {
  console.log('table created'); // Log a message when the table is created
});

// Export the Comment model
module.exports = Comment;
