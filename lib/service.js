var events = require('events');
var util = require('util');
var os = require('os');
var JuggglowMap = require('./utils/map');
var serviceFn = require('./service/index');
var platform = os.platform();

/**
 * Represents a juggglow SDK service.
 * With a service you can scan and connect juggglows and execute commands
 * @constructor
*/
function Service(n, deviceId) {
    var noble;

    // if ((deviceId || deviceId === 0) && (platform === 'linux' || platform === 'freebsd' || platform === 'win32')) {
    //   // Load noble with custom bindings for multi adapter use
    //   var HciBinding = require('./noble-bindings/bindings-with-id');
    //   var hciBinding = new HciBinding(deviceId);
    //   noble = require('noble/with-bindings')(hciBinding);
    // } else {
      noble = require('@abandonware/noble');
    // }s

    events.EventEmitter.call(this);

    // PUBLIC
    this.name = n;
    this.connectedProps = new JuggglowMap('CONNECTED PROPS');
    this.foundProps = new JuggglowMap('FOUND PROPS');

    // PRIVATE
    this._bluetooth = noble;
}

util.inherits(Service, events.EventEmitter);


/**
Scan for Juggglow devices for given seconds

@param {Object} options
    seconds: Number of seconds (default: 5)
@public
*/
Service.prototype.scan = function(options) {
  options = options || {};

  return serviceFn.scan({
    seconds: options.seconds,
    foundProps: this.foundProps,
    bluetooth: this._bluetooth,
    service: this
  });
};

/**
Connect to given Juggglow device

@param {Object} options
    * {Object} peripheral - Juggglow (noble peripheral) returned from scan method
@public
*/
Service.prototype.connect = function(options) {
  options = options || {};

  return serviceFn.connect({
    peripheral: options.peripheral,
    timeout: options.timeout,
    connectedProps: this.connectedProps,
    bluetooth: this._bluetooth,
    service: this
  });
};

/**
Connect all found Juggglow devices

@param {Object} options
    * {number} [count] - Amount of found device to connect
    * {boolean} [race] - Return result after first connection (true) OR wait until all are connected
@public
*/
Service.prototype.connectAll = function(options) {
  options = options || {};

  return serviceFn.connectAll({
    count: options.count,
    race: options.race,
    timeout: options.timeout,
    foundProps: this.foundProps,
    connectedProps: this.connectedProps,
    bluetooth: this._bluetooth,
    service: this
  });
};

/**
Shutdown all connected Juggglow devices

@public
*/
Service.prototype.shutdownAll = function() {
  serviceFn.shutdownAll({
    props: this.connectedProps
  });
};

/**
Disconnect all connected Juggglow devices

@public
 */
Service.prototype.disconnectAll = function() {
  serviceFn.disconnectAll({
    props: this.connectedProps
  });
}


/**
Enable or disable standalone mode

@param {Object} options
    * {boolean} enable
@public
*/
Service.prototype.standAloneModeAll = function(options) {
  options = options || {};

  serviceFn.standAloneModeAll({
    enable: options.enable,
    props: this.connectedProps
  });
};

/**
Set duration of Stop Mode for all connected Juggglow devices

@param {Object} options
    * {number} seconds - Duration in seconds [60-65535] (default: 60)
@public
*/
Service.prototype.stopModeAll = function(options) {
  options = options || {};

  serviceFn.stopModeAll({
    seconds: options.seconds,
    props: this.connectedProps
  });
};

/**
Set duration of Standby Mode for all connected Juggglow devices

@param {Object} options
    * {number} minutes - Duration in minutes [1-65535] (default: 30)
@public
*/
Service.prototype.standbyModeAll = function(options) {
  options = options || {};

  serviceFn.standbyModeAll({
    minutes: options.minutes,
    props: this.connectedProps
  });
};

/**
Enable or disable the charging indication for all Juggglow devices

@param {Object} options
    * {boolean} enable
@public
*/
Service.prototype.chargingIndicationAll = function(options) {
  options = options || {};

  serviceFn.chargingIndicationAll({
    enable: options.enable,
    props: this.connectedProps
  });
};

/**
Set the tx power (signal strength) of the Juggglow bluetooth module

@param {Object} options
    * {number} strength - Strength [0-14] (default: 10)
@public
*/
Service.prototype.txPowerAll = function(options) {
  options = options || {};

  serviceFn.txPowerAll({
    strength: options.strength,
    props: this.connectedProps
  });
};

/**
Change the color of all connected Juggglow devices

@param {Object} options
    * {array} color - color for top LED (RGB color array [255,0,0] for red)
    * {array} [color2] - color for bottom LED
@public
*/
Service.prototype.colorAll = function(options) {
  options = Array.isArray(options) ? { color: options} : options;
  options = options || {};

  serviceFn.colorAll({
    color: options.color,
    color2: options.color2,
    props: this.connectedProps
  });
};

/**
Fade between two colors for all connected Juggglow devices

@param {Object} options
    * {array} colorStart - start color (RGB color array [255,0,0] for red)
    * {array} colorEnd - end color
    * {number} duration - duration of fade in hsec
    * {String} mode - define fading mode (e.g. '03' for both halfs fading, cf. Juggglow API from www.juggglow.com)
*/
Service.prototype.fadeAll = function(options) {
  options = options || {};

  serviceFn.fadeAll({
    colorStart: options.colorStart,
    colorEnd: options.colorEnd,
    duration: options.duration,
    mode: options.mode,
    props: this.connectedProps
  });
};

/**
Rainbow effect for all connected Juggglow devices

@param {Object} options
    * {number} duration - duration of rainbow effect in hsec
    * {String} mode - define rainbow mode (e.g. '03' for both halfs fading, cf. Juggglow API from www.juggglow.com)
*/
Service.prototype.rainbowAll = function(options) {
  options = options || {};

  serviceFn.rainbowAll({
    duration: options.duration,
    mode: options.mode,
    props: this.connectedProps
  });
};

/**
Strobe all connected Juggglow devices

@param {Object} options
    * {number} interval - interval in ms [10-2560] (eg. 2560 for 2,56 seconds)
    * {number} dutyCycle - duty cycle of ON phase of effect [0-1] (e.g. 1 for 100% ON, 0% OFF)
    * {array} color - color for top LED (RGB color array [255,0,0] for red)
    * {array} [color2] - color for bottom LED
*/
Service.prototype.strobeAll = function(options) {
  options = options || {};

  serviceFn.strobeAll({
    interval: options.interval,
    dutyCycle: options.dutyCycle,
    color: options.color,
    color2: options.color2,
    props: this.connectedProps
  });
};

/**
Random color for all connected Juggglow devices

@param {Object} options
    * {number} interval - interval of one color in ms [100-25600] (eg. 25600 for 25,6 seconds)
    * {number} dutyCycle - duty cycle of ON phase of effect [0-1] (e.g. 1 for 100% ON, 0% OFF)
    * {String} mode - define random color mode (e.g. '03' for both halfs same color, cf. Juggglow API from www.juggglow.com)
@public
*/
Service.prototype.randomColorAll = function(options) {
  options = options || {};

  serviceFn.randomColorAll({
    interval: options.interval,
    dutyCycle: options.dutyCycle,
    mode: options.mode,
    props: this.connectedProps
  });
};

/**
Upload a sequence for all Juggglow devices

@param {Object} options
    * {number} filePath - file path to the csv file
@public
*/
Service.prototype.uploadAll = function(options) {
  options = options || {};

  serviceFn.uploadAll({
    filePath: options.filePath,
    filePaths: options.filePaths,
    props: this.connectedProps
  });
};


/**
Start a sequence for all Juggglow devices

@param {Object} options
    * {number} sequenceNo - Start sequence with this number
    * {number} delay - Delay start for number of seconds
@public
*/
Service.prototype.runSequenceAll = function(options) {
  options = options || {};

  serviceFn.runSequenceAll({
    sequenceNo: options.sequenceNo,
    delay: options.delay,
    repetitions: options.repetitions,
    props: this.connectedProps
  });
};

/**
Set a effect on event for all Juggglow devices

@param {Object} options
    * {String} event - Event (e.g. 'boot', 'powerloss', 'catch', 'throw', 'drop')
    * {String} command - Hex command to configure (eg. '34FFFFFFFFFFFF' for white colored ball; cf. Juggglow API from www.juggglow.com)
    * {boolean} permanent - Make it permanent (persist after reboot of Juggglow device)
@public
*/
Service.prototype.effectOnEventAll = function(options) {
  options = options || {};

  serviceFn.effectOnEventAll({
    event: options.event,
    command: options.command,
    permanent: options.permanent,
    props: this.connectedProps
  });
};

/**
Remove all effects on events for all Juggglow devices

@public
*/
Service.prototype.removeEffectOnEventsAll = function() {
  serviceFn.removeEffectOnEventsAll({
    props: this.connectedProps
  });
};

/**
Set a raw hex command for all Juggglow devices
The available commands are listed in the Juggglow API from www.juggglow.com

An example for a raw hex command:
'34FFFFFFFFFFFF' will set the ball color to white

@param {Object} options
    * {String} command - hex command
@public
*/
Service.prototype.rawAll = function(options) {
  options = options || {};

  serviceFn.rawAll({
    command: options.command,
    props: this.connectedProps
  });
};

module.exports = Service;