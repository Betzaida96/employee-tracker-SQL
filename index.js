const { prompt, default: inquirer } = require('inquirer');
const db = require('./db');

const questions = () => {
inquirer
.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"]
    }
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
        case "Exit":
            db.end();
            break;
        default:
            console.log(`Invalid choice: ${answer.choice}`);
    }
  });
};

questions();