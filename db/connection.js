const { Pool } = require('pg');

// create new Pool instance to manage connnections to the PostgreSQL database
const pool = new Pool(
{
    user: 'postgres',
    password: 'Bubbles11!',
    host: 'localhost',
    database: 'employee_tracker',
    port: 5432,
},
    console.log("connected to the database")
)

module.exports = pool;