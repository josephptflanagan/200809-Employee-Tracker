//import inquirer
const inquirer = require("inquirer");
const header = require("./utils/Header");
const {allDepts, allRoles, allEmployees} = require("./utils/Query");
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
    //NAME
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

let addRolePrompt = [
  {
    //NAME
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
    //NAME
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
    //NAME
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
//END PROMPTS

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
      connection.query(allDepts, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
      });
      break;
    case "View all Roles":
      //console.log("View all Roles.")
      connection.query(allRoles, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
      });
      break;
    case "View all Employees":
      //console.log("View all Employees.")
      connection.query(allEmployees, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
      });
      break;
    case "Add a Department":
      //console.log("Add a Department.")
      let deptName = await inquirer.prompt(addDepartmentPrompt);
      deptName = deptName['name'];
      //console.log(deptName);
      connection.query(`
      INSERT INTO departments(dept_name)
      VALUES ('${deptName}')
      `, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.log(res);
      });
      connection.query(`
      SELECT * FROM departments
      `, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
      });
      break;
    case "Add a Role":
      //console.log("Add a Role.")

      let roleData = await inquirer.prompt(addRolePrompt);
      roleName = roleData['name'];
      roleSalary = roleData['salary'];
      roleDeptId = roleData['deptId'];
      console.log(roleData);
     
      connection.query(`
      INSERT INTO roles (job_title, salary, department_id)
       VALUES ('${roleName}', '${roleSalary}', '${roleDeptId}')
       `, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.log(res);
      });
      
      connection.query(allRoles, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
      });

      break;
    case "Add an Employee":
      //console.log("Add an Employee.")
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


