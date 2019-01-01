const log4js = require('log4js');

const Ledger = require('../model/Ledger.js');
const Account = require('../model/Account.js');
const JournalEntry = require('../model/JournalEntry.js');
const Entry = require('../model/Entry.js');

class BookKeeper{

	constructor(ledger, journalList){
		if(ledger == null){
			this.ledger = new Ledger();
			this.journalList = {};
		}else{
			this.ledger = ledger;
			this.journalList = journalList == null ? {} : journalList;
		}
	}

	addCreditCardAccount(name, curr, openBal, openDate, stmDate){
		var account = this.createAccount(name, curr, openBal, openDate, stmDate);
		this.ledger.liabilities.current[name] = account;
		return account;
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
			throw "Account name " + name + " already exists";
		}
		this.ledger.expenses.push(name);
		return name;
	}

	addGain(name){
		if(this.checkAccountExist(name)){
			throw "Account name " + name + " already exists";
		}
		this.ledger.gains.push(name);
		return name;
	}

	addIncome(name){
		if(this.checkAccountExist(name)){
			throw "Account name " + name + " already exists";
		}
		this.ledger.income.push(name);
		return name;
	}

	addJournal(desc, date, curr, amount, debitAcc, creditAcc){
		var id = Object.getOwnPropertyNames(this.journalList).length + 1;
		var debitEntry = new Entry(debitAcc, curr, amount);
		var creditEntry = new Entry(creditAcc, curr, amount);
		var journal = new JournalEntry(id, desc, date, debitEntry, creditEntry);
		this.journalList[id] = journal;
		return journal;
	}

	addLoss(name){
		if(this.checkAccountExist(name)){
			throw "Account name " + name + " already exists";
		}
		this.ledger.losses.push(name);
		return name;
	}

	checkAccountExist(name){
		return this.getAccount(name) != null ? true : false;
	}

	createAccount(name, curr, openBal, openDate){
		if(this.checkAccountExist(name)){
			throw "Account name: " + name + " already exists"; 
		}
		var account = new Account(name, curr, openBal, openDate);
		return account;
	}

	editAccount(name, curr, openBal, openDate){
		var acc = this.getAccount(name);
		if(acc == null){
			throw "Account name " + name + " does not exist";
		}
		acc.curr = curr;
		acc.openBal = openBal;
		acc.openDate = openDate;
		return acc;
	}

	getAccount(name){
		var acc = this.ledger.assets.fixed;
		var category = Object.getOwnPropertyNames(acc);
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return acc[category[i]];
			}
		}
		acc = this.ledger.assets.current;
		category = Object.getOwnPropertyNames(acc);
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return acc[category[i]];
			}
		}
		acc = this.ledger.liabilities.current;
		category = Object.getOwnPropertyNames(acc);
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return acc[category[i]];
			}
		}
		acc = this.ledger.liabilities.longterm;
		category = Object.getOwnPropertyNames(acc);
		for(var i=0; i<category.length; i++){
			if(category[i] == name){
				return acc[category[i]];
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