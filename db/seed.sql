INSERT INTO departments (dept_name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO roles (job_title, salary, department_id)
VALUES
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3),
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 6, null),
('Mike', 'Chan', 7, 1),
('Ashley', 'Rodriguez', 1, null),
('Kevin', 'Tupik', 2, 3),
('Malia', 'Brown', 3, null),
('Sarah', 'Lourd', 4, null),
('Tom', 'Allen', 5, 7),
('Christian', 'Eckenrode', 1, 2);
