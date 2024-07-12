const Sequelize = require('sequelize'); // Import Sequelize library
const sequelize = require('../config/database'); // Import the database configuration

// Define the Gig model
const Gig = sequelize.define('Gig', {
  title: {
    type: Sequelize.STRING, // The title of the gig as a string
    allowNull: false // Title cannot be null
  },
  technologies: {
    type: Sequelize.STRING, // Technologies related to the gig as a string
    allowNull: false // Technologies cannot be null
  },
  budget: {
    type: Sequelize.STRING, // The budget for the gig as a string
    allowNull: true // Budget can be null
  },
  description: {
    type: Sequelize.STRING, // Description of the gig as a string
    allowNull: false // Description cannot be null
  },
  contact_email: {
    type: Sequelize.STRING, // Contact email for the gig as a string
    allowNull: false // Contact email cannot be null
  },
  hidden: {
    type: Sequelize.BOOLEAN, // Indicates if the gig is hidden
    defaultValue: false // Default value is false, meaning the gig is not hidden
  }
});

// Sync the Gig model with the database and create the table if it doesn't exist
Gig.sync().then(() => {
  console.log('table created'); // Log a message when the table is created
});

// Export the Gig model
module.exports = Gig;
