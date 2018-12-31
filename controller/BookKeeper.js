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

	addCurrentAsset(name, curr, openBal, openDate){
		var account = this.createAccount(name, curr, openBal, openDate);
		this.ledger.assets.current[name] = account;
	}

	addCurrentLiability(name, curr, openBal, openDate){
		var account = this.createAccount(name, curr, openBal, openDate);
		this.ledger.liabilities.current[name] = account;
	}

	addExpense(name){
		this.checkAccountExist(name);
		this.ledger.expenses.push(name);
	}

	addGain(name){
		this.checkAccountExist(name);
		this.ledger.gains.push(name);
	}

	addIncome(name){
		this.checkAccountExist(name);
		this.ledger.income.push(name);
	}

	addLoss(name){
		this.checkAccountExist(name);
		this.ledger.losses.push(name);
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

	createAccount(name, curr, openBal, openDate){
		if(this.checkAccountExist(name)){
			throw "Account name already exists"; 
		}
		var account = new Account(name, curr, openBal, openDate);
		return account;
	}
}

module.exports = BookKeeper;