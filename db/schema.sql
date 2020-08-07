DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE DATABASE tracker;
USE tracker;

CREATE TABLE departments(
    id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles(
    id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    job_title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees(
    id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);