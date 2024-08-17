const pool = require('../server')

const viewAllDepartments = () => {
    pool.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        questions();
    });
};

const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, department.department_name AS department, role.salary
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id`;
    pool.query(sql, (err, results) =>{
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        questions();
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, manager.first_name AS manager_first_name, manager.last_name AS Manager_last_name
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN emloyee manager ON emloyee.manager_id = manager.id`;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        questions();
    });
};

const addDepartment = () => {
    const sql = `INSERT INTO department (department_name)
                 VALUES ('New Department Name')`;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        questions();
    });
};

const addRole = () => {
    const sql = `INSERT INTO role (title, salary, department_id)
                 VALUES ('New Role Description')`;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        questions();
    });
};

const addEmployee = () => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                 VALUES ('New Employee Name')`;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        questions();
    });
};

const updateEmployeeRole = () => {
    const sql = `UPDATE employee
                 SET role_id = new_role_id
                 WHERE id = employee_id`;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        questions();
    });
};

module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole};