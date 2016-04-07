module.exports = {
	sessionSecret: process.env.sessionSecret || 'DoIWannaKnow',
	dbURL: 'mongodb://localhost:27017/icici',
	userCollection: 'userAccounts',
	gullakCollection: 'gullakAccounts',
	clientId: 'duaraghav8@gmail.com',
	token: 'f0eb72ad5b64',
	gullakAccountNo: '5555666677770815',
	balanceEnquiryURL: 'http://retailbanking.mybluemix.net/banking/icicibank/balanceenquiry?client_id=<CLIENT_ID>&token=<TOKEN>&accountno=<ACCOUNT_NO>',
	transactionsURL: 'http://retailbanking.mybluemix.net/banking/icicibank/ndaystransaction?client_id=<CLIENT_ID>&token=<TOKEN>&accountno=<ACCOUNT_NO>&days=<DAYS>',
	fundTransferURL: 'http://retailbanking.mybluemix.net/banking/icicibank/fundTransfer?client_id=<CLIENT_ID>&token=<TOKEN>&srcAccount=<SRC_ACCOUNT>&destAccount=<DEST_ACCOUNT>&amt=<AMOUNT>&payeeDesc=payeedesc&payeeId=1&type_of_transaction=DTH'
};
