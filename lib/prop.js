var debug = require('debug')('prop');
var events = require('events');
var util = require('util');
var propFn = require('./prop/index');
var RSVP = require('rsvp');

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
  this._uploadDataListeners = [];

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
  var that = this;

  return new RSVP.Promise(function(resolve, reject) {
    that._service.connectedProps.remove(that.uuid);
    that._peripheral.removeListener('disconnect', that.reconnectListener);

    that.emit('disconnected', that);
    that._service.emit('diconnected', that);
    
    that._peripheral.disconnect(function (error) {
      if (error) reject(error)
      else resolve()
    });
  });
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
          characteristic: that._characteristics.ballControl,
          event: options.event, 
          permanent: options.permanent
        });
      }, threshhold);
  } else {
      this._colorLastTime = now;
      clearTimeout(this._colorDeferTimer);

      propFn.color({
        color: options.color,
        color2: options.color2,
        characteristic: this._characteristics.ballControl,
        event: options.event,
        permanent: options.permanent
      });
    }    
};

Prop.prototype.colorHex = function(options) {
  return propFn.color(options, true);
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
    characteristic: this._characteristics.ballControl,
    event: options.event, 
    permanent: options.permanent
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
    repetitions: options.repetitions,
    characteristic: this._characteristics.ballControl,
    event: options.event, 
    permanent: options.permanent
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
  this._cancelUpload = false;
  this._uploadProgress = 0;

  var checkCancelCondition = function() {
      return this._cancelUpload;
  }.bind(this);

  var setProgress = function(progress) {
    this._uploadProgress = progress;
    this.emit('uploadProgress', progress);
  }.bind(this);

  return propFn.upload({
    filePath: options.filePath,
    filePaths: options.filePaths,
    flashData: this._characteristics.flashData,
    flashControl: this._characteristics.flashControl,
    checkCancelCondition: checkCancelCondition,
    setProgress: setProgress,
    dataListeners: this._uploadDataListeners
  });
};

Prop.prototype.cancelUpload = function() {
  this._cancelUpload = true;
}



Prop.prototype.deviceInfo = function() {
  return propFn.deviceInfo({
    manufacture: this._characteristics.manufacture,
    modelNo: this._characteristics.modelNo,
    serialNo: this._characteristics.serialNo,
    firmwareRev: this._characteristics.firmwareRev,
    hardwareRev: this._characteristics.hardwareRev,
    softwareRev: this._characteristics.softwareRev
  });
};

Prop.prototype.batteryLevel = function() {
  var that = this;

  return propFn.batteryLevel({
    batteryLevel: this._characteristics.batteryLevel
  }).then(function (batteryLevel) {
    that.lastBatteryLevel = batteryLevel;
    return RSVP.resolve(batteryLevel);
  })
};

Prop.prototype.raw = function(options) {
  propFn.raw({
    command: options.command,
    characteristic: this._characteristics.ballControl
  });
};


// PRIVATE
Prop.prototype._connect = function(options) {
  options = options || {};

  return propFn.connect({
    timeout: options.timeout,
    prop: this,
    connectedProps: this._service.connectedProps,
    foundProps: this._service.foundProps,
    service: this._service,
    bluetooth: this._bluetooth
  });
};

Prop.prototype._activateEventNotifications = function(service) {
  propFn.activateEventNotifications(this, this._characteristics.ballEventNotification, this._characteristics.batteryLevel, service);
};

module.exports = Prop;