var config = require ('../config/config'),
    request = require ('request'),
    gullakModel = require ('mongoose').model (config.gullakCollection),
    cronMapping = {},
    scheduleJob = function (docId, accountNo, config) {
      cronMapping [docId] = setInterval (
        function () { transferToGullak (docId, accountNo, config.save_amount) },
        /*1000 * 60 * 60 * 24 * config.time_interval*/ 2000
      );
    },
    destroyJob = function (docId) {
      clearInterval (cronMapping [docId]);
      delete cronMapping.docId;
    },
    transferToGullak = function (docId, accountNo, saveAmount) {
      var ftu = config.fundTransferURL
        .replace ('<CLIENT_ID>', config.clientId)
        .replace ('<TOKEN>', config.token)
        .replace ('<SRC_ACCOUNT>', accountNo)
        .replace ('<DEST_ACCOUNT>', config.gullakAccountNo)
        .replace ('<AMOUNT>', saveAmount);

      request (ftu, function (err, response, body) {
        if (err) { return; }
        
        body = JSON.parse (body);
        if (body [0].code === 200) {
          gullakModel.findOne ({_id: docId}, function (err, account) {
            if (!err && account) {
              account.net_savings += saveAmount;
              account.save (function (err) {process.exit ();});
            }
          });
        }
      });
    };

module.exports = {
  scheduleJob: scheduleJob,
  destroyJob: destroyJob
};
