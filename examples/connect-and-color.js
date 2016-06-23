// This example scans for 3 seconds to find juggglows
// It then connects to one juggglow.
// It then changes the color every second between red and white

process.env.DEBUG = 'service,service:*,prop,prop:connect'; // activate debug messages

var jService = require('../index.js');
var colorToggle = true;

jService.scan({ seconds: 3 }).then(function(props) {
  return jService.connectAll({ count:1 });

}).then(function(props) {
  setInterval(function() {
    if (colorToggle) {
      jService.colorAll({ color: [255,0,0] });
    } else {
      jService.colorAll({ color: [255,255,255] });
    }

    colorToggle = !colorToggle;
  }, 1000);

}).catch(function(error) {
  console.log('ERROR: ' + error);
});

