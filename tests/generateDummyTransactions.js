var request = require ('request');
var links = ['http://retailbanking.mybluemix.net/banking/icicibank/fundTransfer?client_id=duaraghav8@gmail.com&token=f0eb72ad5b64&srcAccount=5555666677770814&destAccount=5555666677770816&amt=<AMOUNT>&payeeDesc=payeedesc&payeeId=1&type_of_transaction=DTH',
'http://retailbanking.mybluemix.net/banking/icicibank/fundTransfer?client_id=duaraghav8@gmail.com&token=f0eb72ad5b64&srcAccount=5555666677770816&destAccount=5555666677770814&amt=<AMOUNT>&payeeDesc=payeedesc&payeeId=1&type_of_transaction=DTH'];

for (var i = 0; i < 2; i++) {
	var pos = Math.round (Math.random () * 1),
		amount = Math.round (Math.random () * 5000000);
	request (links [pos].replace ('<AMOUNT>', amount.toString ()), function () {});
}
