const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
  // Production - Heroku configuration
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,  // Set to true for debugging
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false  // Allows self-signed SSL certificates (remove in production)
      }
    }
  });
} else {
  // Development - Local configuration
  sequelize = new Sequelize('codegig', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

module.exports = sequelize;
