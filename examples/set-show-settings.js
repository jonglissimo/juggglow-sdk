// This example scans for 3 seconds to find juggglows
// It then connects to all found juggglows.
// It then sets settings that you would typically want to set
// if you use the juggglows with sequences (stored in it's flash memory)
// * disables the standalone mode (so that the ball does not accidentally activate a standalone sequence when dropped)
// * sets the standby mode and stop mode to very long (so that the ball does not switch off during the sequence)

process.env.DEBUG = 'service,service:*,prop,prop:connect,raw'; // activate debug messages

var jService = require('../index.js');
var colorToggle = true;

jService.scan({ seconds: 3 })
.catch(function(error) {
  console.log('ERROR: ' + error);
});

jService.on('found', function(peripheral) {
  return jService.connect({ peripheral: peripheral });
});

jService.on('connected', function(prop) {
  jService.stopModeAll({ seconds: 1800 });
  jService.standbyModeAll({ minutes: 120 });
  jService.standAloneModeAll({ enable: false });
  jService.colorAll([0,255,0]); // indicate success visually

  setTimeout(function() {
    jService.shutdownAll();
  }, 2000);
});