const log4js = require('log4js');

const Ledger = require('../model/Ledger.js');
const Account = require('../model/Account.js');
const JournalEntry = require('../model/JournalEntry.js');
const Entry = require('../model/Entry.js');

class BookKeeper{

	constructor(ledger){
		if(ledger == null){
			this.ledger = new Ledger();
		}else{
			this.ledger = ledger;
		}
	}

	checkAccountExist(name){
		var accounts = Object.getOwnPropertyNames(this.ledger);
		for(var i=0; i<accounts.length; i++){
			if(accounts[i] == name){
				return true;
			}else{
				if(typeof(this.ledger[accounts[i]]) === 'object'){
					this.checkAccountExistRecursive(this.ledger[accounts[i]], name);
				}
			}
		}
		return false;
	}

	checkAccountExistRecursive(parent, name){
		var children = Object.getOwnPropertyNames(parent);
		for(var i=0; i<children.length; i++){
			if(children[i] == name){
				return true;
			}
			if(typeof(parent[children[i]]) === 'object'){
				this.checkAccountExistRecursive(parent[children[i]], name);
			}
		}
		return false;
	}

	addAccount(name, curr, openBal, openDate){

	}
}

module.exports = BookKeeper;