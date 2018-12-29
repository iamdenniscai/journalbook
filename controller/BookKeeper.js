const Ledger = require('../model/Ledger.js');
const Account = require('../model/Account.js');
const JournalEntry = require('../model/JournalEntry.js');
const Entry = require('../model/Entry.js');

class BookKeeper{
	constructor(ledger){
		if(ledger === null){
			this.ledger = new Ledger();
		}else{
			this.ledger = ledger;
		}
	}
}

module.exports = BookKeeper;