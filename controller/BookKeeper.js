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
		return account;
	}

	addCurrentLiability(name, curr, openBal, openDate){
		var account = this.createAccount(name, curr, openBal, openDate);
		this.ledger.liabilities.current[name] = account;
		return account;
	}

	addExpense(name){
		if(this.checkAccountExist(name)){
			throw "Account name already exists";
		}
		this.ledger.expenses.push(name);
		return name;
	}

	addGain(name){
		if(this.checkAccountExist(name)){
			throw "Account name already exists";
		}
		this.ledger.gains.push(name);
		return name;
	}

	addIncome(name){
		if(this.checkAccountExist(name)){
			throw "Account name already exists";
		}
		this.ledger.income.push(name);
		return name;
	}

	addLoss(name){
		if(this.checkAccountExist(name)){
			throw "Account name already exists";
		}
		this.ledger.losses.push(name);
		return name;
	}

	checkAccountExist(name){
		return this.getAccount(name) != null ? true : false;
	}

	createAccount(name, curr, openBal, openDate){
		if(this.checkAccountExist(name)){
			throw "Account name already exists"; 
		}
		var account = new Account(name, curr, openBal, openDate);
		return account;
	}

	editAccount(name, curr, openBal, openDate){
		if(this.checkAccountExist(name) == false){
			throw "Account name does not exist";
		}

	}

	getAccount(name){
		var category = this.ledger.assets.fixed;
		for(var i=0; i<category.length; i++){
			if(category[i].name == name){
				return category[i];
			}
		}
		category = this.ledger.assets.current;
		for(var i=0; i<category.length; i++){
			if(category[i].name == name){
				return category[i];
			}
		}
		category = this.ledger.liabilities.current;
		for(var i=0; i<category.length; i++){
			if(category[i].name == name){
				return category[i];
			}
		}
		category = this.ledger.liabilities.longterm;
		for(var i=0; i<category.length; i++){
			if(category[i].name == name){
				return category[i];
			}
		}
		category = this.ledger.income;
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return category[i];
			}
		}
		category = this.ledger.expenses;
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return category[i];
			}
		}
		category = this.ledger.gains;
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return category[i];
			}
		}
		category = this.ledger.losses;
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return category[i];
			}
		}
		return null;
	}
}

module.exports = BookKeeper;