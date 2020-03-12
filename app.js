const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const teamMembers = []

const employeeTypeQuestion = [
  {
    type: "list",
    name: "employeeType",
    message: "What type of employee would you like to add?",
    default: "engineer",
    choices: [
      "engineer",
      "intern",
      "manager"
    ]
  }
]

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer's name?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer's email?"
  },
  {
    type: "number",
    name: "id",
    message: "What is the engineer's ID number?"
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub username?"
  }
]

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the intern's name?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern's email?"
  },
  {
    type: "number",
    name: "id",
    message: "What is the intern's ID number?"
  },
  {
    type: "input",
    name: "school",
    message: "What school does the intern go to?"
  }
]

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the manager's email?"
  },
  {
    type: "number",
    name: "id",
    message: "What is the manager's ID number?"
  },
  {
    type: "number",
    name: 'phone',
    message: "What is the manager's office phone number?"
  }
]

const continueQuestion = [
  {
    type: "list",
    name: "continue",
    message: "Add another employee?",
    default: "no",
    choices: [
      "yes",
      "no"
    ]
  }
]

const continueInquiry = () => {
  inquirer.prompt(continueQuestion).then(function(data){
    if (data.continue === "yes"){
      getEmployeeData()
    } else {
      writeToFile(teamMembers);
    }
  })
}

const engineerInquiry = () => {
  inquirer.prompt(engineerQuestions).then(function(data) {
    let engineer = new Engineer(data.name, data.id, data.email, data.github)
    teamMembers.push(engineer);
    continueInquiry();
  })
}

const internInquiry = () => {
  inquirer.prompt(internQuestions).then(function(data) {
    let intern = new Intern(data.name, data.id, data.email, data.school)
    teamMembers.push(intern);
    continueInquiry();
  })
}

const managerInquiry = () => {
  inquirer.prompt(managerQuestions).then(function(data) {
    let manager = new Manager(data.name, data.id, data.email, data.phone)
    teamMembers.push(manager);
    continueInquiry();
  })
}

const getEmployeeData = () => {
  inquirer.prompt(employeeTypeQuestion).then(function(data) {
    if (data.employeeType === 'engineer'){
      engineerInquiry()
    } else if (data.employeeType === 'intern'){
      internInquiry()
    } else if (data.employeeType === 'manager'){
      managerInquiry();
    }
  })
}

const writeToFile = (data) => {
  fs.writeFile("./output/team.html", render(data), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Success!")
  })
}

getEmployeeData();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
