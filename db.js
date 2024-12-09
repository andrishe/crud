const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employes_DB',
});

async function testConnection() {
  try {
    const connection = await mysqlPool.getConnection();
    console.log('Connected to MySQL DB');
    connection.release();
  } catch (error) {
    console.error('Error connecting to MySQL DB:', error);
  }
}

testConnection();

module.exports = mysqlPool;
