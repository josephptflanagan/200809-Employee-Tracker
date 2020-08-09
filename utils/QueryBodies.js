const allDepts = `SELECT * FROM departments`;

const allRoles = `
SELECT
roles.id,
roles.job_title,
roles.salary,
departments.dept_name AS department
FROM roles
LEFT JOIN departments on roles.department_id = departments.id
`;

const allEmployees = `
SELECT
employees.id,
employees.first_name,
employees.last_name,
roles.job_title,
departments.dept_name AS department,
roles.salary,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employees
LEFT JOIN roles on employees.role_id = roles.id
LEFT JOIN departments on roles.department_id = departments.id
LEFT JOIN employees manager on manager.id = employees.manager_id;
`;

module.exports = {allDepts:allDepts, allRoles:allRoles, allEmployees:allEmployees};