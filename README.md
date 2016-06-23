Juggglow SDK (unofficial)
=========================

This package provides a simple API to connect to [Juggglow - smart juggling balls](http://www.juggglow.com) via it's publicly available Bluetooth LE API. The project uses [Noble](https://github.com/sandeepmistry/noble) for the bluetooth communication. That means it is possible to use it with different platforms (Linux, OS X, Windows).


Intention
---------

This package is not intended to be used as a standalone software, thus does not provide a user interface. It is intended as a simple communication layer for custom Juggglow software (e.g. CLI, GUI, generate music through catches/throws, connect to third-party software via OSC, ...).


Prerequisits
------------

The bluetooth library used is [Noble](https://github.com/sandeepmistry/noble). Please refer to their platform specific prerequisits.


Install
-------

```
npm install --save juggglow-sdk
```

Usage
-----

By requiring 'juggglow-sdk' you get a Juggglow SDK service instance.

```
var jService = require('juggglow-sdk');
```

With a service you can scan and connect to juggglows. These two methods will return a promise.

```
jService.scan({ seconds: 3 }).then(function() {    // scan for 3 seconds
  return jService.connectAll();                    // connect to all found juggglows

}).then(function(props) {
  jService.colorAll({ color: [255,255,255] });     // set the color of all juggglows to white

}).catch(function(error) {
  console.log('ERROR: ' + error);
});

```

A service also provides many synchronous commands like:

* colorAll: set the color of all connected juggglows
* runSequenceAll: start a (flash-memory) sequence
* standAloneModeAll: enable/disable standalone mode
* stopModeAll: set stop mode duration
* standbyModeAll: set standby mode duration
* chargingIndicationAll: configure charging indication
* txPowerAll: set bluetooth signal strength
* effectOnEventAll: configure a effect for an event
* removeEffectOnEventsAll: remove all effect on events
* shutdownAll: shutdown all juggglows
* raw: send a raw Bluetooth LE hex string to the ball

A service provides event handlers for events (eg. catch, throw, drop, idle).

```
// on throw change color to white
jService.on('throw', function (prop) {
  prop.color([255,255,255]);
});

// on catch change color to green
jService.on('catch', function (prop) {
  prop.color([0,255,0]);
});
```

A service also provides a list of all connected props. A prop can be used to execute commands on a per ball basis.


Examples
--------

Please find some basic examples in the example folder of this project.


Documentation
-------------

As this project is quite young, we do not provide addtional documentation for now.
The source code is however well documented and consistently structured.
If questions or problems arise please use the Github issue tracker.

Status
------

This is beta quality software. We use it in production for shows.
The functionality covers most of the Juggglow Bluetooth API.
The API is considered rather final, but changes will be made if necessary.


TODOs
-----

* provide a CLI as a separate package
* upload sequences
* add basic statistics to catch events callback
* better documentation
* tests
* option to send color command without queuing them - better solution when you are using a timeline based software (like Vezer) or DMX controller for real-time color control
* Bug: Disable reconnect handler after shutdown
* Enable multiple bluetooth dongles


Disclaimer
----------

This software can be used to alter settings of your Juggglow balls. This might damage the Juggglow balls or void your warranty. The author of this software can not be held responsible for such effects.


Licence
-------

The MIT License (MIT)

Copyright (c) 2016 Manuel Mitasch

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.