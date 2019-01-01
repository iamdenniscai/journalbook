const log4js = require('log4js');

class Entry{
	constructor(account, curr, amount){
		this.account = account;
		this.curr = curr;
		this.amount = amount;
	}
}

module.exports = Entry;