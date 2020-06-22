// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('../Employee');
const Manager = require('../lib/Employee');

class Manager extends Employee {
	constructor(name, id, email, office) {
		super(name, id, email);
		this.office = office;
	}

	getOfficeNumber() {
		return this.office;
	}

	getRole() {
		return 'Manager';
	}
}
module.exports = Manager;
