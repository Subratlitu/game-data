const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'litu1234',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

 

// Create user table if not exists
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

// Execute the query to create the users table
pool.execute(createUsersTable, (err) => {
  if (err) {
    console.error('Error creating user table:', err);
  } else {
    console.log('User table created or already exists...');
  }
});

// Export the pool to be used in controllers
module.exports = pool.promise();
