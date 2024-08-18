const express = require('express');
const pool = require('./db/connection')

//The port the server will listen on
const PORT = process.env.PORT || 3001;
const app = express();

//middleware to parse URL-endcoded and JSON request bodies
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Route to get all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT id, department_name FROM department`;

    pool.query(sql, (err, { rows }) => {
    if (err) {
        res.status(500).json({error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: rows
    });
});
});

// Route to get all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT role.id, role.title, department.department_name AS department, role.salary
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id`;

    pool.query(sql, (err, { rows }) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Route to get all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary,
                        manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    pool.query(sql, (err, { rows }) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Route to add a new department
app.post('/api/departments', (req, res) => {
    const {department_name} = req.body;
    const sql = `INSERT INTO department (department_name) VALUES ($1) RETURNING *`;

    pool.query(sql, [department_name], (err, {rows}) => {
    if (err) {
        res.status(500).json({ error: err.message});
        return;
    }
    res.json({
        message: 'success',
        data: rows[0]
      });
   });
});

// Route to add a new role
app.post('/api/roles', (req, res) => {
    const { title, salary, department_id } = req.body;
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *`;

    pool.query(sql, [title, salary, department_id], (err, { rows }) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows[0]
        });
    });
});

// Route to add a new employee
app.post('/api/employees', (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *`;
    
    pool.query(sql, [first_name, last_name, role_id, manager_id], (err, { rows }) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows[0]
        });
    });
});

// Route to update an employee role
app.put('/api/employees/:id/role', (req, res) => {
    const { role_id } = req.body;
    const { id } =req.params;
    const sql = `UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *`;

    pool.query(sql, [role_id, id], (err, { rows }) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows[0]
        });
    });
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).end();
});

// Start the server and listen on the specified port mentioned above
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});