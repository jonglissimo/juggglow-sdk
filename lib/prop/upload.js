var fs = require('fs');
var colorCommandId = require('../uuids').sequence.color;
var flashControlAttributeCommandIds = require('../uuids').flashControlAttribute;
var writeLengthCommandId = flashControlAttributeCommandIds.writeLength;
var writeDataCommandId = flashControlAttributeCommandIds.writeData;
var getHex = require('../utils/get-hex');
var raw = require('./raw');
var RSVP = require('rsvp');
var removeAndAddListener = require('../utils/remove-and-add-listener');

function upload(options) {
  var checkCancelCondition = options.checkCancelCondition;
  var setProgress = options.setProgress;
  var dataListeners = options.dataListeners;
  var flashDataCharacteristic = options.flashData;
  var flashControlCharacteristic = options.flashControl;
  var lengthAlreadySent = 0;
  var queue = [];

  var filePath = options.filePath;
  var filePaths = options.filePaths;
  var flashData = createMainHeader();

  if (!filePaths) {
    filePaths = [filePath]
  }

  var promise = new RSVP.Promise(function(resolve, reject) {
    filePaths.forEach(function(filePath) {
      if (filePath) {
        var csv = fs.readFileSync(filePath, 'utf8');
        var sequenceData = createSequenceData(csv, reject);
        flashData +=  createSequenceHeader(sequenceData) + sequenceData
      }
    });

    flashControlCharacteristic.notify(true, function(error) {
      if (error) { 
        console.log('ERROR: ' + error);
        reject(error);
      }
    });

    var dataListener = {
      emitter: flashControlCharacteristic,
      eventName: 'data',
      method: function dataHandler (data, isNotification) {
        dequeue(queue, resolve, checkCancelCondition);
      }
    }

    removeAndAddListener(dataListeners, dataListener);

    while (flashData.length > lengthAlreadySent) {
      (function() {
        var length = 40;
        length = (lengthAlreadySent + 40 >= flashData.length) ? flashData.length - lengthAlreadySent : 40;

        var junk = flashData.slice(lengthAlreadySent, lengthAlreadySent+length);
        var countBytes = length / 2;
        var lengthAlreadySentInBytes = (lengthAlreadySent > 0) ? lengthAlreadySent / 2 : 0;

        (function(alreadySent, totalLength) {
          queue.push(function() {
            raw({characteristic: flashDataCharacteristic, command: junk, length: countBytes});
            raw({characteristic: flashControlCharacteristic, command: createControlAttribute(countBytes, lengthAlreadySentInBytes)});

            var progress = alreadySent / totalLength;
            setProgress(progress);
          });
        })(lengthAlreadySent+length, flashData.length);

        lengthAlreadySent += length;
      })();
    }

    var endWriteProcess = function() {
      raw({characteristic: flashControlCharacteristic, command: writeLengthCommandId}); // end write process
    }

    queue.push(endWriteProcess);

    dequeue(queue, resolve, checkCancelCondition); // start queue, send commands
  })

  return promise;
}


function readCsv (csv, reject) {
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
    var error = 'malformed CSV. No header found: Type;Top R;Top G;Top B;Bottom R;Bottom G;Bottom B;Interval'
    console.log(error);
    reject(error)
  }
}

function createMainHeader () {
  return 'A55A0000000000000000000000000000'; // A55A is what android app sends; 5AA5 is what documentation says!?
}

function createSequenceHeader (data) {
  var length = parseInt(data.length / 2);
  return 'A55A' + getHex(length, 4) + '00000000000000000000';
}

function createSequenceData (csv, reject) {
  var csvData = readCsv(csv, reject);
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
      reject('Sequence data: Only C commands are supported for now.')
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

function dequeue(queue, resolve, checkCancelCondition) {
  var cancelCondition = checkCancelCondition();

  if (cancelCondition) {
    resolve(false);
  } else {
    var next = queue.shift();

    if (next) next();
    else {
      console.log('finished upload');
      resolve(true);
    }
  }
}

module.exports = upload;