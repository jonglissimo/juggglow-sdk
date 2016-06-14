var debug = require('debug')('prop');
var events = require('events');
var util = require('util');
var propFn = require('./prop/index');

function Prop(peripheral, bluetooth, service) {
    events.EventEmitter.call(this);

    // PUBLIC
    this.uuid = peripheral.uuid;
    this.name = peripheral.advertisement.localName;

    // PRIVATE
    this._peripheral = peripheral;
    this._bluetooth = bluetooth;
    this._service = service;
    this._characteristics = {
      'ballControl': null,
      'ballNotification': null
    };

    debug('Created prop ' + this.name + ' (uuid: ' + this.uuid + '). Ready to connect.');
}

util.inherits(Prop, events.EventEmitter);

// PUBLIC
Prop.prototype.connect = function() {
  return propFn.connect(this, this._service.connectedProps, this._service, this._bluetooth);
};

Prop.prototype.shutdown = function() {
  return propFn.shutdown(this, this._service.connectedProps, this._characteristics.ballControl);
};

Prop.prototype.chargingIndication = function(enable) {
  return propFn.chargingIndication(enable, this._characteristics.ballControl);
};

Prop.prototype.standAloneMode = function(enable) {
  return propFn.standAloneMode(enable, this._characteristics.ballControl);
};

Prop.prototype.stopMode = function(duration) {
  propFn.stopMode(duration, this._characteristics.ballControl);
};

Prop.prototype.standbyMode = function(duration) {
  propFn.standbyMode(duration, this._characteristics.ballControl);
};

Prop.prototype.txPower = function(strength) {
  propFn.txPower(strength, this._characteristics.ballControl);
};

Prop.prototype.color = function(color1, color2) {
  propFn.color(color1, color2, this._characteristics.ballControl);
};

Prop.prototype.fade = function(colorStart, colorEnd, duration, mode) {
  propFn.fade(colorStart, colorEnd, duration, mode, this._characteristics.ballControl);
};

Prop.prototype.rainbow = function(duration, mode) {
  propFn.rainbow(duration, mode, this._characteristics.ballControl);
};

Prop.prototype.strobe = function(interval, dutyCycle, color1, color2) {
  propFn.strobe(interval, dutyCycle, color1, color2, this._characteristics.ballControl);
};

Prop.prototype.randomColor = function(interval, dutyCycle, mode) {
  propFn.randomColor(interval, dutyCycle, mode, this._characteristics.ballControl);
};

Prop.prototype.runSequence = function(sequenceNo, delay) {
  propFn.runSequence(sequenceNo, delay, this._characteristics.ballControl);
};

Prop.prototype.effectOnEvent = function(event, command, permanent) {
  propFn.effectOnEvent(event, command, permanent, this._characteristics.ballControl);
};

Prop.prototype.removeEffectOnEvents = function() {
  propFn.removeEffectOnEvents(this._characteristics.ballControl);
};

Prop.prototype.raw = function(command) {
  propFn.raw(command, this._characteristics.ballControl);
};


// PRIVATE
Prop.prototype._activateEventNotifications = function(service) {
  propFn.activateEventNotifications(this, this._characteristics.ballEventNotification, service);
};

module.exports = Prop;