const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const pool = new Pool(
{
    user: 'postgress',
    password: 'password',
    host: 'localhost',
    database: 'TBD'
},
    console.log("connected to the database")
)

pool.connect()

app.get('/api/TBD', (req, res) => {
    const sql = `SELECT id, TBD`;

    pool.query(sql, (err, { rows }) => {
    if (er) {
        res.status(500).json({error: err.message });
        return;
    }
    res.json({
        message: 'sucess',
        data: rows
    });
});
});

// app.use((req, res) => {
//     res.status(404).end();
// });

// TODO: app.post?
// TODO: app.delete?


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});