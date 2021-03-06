// This example scans for 3 seconds to find juggglows
// When it finds a juggglow it connects to it
// When the juggglow is connected it then changes the color every second between red and white

process.env.DEBUG = 'service,service:*,prop,prop:connect'; // activate debug messages

var jService = require('../index.js');

jService.scan({ seconds: 3 })
.catch(function(error) {
  console.log('ERROR: ' + error);
});

jService.on('found', function(peripheral) {
  return jService.connect({ peripheral: peripheral });
});

jService.on('connected', function(prop) {
  console.log('uploading...')
  prop.color([255,0,0]);

  prop.upload({
    filePaths: [
      'test.csv',
      'test2.csv'
    ]
  }).then(function() {
    console.log('upload successful');
    prop.color([0,255,0]);
  });
});




