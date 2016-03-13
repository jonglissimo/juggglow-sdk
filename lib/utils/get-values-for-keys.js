function getValuesForKeys(values) {
  var result = [];

  for(var key in values) {
    result.push(values[key]);
  }

  return result;
}

module.exports = getValuesForKeys;