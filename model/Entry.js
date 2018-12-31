const log4js = require('log4js');

class Entry{
	constructor(desc, curr, amount){
		this.desc = desc;
		this.curr = curr;
		this.amount = amount;
	}
}

module.exports = Entry;