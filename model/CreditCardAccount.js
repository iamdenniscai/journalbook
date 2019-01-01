const log4js = require('log4js');

class CreditCardAccount{
	constructor(name, curr, openBal, openDate){
		this.name = name;
		this.curr = curr;
		this.openBal = openBal;
		this.openDate = openDate;
	}
}

module.exports = Account;