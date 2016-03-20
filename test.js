process.env.DEBUG = 'service,service:*,prop,prop:*';
process.env.NOBLE_HCI_DEVICE_ID = 0;

var service = require('./index.js');
var inquirer = require('inquirer');

var catchSoundFile = __dirname + '/catch.mp3';
var throwSoundFile = __dirname + '/throw.mp3';
//var player = require('play-sound')();

service.on('found', function(prop) {
  console.log('FOUND PROP');
  //if (prop.uuid == '000780792be7' || prop.uuid == '000780790ac' || prop.uuid == '000780792be8')
  //service.connect(prop);
});

service.scan(2).then(function(props) {
//   console.log('TRYING TO CONNECT');
   return service.connectAll();
}).then(function(props) {
  console.log('SCAN FINISHED!');
  askCommand();
}).catch(function(error) {
  console.log('ERROR from test.js: ' + error);
});


var commandQuestion = {
  type: 'list',
  name: 'command',
  message: 'select command',
  choices: [
    {name: 'set color', value: 1},
    {name: 'fade', value: 2},
    {name: 'rainbow', value: 3},
    {name: 'strobe', value: 4},
    {name: 'random color', value: 13},
    {name: 'random strobe', value: 5},
    {name: 'run sequence', value: 6},
    {name: 'fancy catch/throws', value: 8},
    {name: 'set long stop + standby mode', value: 10},
    {name: 'set standard stop + standby mode', value: 11},
    {name: 'disconnect', value: 9},
    {name: 'connect all', value: 12}
  ]
};

function askCommand() {
  inquirer.prompt([commandQuestion], function( answers ) {
    if (answers.command == 1)      askColor();
    else if (answers.command == 2) askFade();
    else if (answers.command == 3) askRainbow();
    else if (answers.command == 4) askStrobe();
    else if (answers.command == 5) askrandomColor();
    else if (answers.command == 6) askSequence();
    else if (answers.command == 8) askFancy();
    else if (answers.command == 9) askShutdown();
    else if (answers.command == 10) askStopmodeLong();
    else if (answers.command == 11) askStopmodeShort();
    else if (answers.command == 12) { service.connectAll(); askCommand(); }
    else if (answers.command == 13) askRandomColor();
  });
};


var fancyQuestion = {
  type: 'confirm',
  name: 'stop',
  message: 'Stop fancy catch/throws?',
  default: true
};

function askFancy () {
  var catchCallback = function(prop) {
    prop.color([255,255,255]);
    setTimeout(function() { prop.color([0,0,0]) },50);
    setTimeout(function() { prop.color([255,255,255]) },100);
    setTimeout(function() { prop.color([0,0,0]) },150);
    setTimeout(function() { prop.color([255,255,255]) },200);
    player.play(catchSoundFile, function(err){ if (err) { console.log(err); } });
  };

  var throwCallback = function(prop) {
    prop.color([0,255,0]);
    player.play(throwSoundFile, function(err){ if (err) { console.log(err); } });
  };

  service.on('catch', catchCallback);
  service.on('throw', throwCallback);

  inquirer.prompt([fancyQuestion], function( answers ) {
    service.removeListener('catch', catchCallback);
    service.removeListener('throw', throwCallback);
    askCommand();
  });
}


var shutdownQuestion = {
  type: 'confirm',
  name: 'shutdown',
  message: 'Shutdown?',
  default: true
};

function askShutdown() {
  inquirer.prompt([shutdownQuestion], function( answers ) {
    if (answers.shutdown) service.shutdownAll();
    askCommand();
  });
};

function askStopmodeLong() {
  service.stopModeAll(10800);
  service.standbyModeAll(240);
  askCommand();
};

function askStopmodeShort() {
  service.stopModeAll(60);
  service.standbyModeAll(30);
  askCommand();
};


var sequenceQuestion1 = {
  type: 'input',
  name: 'sequenceNr',
  message: 'Which seuqence number?',
  default: 1
};
var sequenceQuestion2 = {
  type: 'input',
  name: 'delay',
  message: 'How much delay?',
  default: 0
};

function askSequence() {
  inquirer.prompt([sequenceQuestion1, sequenceQuestion2], function( answers ) {
    service.runSequenceAll(answers.sequenceNr, answers.delay);
    askCommand();
  });
};


var rainbowQuestion1 = {
  type: 'input',
  name: 'mode',
  message: 'Which mode for rainbow?',
  default: '3'
};
var rainbowQuestion2 = {
  type: 'input',
  name: 'duration',
  message: 'Which duration for rainbow?',
  default: '10'
};

function askRainbow() {
  inquirer.prompt([rainbowQuestion2, rainbowQuestion1], function( answers ) {
    service.rainbowAll(answers.duration, answers.mode);
    askCommand();
  });
};


var fadeQuestion1 = {
  type: 'input',
  name: 'colorStart',
  message: 'First color for fade?',
  default: '255,0,0'
};
var fadeQuestion2 = {
  type: 'input',
  name: 'colorEnd',
  message: 'Last color for fade?',
  default: '0,255,0'
};
var fadeQuestion3 = {
  type: 'input',
  name: 'duration',
  message: 'Duration for fade in seconds?',
  default: '5'
};
var fadeQuestion4 = {
  type: 'input',
  name: 'mode',
  message: 'Mode for fade?',
  default: '3'
};

function askFade() {
  inquirer.prompt([fadeQuestion1, fadeQuestion2, fadeQuestion3, fadeQuestion4], function( answers ) {
    var color1 = answers.colorStart.split(',');
    var color2 = answers.colorEnd.split(',');

    service.fadeAll(color1, color2, answers.duration, answers.mode);
    askCommand();
  });
};


var colorQuestion = {
  type: 'list',
  name: 'color',
  message: 'which color to set for all?',
  choices: [
    {'name': 'red', 'value': '255,0,0'},
    {'name': 'green', 'value': '0,255,0'},
    {'name': 'blue', 'value': '0,0,255'},
    {'name': 'black', 'value': '0,0,0'},
  ]
};

function askColor() {
  inquirer.prompt([colorQuestion], function( answers ) {
    var color = answers.color.split(',');

    service.colorAll(color);
    askCommand();
  });
};


var strobeQuestion1 = {
  type: 'input',
  name: 'colorStart',
  message: 'First color for strobe?',
  default: '255,0,0'
};
var strobeQuestion2 = {
  type: 'input',
  name: 'colorEnd',
  message: 'Last color for strobe?',
  default: '0,255,0'
};
var strobeQuestion3 = {
  type: 'input',
  name: 'duration',
  message: 'Duration for strobe in seconds?',
  default: '5'
};
var strobeQuestion4 = {
  type: 'input',
  name: 'dutyCycle',
  message: 'Duty cycle for strobe (0-1)?',
  default: '0.5'
};

function askStrobe() {
  inquirer.prompt([strobeQuestion1, strobeQuestion2, strobeQuestion3, strobeQuestion4], function( answers ) {
    var color1 = answers.colorStart.split(',');
    var color2 = answers.colorEnd.split(',');
    var dutyCycle = answers.dutyCycle;

    service.strobeAll(answers.duration, dutyCycle, color1, color2);
    askCommand();
  });
};


var randomColorQuestion3 = {
  type: 'input',
  name: 'duration',
  message: 'Duration for randomColor in seconds?',
  default: '5'
};
var randomColorQuestion4 = {
  type: 'input',
  name: 'switchPercent',
  message: 'Switch percent for randomColor (0-255)?',
  default: '127'
};
var randomColorQuestion1 = {
  type: 'input',
  name: 'mode',
  message: 'Which mode for random color?',
  default: '3'
};

function askRandomColor() {
  inquirer.prompt([randomColorQuestion3, randomColorQuestion4, randomColorQuestion1], function( answers ) {
    service.randomColorAll(answers.duration, answers.switchPercent, answers.mode);
    askCommand();
  });
};


