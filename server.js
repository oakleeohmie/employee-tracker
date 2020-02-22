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
                    viewDepartments();
                    break;

                case "View roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
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

    var query = "INSERT INTO department (name) VALUES (?)";
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department did you want to add?"
            }
        ]).then(function (answer) {
            connection.query(
                query,
                {
                    name: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("`````````````")
                    console.log(answer.department + " has been added!");
                    console.log("`````````````")
                    choiceRequest();
                }
            );
        });
};
function addRole() {

    var query = "INSERT INTO role (name) VALUES (?)";
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What role did you want to add?"
            }
        ]).then(function (answer) {
            connection.query(
                query,
                {
                    name: answer.role
                },
                function (err) {
                    if (err) throw err;
                    console.log("`````````````")
                    console.log(answer.role + " has been added!");
                    console.log("`````````````")
                    choiceRequest();
                }
            );
        });
};
function addEmployee() {

    var query = "INSERT INTO employee (name) VALUES (?)";
    inquirer
        .prompt([
            {
                name: "employee",
                type: "input",
                message: "What role did you want to add?"
            }
        ]).then(function (answer) {
            connection.query(
                query,
                {
                    name: answer.employee
                },
                function (err) {
                    if (err) throw err;
                    console.log("`````````````")
                    console.log(answer.employee + " has been added!");
                    console.log("`````````````")
                    choiceRequest();
                }
            );
        });
};

choiceRequest();