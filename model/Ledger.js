class Ledger{
	constructor(){
		this.assets = {};
		this.assets.fixed = {};
		this.assets.current = {};
		this.liabilities = {};
		this.liabilities.current = {};
		this.liabilities.longterm = {};
		this.income = [];
		this.expenses = [];
		this.gains = [];
		this.losses = [];
	}
}

module.exports = Ledger;