//Creating const to run Inquirer, FS, Util,
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
//======================================================

// wrtiefileasync start
const writeFileAsync = util.promisify(fs.writeFile);

// START OF PROMPT QUESTIONS THE USER MUST ANSWER ================================================
function promptUser() {
	return inquirer.prompt([
		{
			type: 'input',
			message: 'What is your ID?',
			name: 'engineerID'
		},
		{
			type: 'input',
			message: 'What is your email address?',
			name: 'userEmail'
		},
		{
			type: 'input',
			message: 'What is the Project Title?',
			name: 'projectTitle'
		},
		{
			type: 'input',
			message: 'Please enter a description for this project:',
			name: 'proDescription'
		},
		{
			type: 'input',
			message: 'Please enter required installations/dependencies for this project:',
			name: 'reqInstalls'
		},
		{
			type: 'input',
			message: 'Please enter usage details for this project:',
			name: 'usage'
		},
		{
			type: 'input',
			message: 'Please enter applicable licenses for your project:',
			name: 'license'
		},
		{
			type: 'input',
			message: 'questions',
			name: 'Enter additional any questions: '
		}
	]);
}
// END OF PROMPT QUESTIONS ===================================

//INQ Promise then gets the answers from prompt user to create a markdown(text)

inqPromise = promptUser();
inqPromise.then(function(answers) {
	// let markdown used to add the text to the readme generated
	let markdown = `
		##Title = ${answers.projectTitle}
	
  ${answers.description}
  ## Table of Contents
  - [Installation](#Installation)
  - [Usage](Usage)
  - [License](#License)
  - [Contributing](#Contributing)
  - [Tests](#Tests)
  - [Questions](#Questions)
  
  ## Installation Requirements
  The following dependiencies are required for project ${answers.projectTitle}: 
  
  ## Usage
  ${answers.usage}
  ## License
  ${answers.license}
  ## Contributing Parties
  ${answers.contributing}
  ## Tests
  ${answers.tests}
  ## Questions
  ${answers.questions}
  ## GitHub Profile
  # ${answers.ghUsername}
  ## Email
  # ${answers.userEmail}

		`;
	//async waits for the user to answers the prompts and then writes to endUserREADME.md
	let writePromise = writeFileAsync('endUserREADME.md', markdown, 'utf8');
	writePromise
		.then(function() {
			console.log('Success! Wrote out to endUserREADME.md');
		})
		.catch(function(err) {
			console.log('Problem writing it out the code!');
		});
});
