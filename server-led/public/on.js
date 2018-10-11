const Gpio = require('onoff').Gpio;
const led = new Gpio(4, 'out');
console.log('Led On');
