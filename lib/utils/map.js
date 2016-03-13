var Hashmap = require('hashmap');
var debug = require('debug')('utils:map');

function Map(name) {
    // PUBLIC
    this.name = name;

    // PRIVATE
    this._hashmap = new Hashmap();
}

Map.prototype.clear = function() {
  debug('Clearing: ' + this.name);
  this._hashmap.clear();
};

Map.prototype.add = function(key, value) {
  debug('Adding to ' + this.name + ' key: ' + key);
  this._hashmap.set(key, value);
};

Map.prototype.remove = function(key) {
  debug('Removing from ' + this.name + ' key: ' + key);
  this._hashmap.remove(key);
};

Map.prototype.get = function(key) {
  debug('Getting from ' + this.name + ' value for key: ' + key);
  return this._hashmap.get(key);
};

Map.prototype.getAll = function() {
  debug('Getting all values from ' + this.name);
  return this._hashmap.values();
};

Map.prototype.getKeys = function() {
  debug('Getting all keys from ' + this.name);
  return this._hashmap.keys();
};

Map.prototype.exists = function(key) {
  debug('Checking if key exists in ' + this.name + ' : ' + key);
  return this._hashmap.has(key);
};

Map.prototype.count = function() {
  var count = this._hashmap.count();
  debug('Counting items in ' + this.name + ': ' + count);
  return count;
};

Map.prototype.forEach = function(callback) {
  this._hashmap.forEach(callback);
};

module.exports = Map;