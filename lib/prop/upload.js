var fs = require('fs');
var colorCommandId = require('../uuids').sequence.color;
var flashControlAttributeCommandIds = require('../uuids').flashControlAttribute;
var writeLengthCommandId = flashControlAttributeCommandIds.writeLength;
var writeDataCommandId = flashControlAttributeCommandIds.writeData;
var getHex = require('../utils/get-hex');
var raw = require('./raw');
var RSVP = require('rsvp');

function upload(options) {
  var flashDataCharacteristic = options.flashData;
  var flashControlCharacteristic = options.flashControl;
  var filePath = options.filePath;

  var csv = fs.readFileSync(filePath, 'utf8');
  var sequenceData = createSequenceData(csv);
  var flashData = createMainHeader() + createSequenceHeader(sequenceData) + sequenceData;
  var lengthAlreadySent = 0;
  var queue = [];


  var promise = new RSVP.Promise(function(resolve) {
    flashControlCharacteristic.notify(true, function(error) {
      if (error) { console.log('ERROR: ' + error); }
    });

    var dataHandler = function(data, isNotification) {
        dequeue(queue, resolve);
    };

    flashControlCharacteristic.on('data', dataHandler);


    while (flashData.length > lengthAlreadySent) {
      (function() {
        var length = 40;
        length = (lengthAlreadySent + 40 >= flashData.length) ? flashData.length - lengthAlreadySent : 40;

        var junk = flashData.slice(lengthAlreadySent, lengthAlreadySent+length);
        var countBytes = length / 2;
        var lengthAlreadySentInBytes = (lengthAlreadySent > 0) ? lengthAlreadySent / 2 : 0;

        queue.push(function() {
          raw({characteristic: flashDataCharacteristic, command: junk, length: countBytes});
          raw({characteristic: flashControlCharacteristic, command: createControlAttribute(countBytes, lengthAlreadySentInBytes)});
        });

        lengthAlreadySent += length;
      })();
    }

    var endWriteProcess = function() {
      raw({characteristic: flashControlCharacteristic, command: writeLengthCommandId}); // end write process
    }

    queue.push(endWriteProcess);

    dequeue(queue, resolve); // start queue, send commands
  });

  return promise;
}



function readCsv (csv) {
  var lines = csv.split('\n');
  var commands = [];

  if (lines[0].startsWith('Type')) {
    for (var i=1; i<lines.length; i++) {
      var commandJunks = lines[i].trim().split(';');
      if (commandJunks.length >= 7) {
        commands.push(commandJunks);
      }
    }

    return commands;
  } else {
    console.log('malformed CSV. No header found: Type;Top R;Top G;Top B;Bottom R;Bottom G;Bottom B;Interval');
    return [];
  }
}

function createMainHeader () {
  return 'A55A0000000000000000000000000000'; // A55A is what android app sends; 5AA5 is what documentation says!?
}

function createSequenceHeader (data) {
  var length = parseInt(data.length / 2);
  return 'A55A' + getHex(length, 4) + '00000000000000000000';
}

function createSequenceData (csv) {
  var csvData = readCsv(csv);
  var data = '';

  for (var i=0; i<csvData.length; i++) {
    var line = csvData[i];

    if (line[0] == 'C') {
      var command = colorCommandId;
      command += getHex(line[7],2);
      command += getHex(line[1]);
      command += getHex(line[2]);
      command += getHex(line[3]);
      command += getHex(line[4]);
      command += getHex(line[5]);
      command += getHex(line[6]);

      data += command;
    } else {
      console.log('Only C commands are supported for now.');
    }
  }

  return data;
}

function createControlAttribute (length, offset) {
  var command = writeDataCommandId; // Write data
  command += getHex(length);

  command += '0000';
  command += getHex(offset, 4);

  return command;
}

function dequeue(queue, resolve) {
  var next = queue.shift();
  if (next) next();
  else {
    resolve();
  }
}



module.exports = upload;