// This example scans for 3 seconds to find juggglows
// It then connects to one juggglow.
// It then sets up a listeners for:
// 1) throw events to change the color to white
// 2) catch events to change the color to green

process.env.DEBUG = 'service,service:*,prop,prop:*,raw'; // activate debug messages

var jService = require('../index.js');

jService.scan({ seconds: 3 })
.catch(function(error) {
  console.log('ERROR: ' + error);
});

jService.on('found', function(peripheral) {
  return jService.connect({ peripheral: peripheral });
});

jService.on('connected', function(prop) {
  console.log('connected');
  jService.on('throw', function (prop) {
    prop.color([255,255,255]);
  });

  jService.on('catch', function (prop) {
    prop.color([0,255,0]);
  });
});

