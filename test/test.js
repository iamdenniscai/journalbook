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
		it('assets account should exist', function(){
			assert.equal(bookKeeper.checkAccountExist('assets'), true);
		});
		it('%8asw account should not exist', function(){
			assert.equal(bookKeeper.checkAccountExist('%8asw'), false);
		});
	});

	describe('addCurrentAsset', function(){
		it('should be ok', function(){
			bookKeeper.addCurrentAsset('Cash SGD', 'SGD', 0, new Date(2019,1,1));
		});
	});
	
	describe('addCurrentLiability', function(){
		it('should be ok', function(){
			bookKeeper.addCurrentLiability('Loan', 'SGD', 0, new Date(2019,1,1));
		});
	});

	describe('addIncome', function(){
		it('should be ok', function(){
			bookKeeper.addIncome('Salary');
		});
	});

	describe('addExpense', function(){
		it('should be ok', function(){
			bookKeeper.addExpense('Food');
		});
	});

	describe('addExpense', function(){
		it('should not go through', function(){
			bookKeeper.addIncome('Food');
		});
	});

	describe('addGain', function(){
		it('should be ok', function(){
			bookKeeper.addGain('Card Reward');
		});
	});

	describe('addLoss', function(){
		it('should be ok', function(){
			bookKeeper.addLoss('Unaccounted');
		});
	});
});