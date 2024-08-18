--  seeds for department
 INSERT INTO department (department_name)
 VALUES ('Human Resources'),
        ('Engineering'),
        ('Marketing'),
        ('Sales'),
        ('Finance');

-- seeds for role
INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 60000.00, 1),
       ('Software Engineer', 90000.00, 2),
       ('Marketing Specialist', 55000.00, 3),
       ('Sales Representative', 45000.00, 4),
       ('Financial Analyst', 70000.00, 5),
       ('Senior Software Engineer', 110000.00, 2),
       ('Sales Manager', 80000.00, 4);

-- seeds for employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alice', 'Johnson', 1, NULL),
       ('Bob', 'Smith', 2, NULL),
       ('Carol', 'Williams', 3, NULL),
       ('Dave', 'Brown', 4, NULL),
       ('Eve', 'Davis', 5, NULL),
       ('Frank', 'Miller', 6, 2),
       ('Grace', 'Wilson', 7, 4),
       ('Hank', 'Moore', 4, 7);
 