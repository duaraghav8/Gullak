'use strict';
/*
  API call to fetch current balance
  API call to fetch transaction data
  fork child process & pass transaction to retrieve estimated weekly expense & suggested saving configuration
  return (current balance, estimated expense & configuration)
*/

var async = require ('async'),
    config = require ('../config/config'),
    request = require ('request'),
    StatusCodes = require ('./StatusCodes');

function processTransactions (transactionData) {
  function add (prev, current) { return (prev + current); }
  var wcb = [], numOfWeeks = 0;    //weekly closing balances, number of weeks

  console.log (transactionData.length);
  for (var i = 0; i < transactionData.length; i++) {
    var value = parseFloat (transactionData [i].transaction_amount);
    wcb.push (transactionData [i].credit_debit_flag === 'Cr.' ? value : -value);
  }
  var estWeeklyExpense = wcb.reduce (add, 0) / transactionData.length,
      suggestedSavings = Math.round ( (10 / 100) * estWeeklyExpense );

  return ({ ewe: Math.round (estWeeklyExpense), sc: {saveAmt: suggestedSavings, timeInterval: 7} });
}

process.once ('message', function (accountNo) {
  var balanceInfo = function (callback) {
        var biu = config.balanceEnquiryURL
          .replace ('<CLIENT_ID>', config.clientId)
          .replace ('<ACCOUNT_NO>', accountNo)
          .replace ('<TOKEN>', config.token);

        request (biu, function (err, response, body) {
          body = JSON.parse (body);

          if (body [0].code === StatusCodes.OK) { callback (null, body [1].balance); }
          else { callback (new Error (body [0].message), null); }
        });
      },

      transactionInfo = function (callback) {
        var tu = config.transactionsURL;

        tu = tu.replace ('<CLIENT_ID>', config.clientId);
        tu = tu.replace ('<ACCOUNT_NO>', accountNo);
        tu = tu.replace ('<TOKEN>', config.token);
        tu = tu.replace ('<DAYS>', '365');

        request (tu, function (err, response, body) {
          body = JSON.parse (body);

          if (body [0].code === StatusCodes.OK) { callback (null, body.slice (1, body.length)); }
          else { callback (new Error (body [0].message), null); }
        });
      };

  async.parallel ([balanceInfo, transactionInfo], function (err, results) {
    if (err) {
      process.send ({err: true});
      process.exit ();
    }
    var stats = processTransactions (results [1]);

    process.send ({
      currentBalance: results [0],
      estWeeklyExpense: stats.ewe,
      suggestedConfig: stats.sc
    });
    process.exit ();
  });
});
