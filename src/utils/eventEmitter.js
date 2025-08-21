const { Emitter } = require('events');

const sharedEmitter = new Emitter();

module.exports = sharedEmitter;