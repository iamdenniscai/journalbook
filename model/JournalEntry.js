const log4js = require('log4js');

class JournalEntry{
	constructor(id, desc, date, debit, credit){
		this.id = id;
		this.desc = desc;
		this.date = date;
		this.debit = debit;
		this.credit = credit;
	}	
}

module.exports = JournalEntry;