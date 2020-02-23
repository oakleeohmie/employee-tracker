var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "employee_db"
});
connection.connect(function (err) {
    if (err) throw err;
});

function choiceRequest() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee",
                "Exit"
            ]
        })
        .then(function (choice) {
            switch (choice.action) {
                case "Add department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "View departments":
                    allDepartments();
                    break;

                case "View roles":
                    allRoles();
                    break;

                case "View employees":
                    allEmployees();
                    break;

                case "Update employee":
                    updateEmployee();
                    break;

                case "Exit":
                    connection.end();
                    break;
            };
        });
};
function addDepartment() {

    var query = "INSERT INTO department SET ?";
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department did you want to add?"
            }
        ]).then(function (res) {
            connection.query(
                query,
                {
                    name: res.department
                },
                function (err) {
                    if (err) throw err;
                    console.log(".............................")
                    console.log(res.department + " has been added!");
                    console.log(".............................")
                    choiceRequest();
                }
            );
        });
};
function addRole() {

    var query = "INSERT INTO role SET ?";
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What role did you want to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "department_id",
                type: "input",
                message: "Give the department a number ID"
            }
        ]).then(function (res) {
            connection.query(
                query,
                {
                    title: res.role,
                    salary: res.salary,
                    department_id: res.department_id
                },
                function (err) {
                    if (err) throw err;
                    console.log(".............................")
                    console.log(res.role + " has been added!");
                    console.log(".............................")
                    choiceRequest();
                }
            );
        });
};
function addEmployee() {

    var query = "INSERT INTO employee SET ?";
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role_id",
                type: "input",
                message: "What's the employee's role ID?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Please enter manager ID if avaiable"
            }
        ]).then(function (res) {
            connection.query(
                query,
                {
                    first_name: res.first_name,
                    last_name: res.last_name,
                    role_id: res.role_id,
                    manager_id: res.manager_id

                },
                function (err) {
                    if (err) throw err;
                    console.log(".............................")
                    console.log(res.employee + " has been added!");
                    console.log(".............................")
                    choiceRequest();
                }
            );
        });
};
function allDepartments() {

    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        choiceRequest();
    });
};
function allRoles() {

    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        choiceRequest();
    });
};
function allEmployees() {

    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        choiceRequest();
    });
};



choiceRequest();