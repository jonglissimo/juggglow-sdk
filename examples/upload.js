// This example scans for 3 seconds to find juggglows
// It then connects to one juggglow.
// It then uploads the test.csv sequence

process.env.DEBUG = 'service,service:*,prop,prop:connect,raw'; // activate debug messages

var jService = require('../index.js');

jService.scan({ seconds: 3 }).then(function(props) {
  return jService.connectAll({ count:1 });
}).then(function(props) {
  return jService.uploadAll({ filePath: 'examples/test.csv' });
}).then(function() {
  jService.colorAll([0,255,0]); // indicate success visually
}).catch(function(error) {
  console.log('ERROR: ' + error);
});

