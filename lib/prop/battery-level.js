var RSVP = require('rsvp');

function batteryLevel(options) {
  var batteryLevel = options.batteryLevel;

  return new RSVP.Promise(function(resolve, reject) {
    batteryLevel.read(function(error, data) {
      if (error) reject(error)

      var result = data.toString('hex')
      result = parseInt(result, 16)
      
      resolve(result)
    });
  });
}

module.exports = batteryLevel;