const inquirer = require('inquirer');
const pool = require('./db/connection');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db');

// begin pompt in terminal this will show a list of questions asked
const questions = () => {
inquirer
.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"]
    }
    // This is where it will call the functions when you select a response. Functions are in db index.js
]).then((response) => { 
    switch(response.choice) {
        case "View all departments":
            viewAllDepartments();
            break;
        case "View all roles":
            viewAllRoles();
            break;
        case "View all employees":
            viewAllEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee role":
            updateEmployeeRole();
            break;
        case "Exit": //if you select exit you will stop being asked questions
            console.log('Goodbye!');
            pool.end();
            break;
        default:
            console.log(`Invalid choice: ${answer.choice}`);
    }
  });
};

questions();

module.exports = {questions}