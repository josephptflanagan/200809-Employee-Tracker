DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;

CREATE TABLE departments(
    id INTEGER PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles(
    id INTEGER PRIMARY KEY,
    job_title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);