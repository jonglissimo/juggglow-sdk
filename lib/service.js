var noble = require('noble');
var events = require('events');
var util = require('util');
var JuggglowMap = require('./utils/map');
var serviceFn = require('./service/index');

function Service(n) {
    events.EventEmitter.call(this);

    // PUBLIC
    this.name = n;

    // PRIVATE
    this._connectedProps = new JuggglowMap('CONNECTED PROPS');
    this._foundProps = new JuggglowMap('FOUND PROPS');
    this._bluetooth = noble;
}

util.inherits(Service, events.EventEmitter);

Service.prototype.scan = function(seconds) {
  return serviceFn.scan(seconds, this._foundProps, this._bluetooth, this);
};

Service.prototype.connect = function(peripheral) {
  return serviceFn.connect(peripheral, this._connectedProps, this._bluetooth, this);
};

Service.prototype.connectAll = function(count, awaitAll) {
  return serviceFn.connectAll(count, awaitAll, this._foundProps, this._connectedProps, this._bluetooth, this);
};

Service.prototype.shutdownAll = function() {
  serviceFn.shutdownAll(this._connectedProps);
};

Service.prototype.standAloneModeAll = function(enable) {
  serviceFn.standAloneModeAll(enable, this._connectedProps);
};

Service.prototype.stopModeAll = function(duration) {
  serviceFn.stopModeAll(duration, this._connectedProps);
};

Service.prototype.standbyModeAll = function(duration) {
  serviceFn.standbyModeAll(duration, this._connectedProps);
};

Service.prototype.txPowerAll = function(strength) {
  serviceFn.txPowerAll(strength, this._connectedProps);
};

Service.prototype.colorAll = function(color1, color2) {
  serviceFn.colorAll(color1, color2, this._connectedProps);
};

Service.prototype.fadeAll = function(colorStart, colorEnd, duration, mode) {
  serviceFn.fadeAll(colorStart, colorEnd, duration, mode, this._connectedProps);
};

Service.prototype.rainbowAll = function(duration, mode) {
  serviceFn.rainbowAll(duration, mode, this._connectedProps);
};

Service.prototype.strobeAll = function(duration, dutyCycle, color1, color2) {
  serviceFn.strobeAll(duration, dutyCycle, color1, color2, this._connectedProps);
};

Service.prototype.randomColorAll = function(duration, dutyCycle, mode) {
  serviceFn.randomColorAll(duration, dutyCycle, mode, this._connectedProps);
};

Service.prototype.runSequenceAll = function(sequenceNo, delay) {
  serviceFn.runSequenceAll(sequenceNo, delay, this._connectedProps);
};

Service.prototype.effectOnEvent = function(event, command, permanent) {
  serviceFn.effectOnEvent(event, command, permanent, this._connectedProps);
};

Service.prototype.removeEffectOnEventsAll = function() {
  serviceFn.removeEffectOnEventsAll(this._connectedProps);
};

module.exports = Service;