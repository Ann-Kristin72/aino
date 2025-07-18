require('dotenv').config();
const { Pool } = require('pg');

console.log('🔍 Testing database connection in production...');
console.log('DATABASE_URL (first 30 chars):', process.env.DATABASE_URL?.slice(0, 30) + '...');
console.log('NODE_ENV:', process.env.NODE_ENV);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect to database...');
    const client = await pool.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Query successful:', result.rows[0]);
    
    client.release();
    await pool.end();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection(); 