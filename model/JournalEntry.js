class JournalEntry{
	constructor(id, desc, debit, credit){
		this.id = id;
		this.desc = desc;
		this.debit = debit;
		this.credit = credit;
	}	
}

module.exports = JournalEntry;