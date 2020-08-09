//import inquirer
const inquirer = require("inquirer");
const header = require("./utils/Header");
const { allDepts, allRoles, allEmployees } = require("./utils/QueryBodies");
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'Juno625@36ms',
  database: 'company'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});

afterConnection = () => {

  //starts the database interface
  console.log(header);
  programInitiation('Initialize')
    .catch(err => {
      console.log(err);
    })



};

//START PROMPTS
const mainMenuPrompt = [
  {
    //CHOICE
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View all Departments',
      'View all Roles',
      'View all Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update and Employee Roll',
      'Exit Program']
  }
];

const addDepartmentPrompt = [
  {
    //DEPARTMENT NAME
    type: 'input',
    name: 'name',
    message: 'What is the name of this department? (Required)',
    validate: name => {
      if (name) {
        return true;
      } else {
        console.log('A department name is required to proceed');
        return false;
      }
    }
  }
]

const addRolePrompt = [
  {
    //ROLE NAME
    type: 'input',
    name: 'name',
    message: 'What is the name of this role? (Required)',
    validate: name => {
      if (name) {
        return true;
      } else {
        console.log('A role name is required to proceed');
        return false;
      }
    }
  },
  {
    //ROLE SALARY
    type: 'input',
    name: 'salary',
    message: 'What is the salary of this role? (Required)',
    validate: name => {
      if (name) {
        return true;
      } else {
        console.log('A role salary is required to proceed');
        return false;
      }
    }
  },
  {
    //DEPARTMENT ID
    type: 'input',
    name: 'deptId',
    message: 'What is the id number of the department of this role? (Required)',
    validate: name => {
      if (name) {
        return true;
      } else {
        console.log('A department id is required to proceed');
        return false;
      }
    }
  }
]

const addEmployeePrompt = [
  {
    //EMPLOYEE FIRST NAME
    type: 'input',
    name: 'first_name',
    message: 'What is the first name of this employee? (Required)',
    validate: name => {
      if (name) {
        return true;
      } else {
        console.log('A first name is required to proceed');
        return false;
      }
    }
  },
  {
    //EMPLOYEE LAST NAME
    type: 'input',
    name: 'last_name',
    message: 'What is the last name of this employee? (Required)',
    validate: name => {
      if (name) {
        return true;
      } else {
        console.log('A last name is required to proceed');
        return false;
      }
    }
  },
  {
    //EMPLOYEE ROLE ID
    type: 'input',
    name: 'role_id',
    message: 'What is the role id number this employee? (Required)',
    validate: name => {
      if (name) {
        return true;
      } else {
        console.log('A role id is required to proceed');
        return false;
      }
    }
  },
  {
    //EMPLOYEE MANAGER ID
    type: 'input',
    name: 'manager_id',
    message: "What is the id number for this employee's manager? (enter nothing for managers)"
  }
]
//END PROMPTS

//getQuery
const getQuery = (section) => {
  connection.query(section, (err, res) => {
    if (err) throw err;
    console.log('\n')
    console.table(res);
  });
}

//postQuery
const postQuery = (section, data) => {

  switch (section) {
    case 'addDept':
      connection.query(`
      INSERT INTO departments(dept_name)
      VALUES ('${data["name"]}')
      `, (err, res) => {
        if (err) throw err;
      });
      break;

    case 'addRole':
      connection.query(`
      INSERT INTO roles (job_title, salary, department_id)
       VALUES ('${data["name"]}', '${ data["salary"]}', '${data["deptId"]}')
       `, (err, res) => {
        if (err) throw err;
      });
      break;

    case 'addEmployee':
      if (data['manager_id'] != '') {
        connection.query(`
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ('${data["first_name"]}', '${data["last_name"]}', '${data["role_id"]}', '${data['manager_id']}')
        `, (err, res) => {
          if (err) throw err;
        });
      }
      else {
        connection.query(`
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ('${data["first_name"]}', '${data["last_name"]}', '${data["role_id"]}', null)
        `, (err, res) => {
          if (err) throw err;
        });
      }
      break;

    default:
      console.log("ERROR")
  }
}

//initializes database interface
const programInitiation = (choice) => {

  return new Promise((resolve, reject) => {
    if (choice != "Exit Program") {
      mainMenu();
    }
    else {
      resolve();
      connection.end();
    }

  })

}
//main menu
const mainMenu = async () => {

  let choice = await inquirer.prompt(mainMenuPrompt);
  choice = choice['choice'];
  console.log(choice);

  switch (choice) {
    case "View all Departments":
      //console.log("View all Departments.")
      getQuery(allDepts);
      break;

    case "View all Roles":
      //console.log("View all Roles.")
      getQuery(allRoles);
      break;

    case "View all Employees":
      //console.log("View all Employees.")
      getQuery(allEmployees)
      break;

    case "Add a Department":
      //console.log("Add a Department.")
      let deptData = await inquirer.prompt(addDepartmentPrompt);
      postQuery('addDept', deptData);
      getQuery(allDepts);
      break;

    case "Add a Role":
      //console.log("Add a Role.")
      let roleData = await inquirer.prompt(addRolePrompt);
      postQuery('addRole', roleData);
      getQuery(allRoles);
      break;

    case "Add an Employee":
      //console.log("Add an Employee.")
      let employeeData = await inquirer.prompt(addEmployeePrompt);
      //console.log(employeeData);
      postQuery('addEmployee', employeeData);
      getQuery(allEmployees);
      break;

    case "Update and Employee Roll":
      //console.log("Update and Employee Roll.")
      break;
    case "Exit Program":
      console.log("Thank you, and have a great day!")
      break;
    default:
      console.log("ERROR, UNKNOWN COMMAND.")

  }
  programInitiation(choice);
};


