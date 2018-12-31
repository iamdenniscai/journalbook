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

	describe('checkNames', function(){
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
});