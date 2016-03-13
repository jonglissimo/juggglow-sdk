module.exports = {
  connect: require('./connect'),
  shutdown: require('./shutdown'),
  standAloneMode: require('./stand-alone-mode'),
  stopMode: require('./stop-mode'),
  standbyMode: require('./standby-mode'),
  txPower: require('./tx-power'),
  color: require('./color'),
  fade: require('./fade'),
  rainbow: require('./rainbow'),
  strobe: require('./strobe'),
  randomColor: require('./random-color'),
  runSequence: require('./run-sequence'),
  effectOnEvent: require('./effect-on-event'),
  removeEffectOnEvents: require('./remove-effect-on-events'),
  activateEventNotifications: require('./activate-event-notifications')
};