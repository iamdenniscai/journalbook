var assert = require('assert');
const BookKeeper = require('../controller/BookKeeper.js');

describe('BookKeeper', function(){
	describe('Constructor', function(){
		it('should create without errors', function(){
			var bookKeeper = new BookKeeper();
		});
	});
});