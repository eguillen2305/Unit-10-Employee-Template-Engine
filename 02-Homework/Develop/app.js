// Const to each respective "REQUIRE" paths
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

//ASYNC Asking the user TRIAGE QUESTIONS - From here it will triage and map out where to go.
async function askQuestions(employeeList) {
	//baseQuestions const to assess Employee name, id, email and role.The answers
	//entered will determine where the code will go to next.
	const triageQuestions = [
		'What is the employee name?',
		'What is the employee id?',
		'What is the email of the employee?',
		'What is the role of the employee?'
	];

	try {
		const questions = triageQuestions.map((q) => ({ name: q, type: 'input' }));
		const answers = await inquirer.prompt(questions);
		console.log(answers['What is the role of the employee?']);
		// MANAGER PROMPTS AND ANSWERS ====================
		if (answers['What is the role of the employee?'].toLowerCase() === 'manager') {
			const officeanswer = await inquirer.prompt({ name: 'What is the office number?', type: 'input' });
			const name = answers['What is the employee name?'];
			const id = answers['What is the employee id?'];
			const email = answers['What is the email of the employee?'];
			const office = officeanswer['What is the office number?'];
			const man = new Manager(name, id, email, office);
			employeeList.push(man);
		}
		//IF STATMENT IF THE USER ENTERS THE ROLE OF INTERN
		//STUDENT PROMPTS AND ANSWERS =======================
		if (answers['What is the role of the employee?'].toLowerCase() === 'intern') {
			const schoolanswer = await inquirer.prompt({
				name: "What is the name of the student's school?",
				type: 'input'
			});
			const name = answers['What is the employee name?'];
			const id = answers['What is the employee id?'];
			const email = answers['What is the email of the employee?'];
			const school = schoolanswer["What is the name of the student's school?"];
			const int = new Intern(name, id, email, school);
			employeeList.push(int);
		}
		//IF STATMENT IF THE USER ENTERS THE ROLE OF ENGINEER
		// ENGINEER PROMPTS AND ANSWERS ============================
		if (answers['What is the role of the employee?'].toLowerCase() === 'engineer') {
			const githubAnswer = await inquirer.prompt({
				name: "What is engineer's github screen name?",
				type: 'input'
			});
			const name = answers['What is the employee name?'];
			const id = answers['What is the employee id?'];
			const email = answers['What is the email of the employee?'];
			const github = githubAnswer["What is engineer's github screen name?"];
			const eng = new Engineer(name, id, email, github);
			employeeList.push(eng);
		}
		//RETURNS EMPLOYEE LIST AND ANSWERS DEPENDING ON ROLES ========
		return employeeList;
	} catch (err) {
		console.log('Error prompting questions', err);
	}
}

function writeToFile(fileName, data) {
	fs.appendFile(fileName, data, function(err) {
		if (err) throw err;
		console.log('Saved!');
	});
}
async function init() {
	let employeeList = [];
	const numberOfEmployees = 1;

	try {
		for (let i = 0; i < numberOfEmployees; i++) {
			employeeList = await askQuestions(employeeList);
		}
	} catch (err) {
		console.log('error:', err);
	}

	const htmlData = render(employeeList);
	writeToFile(outputPath, htmlData);
}

init();

//NPM TEST SUCCESS
// Engineer.test passed
//intern.test passed
//Employee.test passed

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
// for the provided `render` function to work! ```
