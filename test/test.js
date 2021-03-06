require('dotenv').config();

const assert = require('assert');
const log4js = require('log4js');

const BookKeeper = require('../controller/BookKeeper.js');
const Account = require('../model/Account.js');
const CreditCardAccount = require('../model/CreditCardAccount.js');

var logger;

describe('BookKeeper', function(){
	
	var bookKeeper;
	
	before(function(){
		logger = log4js.getLogger('BookKeeper Test');
		logger.level = process.env.LOG_LEVEL;

		bookKeeper = new BookKeeper();
	});

	describe('checkAccountExist', function(){
		it('empty account should be ok', function(){
			bookKeeper.checkAccountExist();
		});
		it('%8asw account should not exist', function(){
			assert.equal(bookKeeper.checkAccountExist('%8asw'), false);
		});
	});

	describe('addCurrentAsset', function(){
		it('Cash SGD is added to Current Assets', function(){
			bookKeeper.addCurrentAsset('Cash SGD', 'SGD', 0, new Date(2019,1,1));
			var asset = bookKeeper.ledger.assets.current['Cash SGD'];
			assert.equal(asset.curr, 'SGD');
		});
	});
	
	describe('addCurrentLiability', function(){
		it('Loan is added to Current Liability', function(){
			bookKeeper.addCurrentLiability('Loan', 'SGD', 0, new Date(2019,1,1));
			var liability = bookKeeper.ledger.liabilities.current.Loan;
			assert.equal(liability.openBal, 0);
		});
	});

	describe('addIncome', function(){
		it('Salary is added to income', function(){
			bookKeeper.addIncome('Salary');
			var found = false;
			var income = bookKeeper.ledger.income;
			for(var i=0; i<income.length; i++){
				if(income[i] == 'Salary'){
					found = true;
				}
			}
			assert.equal(found, true);
		});
	});

	describe('addExpense', function(){
		it('Food is added to expenses', function(){
			bookKeeper.addExpense('Food');
			var found = false;
			var expenses = bookKeeper.ledger.expenses;
			for(var i=0; i<expenses.length; i++){
				if(expenses[i] == 'Food'){
					found = true;
				}
			}
			assert.equal(found, true);
		});

		it('Salary cannot be added to expenses', function(){
			try{
				bookKeeper.addExpense('Salary');
				var found = false;
				var expenses = bookKeeper.ledger.expenses;
				for(var i=0; i<expenses.length; i++){
					if(expenses[i] == 'Food'){
						found = true;
					}
				}
				assert.equal(found, false);
			}catch(e){
				console.log(e);
			}
		});
	});

	describe('addGain', function(){
		it('Card Reward is added to gains', function(){
			bookKeeper.addGain('Card Reward');
			var found = false;
			var gains = bookKeeper.ledger.gains;
			for(var i=0; i<gains.length; i++){
				if(gains[i] == 'Card Reward'){
					found = true;
				}
			}
			assert.equal(found, true);
		});
	});

	describe('addLoss', function(){
		it('Unaccounted is added to losses', function(){
			bookKeeper.addLoss('Unaccounted');
			var found = false;
			var losses = bookKeeper.ledger.losses;
			for(var i=0; i<losses.length; i++){
				if(losses[i] == 'Unaccounted'){
					found = true;
				}
			}
			assert.equal(found, true);
		});
	});

	describe('getAccount', function(){
		it('should be able to find current asset', function(){
			var acc = bookKeeper.getAccount('Cash SGD');
			assert(acc != null);
		});
		it('should be able to find expense', function(){
			var acc = bookKeeper.getAccount('Food');
			assert(acc != null);
		});
	});

	describe('editAccount', function(){
		it('Loan is now USD', function(){
			var acc = bookKeeper.editAccount(new Account('Loan', 'USD', 0, new Date(2019,1,1)));
			assert.equal(bookKeeper.ledger.liabilities.current.Loan.curr, 'USD');
		});
	});

	describe('addCreditCardAccount', function(){
		it('Citibank PremiereMiles is added to current liabilities', function(){
			var acc = bookKeeper.addCreditCardAccount('Citibank PremiereMiles', 'SGD', 0, new Date(2019,1,1), 12);
			assert(bookKeeper.ledger.liabilities.current['Citibank PremiereMiles'] != null);
		});
	});

	describe('editCreditCardAccount', function(){
		it('Citibank PremiereMiles has statement date on the 15th', function(){
			var acc = bookKeeper.editAccount(new CreditCardAccount('Citibank PremiereMiles', 'SGD', 0, new Date(2019,1,1), 15));
			assert.equal(bookKeeper.ledger.liabilities.current['Citibank PremiereMiles'].stmDate, 15);
		});
	});

	describe('addJournal', function(){
		it('Lunch Journal is added', function(){
			var journal = bookKeeper.addJournal('Lunch', new Date(2019,1,1), 'SGD', '80', 'Food', 'Cash SGD');
			assert.equal(bookKeeper.journalList[journal.id].desc, 'Lunch');
		});
		it('Dinner Journal is added', function(){
			var journal = bookKeeper.addJournal('Dinner', new Date(2019,1,1), 'SGD', '80', 'Food', 'Cash SGD');
			assert.equal(bookKeeper.journalList[journal.id].desc, 'Dinner');
		});
	});

	describe('getJournal', function(){
		it('Journal is added', function(){
			var journal = bookKeeper.getJournal(2);
			assert.equal(journal.desc, 'Dinner');
		});
	});
});