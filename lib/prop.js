var debug = require('debug')('prop');
var events = require('events');
var util = require('util');
var propFn = require('./prop/index');

function Prop(options) {
  var peripheral = options.peripheral;
  var bluetooth = options.bluetooth;
  var service = options.service;

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
  this._colorLastTime;
  this._colorDeferTimer;

  debug('Created prop ' + this.name + ' (uuid: ' + this.uuid + '). Ready to connect.');
}

util.inherits(Prop, events.EventEmitter);


// PUBLIC

Prop.prototype.shutdown = function() {
  return propFn.shutdown({
    prop: this,
    props: this._service.connectedProps,
    characteristic: this._characteristics.ballControl,
    service: this._service
  });
};

Prop.prototype.disconnect = function() {
  this._service.connectedProps.remove(this.uuid);
  this._peripheral.removeListener('disconnect', this.reconnectListener);

  this.emit('disconnected', this);
  this._service.emit('diconnected', this);
  
  this._peripheral.disconnect();
};

Prop.prototype.chargingIndication = function(options) {
  return propFn.chargingIndication({
    enable: options.enable,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.standAloneMode = function(options) {
  return propFn.standAloneMode({
    enable: options.enable,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.stopMode = function(options) {
  propFn.stopMode({
    seconds: options.seconds,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.standbyMode = function(options) {
  propFn.standbyMode({
    minutes: options.minutes,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.txPower = function(options) {
  propFn.txPower({
    strength: options.strength,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.color = function(options) {
  options = Array.isArray(options) ? { color: options } : options;

  var now = +new Date;
  var threshhold = 100;
  var that = this;

  if (this._colorLastTime && now < this._colorLastTime + threshhold) {
      var deferTime = now;

      // hold on to it
      clearTimeout(this._colorDeferTimer);
      
      this._colorDeferTimer = setTimeout(function () {
        that._colorLastTime = now;
       
        propFn.color({
          color: options.color,
          color2: options.color2,
          characteristic: that._characteristics.ballControl
        });
      }, threshhold);
    } else {
      this._colorLastTime = now;
      clearTimeout(this._colorDeferTimer);

      propFn.color({
        color: options.color,
        color2: options.color2,
        characteristic: this._characteristics.ballControl
      });
    }    
};

Prop.prototype.fade = function(options) {
  propFn.fade({
    colorStart: options.colorStart,
    colorEnd: options.colorEnd,
    duration: options.duration,
    mode: options.mode,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.rainbow = function(options) {
  propFn.rainbow({
    duration: options.duration,
    mode: options.mode,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.strobe = function(options) {
  propFn.strobe({
    interval: options.interval,
    dutyCycle: options.dutyCycle,
    color: options.color,
    color2: options.color2,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.randomColor = function(options) {
  propFn.randomColor({
    interval: options.interval,
    dutyCycle: options.dutyCycle,
    mode: options.mode,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.runSequence = function(options) {
  propFn.runSequence({
    sequenceNo: options.sequenceNo,
    delay: options.delay,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.effectOnEvent = function(options) {
  propFn.effectOnEvent({
    event: options.event,
    command: options.command,
    permanent: options.permanent,
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.removeEffectOnEvents = function() {
  propFn.removeEffectOnEvents({
    characteristic: this._characteristics.ballControl
  });
};

Prop.prototype.upload = function(options) {
  return propFn.upload({
    filePath: options.filePath,
    flashData: this._characteristics.flashData,
    flashControl: this._characteristics.flashControl
  });
};

Prop.prototype.raw = function(options) {
  propFn.raw({
    command: options.command,
    characteristic: this._characteristics.ballControl
  });
};


// PRIVATE
Prop.prototype._connect = function() {
  return propFn.connect({
    prop: this,
    connectedProps: this._service.connectedProps,
    foundProps: this._service.foundProps,
    service: this._service,
    bluetooth: this._bluetooth
  });
};

Prop.prototype._activateEventNotifications = function(service) {
  propFn.activateEventNotifications(this, this._characteristics.ballEventNotification, service);
};

module.exports = Prop;