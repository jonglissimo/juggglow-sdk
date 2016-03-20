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

/**
Scan for Juggglow devices for given seconds

@param {number} [seconds] - Number of seconds (default: 5)
@public
*/
Service.prototype.scan = function(seconds) {
  return serviceFn.scan(seconds, this._foundProps, this._bluetooth, this);
};

/**
Connect to given Juggglow device

@param {Object} peripheral - Juggglow (noble peripheral) returned from connect method
@public
*/
Service.prototype.connect = function(peripheral) {
  return serviceFn.connect(peripheral, this._connectedProps, this._bluetooth, this);
};

/**
Connect all found Juggglow devices

@param {number} [count] - Amount of found device to connect
@param {boolean} [race] - Return result after first connection (true) OR wait until all are connected
@public
*/
Service.prototype.connectAll = function(count, race) {
  return serviceFn.connectAll(count, race, this._foundProps, this._connectedProps, this._bluetooth, this);
};

/**
Shutdown all connected Juggglow devices

@public
*/
Service.prototype.shutdownAll = function() {
  serviceFn.shutdownAll(this._connectedProps);
};

/**
Enable or disable standalone mode

@param {boolean} enable
@public
*/
Service.prototype.standAloneModeAll = function(enable) {
  serviceFn.standAloneModeAll(enable, this._connectedProps);
};

/**
Set duration of Stop Mode for all connected Juggglow devices

@param {number} duration - Duration in seconds [60-65535] (default: 60)
@public
*/
Service.prototype.stopModeAll = function(duration) {
  serviceFn.stopModeAll(duration, this._connectedProps);
};

/**
Set duration of Standby Mode for all connected Juggglow devices

@param {number} duration - Duration in minutes [1-65535] (default: 30)
@public
*/
Service.prototype.standbyModeAll = function(duration) {
  serviceFn.standbyModeAll(duration, this._connectedProps);
};

/**
Enable or disable the charging indication for all Juggglow devices

@param {boolean} enable
@public
*/
Service.prototype.chargingIndicationAll = function(enable) {
  serviceFn.chargingIndicationAll(enable, this._connectedProps);
};

/**
Set the tx power (signal strength) of the Juggglow bluetooth module

@param {number} strength - Strength [0-14] (default: 10)
@public
*/
Service.prototype.txPowerAll = function(strength) {
  serviceFn.txPowerAll(strength, this._connectedProps);
};

/**
Change the color of all connected Juggglow devices

@param {array} color1 - color for top LED (RGB color array [255,0,0] for red)
@param {array} [color2] - color for bottom LED
@public
*/
Service.prototype.colorAll = function(color1, color2) {
  serviceFn.colorAll(color1, color2, this._connectedProps);
};

/**
Fade between two colors for all connected Juggglow devices

@param {array} colorStart - start color (RGB color array [255,0,0] for red)
@param {array} colorEnd - end color
@param {number} duration - duration of fade in hsec
@param {String} mode - define fading mode (e.g. '03' for both halfs fading, cf. Juggglow API from www.juggglow.com)
*/
Service.prototype.fadeAll = function(colorStart, colorEnd, duration, mode) {
  serviceFn.fadeAll(colorStart, colorEnd, duration, mode, this._connectedProps);
};

/**
Rainbow effect for all connected Juggglow devices

@param {number} duration - duration of rainbow effect in hsec
@param {String} mode - define rainbow mode (e.g. '03' for both halfs fading, cf. Juggglow API from www.juggglow.com)
*/
Service.prototype.rainbowAll = function(duration, mode) {
  serviceFn.rainbowAll(duration, mode, this._connectedProps);
};

/**
Strobe all connected Juggglow devices

@param {number} interval - interval in ms [10-2560] (eg. 2560 for 2,56 seconds)
@param {number} dutyCycle - duty cycle of ON phase of effect [0-1] (e.g. 1 for 100% ON, 0% OFF)
@param {array} color1 - color for top LED (RGB color array [255,0,0] for red)
@param {array} [color2] - color for bottom LED
*/
Service.prototype.strobeAll = function(duration, dutyCycle, color1, color2) {
  serviceFn.strobeAll(duration, dutyCycle, color1, color2, this._connectedProps);
};

/**
Random color for all connected Juggglow devices

@param {number} interval - interval of one color in ms [100-25600] (eg. 25600 for 25,6 seconds)
@param {number} dutyCycle - duty cycle of ON phase of effect [0-1] (e.g. 1 for 100% ON, 0% OFF)
@param {String} mode - define random color mode (e.g. '03' for both halfs same color, cf. Juggglow API from www.juggglow.com)
@public
*/
Service.prototype.randomColorAll = function(interval, dutyCycle, mode) {
  serviceFn.randomColorAll(interval, dutyCycle, mode, this._connectedProps);
};

/**
Start a sequence for all Juggglow devices

@param {number} sequenceNo - Start sequence with this number
@param {number} delay - Delay start for number of seconds
@public
*/
Service.prototype.runSequenceAll = function(sequenceNo, delay) {
  serviceFn.runSequenceAll(sequenceNo, delay, this._connectedProps);
};

/**
Set a effect on event for all Juggglow devices

@param {String} event - Event (e.g. 'boot', 'powerloss', 'catch', 'throw', 'drop')
@param {String} command - Hex command to configure (eg. '34FFFFFFFFFFFF' for white colored ball; cf. Juggglow API from www.juggglow.com)
@param {boolean} permanent - Make it permanent (persist after reboot of Juggglow device)
@public
*/
Service.prototype.effectOnEvent = function(event, command, permanent) {
  serviceFn.effectOnEvent(event, command, permanent, this._connectedProps);
};

/**
Remove all effects on events for all Juggglow devices

@public
*/
Service.prototype.removeEffectOnEventsAll = function() {
  serviceFn.removeEffectOnEventsAll(this._connectedProps);
};

/**
Set a raw hex command for all Juggglow devices
The available commands are listed in the Juggglow API from www.juggglow.com

An example for a raw hex command:
'34FFFFFFFFFFFF' will set the ball color to white

@param {String} command - hex command
@public
*/
Service.prototype.rawAll = function(command) {
  serviceFn.rawAll(command, this._connectedProps);
};

module.exports = Service;