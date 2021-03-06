function numberToHex (number, noOfBytes) {
  var hex = '';
  var hexLength = 2;
  noOfBytes = (noOfBytes === undefined) ? 1 : noOfBytes;

  number = parseInt(number,10);
  number = (number == 'NaN') ? 0 : number;

  number = (noOfBytes === 1 && (number < 0 || number > 255)) ? 0 : number;
  number = (noOfBytes === 2 && (number < 0 || number > 65535)) ? 0 : number;
  number = (noOfBytes === 3 && (number < 0 || number > 16777215)) ? 0 : number;
  number = (noOfBytes === 4 && (number < 0 || number > 4294967295)) ? 0 : number;

  hex = number.toString(16);  // convert to hex
  hexLength = hex.length;

  // pad short hex with zeros
  for (var i = hexLength; i < noOfBytes*2; i++) {
    hex = '0' + hex;
  }

  // reverse byte order
  if (noOfBytes > 1) {
    var reversed = '';

    for (var i=noOfBytes; i>0; i--) {
      var pos1 = i*2-2;
      var pos2 = i*2-1;
      reversed += hex.charAt(pos1) + hex.charAt(pos2);
    }

    hex = reversed;
  }

  return hex;
}

function getColorHex (input) {
  return numberToHex(input[0]) + numberToHex(input[1]) + numberToHex(input[2]);
}

function getHex(input, noOfBytes) {
  return (Array.isArray(input)) ? getColorHex(input) : numberToHex(input, noOfBytes);
}

module.exports = getHex;