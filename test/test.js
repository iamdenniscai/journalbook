require('dotenv').config();

const assert = require('assert');
const log4js = require('log4js');

const BookKeeper = require('../controller/BookKeeper.js');

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
			var acc = bookKeeper.editAccount('Loan', 'USD', 0, new Date(2019,1,1))
			assert.equal(bookKeeper.ledger.liabilities.current.Loan.curr, 'USD');
		});
	});
});