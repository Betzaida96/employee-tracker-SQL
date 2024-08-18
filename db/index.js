const inquirer = require('inquirer');
const pool = require('./connection');
const { questions } = require('../index')

// function to view all departments
const viewAllDepartments = () => {
    const sql = 'SELECT * FROM department';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            console.error('SQL:', sql);
        } else {
            console.table(results.rows);
        }
        require('../index').questions();
    });
};

// function to view all roles
const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, department.department_name AS department, role.salary
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id`;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        require('../index').questions();
    });
};

// function to view all employees
const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, manager.first_name AS manager_first_name, manager.last_name AS Manager_last_name
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        require('../index').questions();
    });
};

// function to add a department
const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department'
    }).then(({departmentName}) => {
        const sql = `INSERT INTO department (department_name) VALUES ($1) RETURNING *`;
    pool.query(sql, [departmentName] ,(err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        require('../index').questions();
    }); 
  });
};

// function to add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input', 
            name: 'roleTitle', 
            message: 'Enter the role title:'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the role salary:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID for this role:'
        }
    ]).then(({roleTitle, roleSalary, departmentId}) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *`;
        pool.query(sql, [roleTitle, roleSalary, departmentId] ,(err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        require('../index').questions();
     });
  });  
};

// function to add employee
const addEmployee = () => {
    inquirer.prompt([
        {
         type: 'input',
         name: 'firstName',
         message: 'Enter the employee\'s first name:'
        },
        {
         type: 'input',
         name: 'lastName',
         message: 'Enter the employee\'s last name:'
        },
        {
         type: 'input',
         name: 'roleId',
         message: 'Enter the role ID for this employee:'
        },
        {
         type: 'input',
         name: 'managerId',
         message: 'Enter the manager ID (if applicable):'
        }
    ]).then (({ firstName, lastName, roleId, managerId}) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *`;
        pool.query(sql, [firstName, lastName, roleId, managerId] ,(err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        require('../index').questions();
    });
  });
};

// function to update an employee
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee to update:'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID:'
        }
    ]).then(({ employeeId, newRoleId }) =>{
    const sql = `UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *`;
    pool.query(sql, [newRoleId, employeeId] ,(err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results.rows);
        }
        require('../index').questions();
    });
   });
};

module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole};