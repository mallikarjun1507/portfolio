const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuration without database specified initially
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// SQL to create database and tables
const initQueries = [
  `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
  `USE \`${process.env.DB_NAME}\``,
  `CREATE TABLE IF NOT EXISTS intros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    welcome_text VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    caption VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS abouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lottie_url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    skills JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    company VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    links JSON,
    technologies JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    age VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`
];

// Create the pool and initialize database
async function initializeDatabase() {
  try {
    // First connect without database to create it
    const tempConnection = await mysql.createConnection(config);
    
    // Execute all initialization queries using query() instead of execute()
    for (const query of initQueries) {
      await tempConnection.query(query);
    }
    
    await tempConnection.end();
    console.log('Database and tables initialized successfully');
    
    // Now create the pool with the database specified
    const pool = mysql.createPool({
      ...config,
      database: process.env.DB_NAME
    });
    
    return pool;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Initialize and export the pool
const databasePromise = initializeDatabase();

module.exports = databasePromise;