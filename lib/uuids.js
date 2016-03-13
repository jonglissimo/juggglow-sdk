var services = {
  'juggglow': '624e957fcb424cd6bacc84aeb898f69b'
};

var characteristics = {
  'ballControl':             'c75076c0abbf11e480530002a5d5c51b',
  'ballControlNotification': 'f91360343b3642868340570ecd514d35',
  'ballEventNotification':   'd6d4ef6d1cef4aa29657e373d6f697fb'
};

var ballControl = {
  // general
  'shutdown': '01',
  'standAloneMode': '02',
  'stopMode': '05',
  'standbyMode': '06',
  'txPower': '10',

  // light effects
  'off': '30',
  'brightness': '32',
  'runSequence': '33',
  'color': '34',
  'rainbow': '35',
  'randomColor': '36',
  'fade': '37',
  'strobe': '38',
  'effectOnEvent': '3E',
  'removeEffectOnEvents': '40'
};

var ballEvents = {
  'boot': '01',
  'powerloss': '02',
  'catch': '03',
  'throw': '04',
  'drop': '05',
  'boot-permanent': '81',
  'powerloss-permanent': '82',
  'catch-permanent': '83',
  'throw-permanent': '84',
  'drop-permanent': '85',
};

var ballEventNotification = {
  'idle': '00',
  'catch': '01',
  'throw': '02',
  'drop': '03',
};

var uuids = {
  services: services,
  characteristics: characteristics,
  ballControl: ballControl,
  ballEvents: ballEvents,
  ballEventNotification: ballEventNotification
};

module.exports = uuids;
