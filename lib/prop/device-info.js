var RSVP = require('rsvp');

function deviceInfo(options) {
  var manufacture = options.manufacture;
  var modelNo = options.modelNo;
  var serialNo = options.serialNo;
  var firmwareRev = options.firmwareRev;
  var hardwareRev = options.hardwareRev;
  var softwareRev = options.softwareRev;

  return RSVP.hash({
    manufacture: createPromise(manufacture),
    modelNo: createPromise(modelNo),
    serialNo: createPromise(serialNo),
    firmwareRev: createPromise(firmwareRev),
    hardwareRev: createPromise(hardwareRev),
    softwareRev: createPromise(softwareRev),
  });
}

function createPromise(characteristic) {
  return new RSVP.Promise(function(resolve, reject) {
    characteristic.read(function(error, data) {
      if (error) reject(error)
      var result = data.toString('utf8')
      resolve(result)
    }) ;
  });
}

module.exports = deviceInfo;