const express = require('express')
const app = express()
const port = 3000
const os = require("os");
const mustacheExpress = require('mustache-express');
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
const led = new Gpio(4, 'out');
const ledA = new Gpio(14, 'out');
const Buzz = new Gpio(21,'out');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.get('/', (request, response) => {
 response.render('index');
})
app.get('/hello/:name', (request, response) => {
 response.render('Hello',{name: request.params.name});
})

app.get('/pooc', (request, response) =>{
response.render('endpoint');
})

app.get('/on', (request, response) => {
 led.writeSync(1);
ledA.writeSync(1);
  response.render('on');
})

app.get('/off', (request, response) => {
led.writeSync(0);
ledA.writeSync(0);;
response.render('off');
})

app.get('/buzzon', (request, response) =>{
Buzz.writeSync(1);
sleep.sleep(1);
response.render('buzzon');
})

app.listen(port, (err) => {
 if (err) {
 return console.log('Erreur du serveur : ', err)
 }
 console.log('Le serveur écoute sur le port'+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);
;})

process.on('SIGINT', () => {
  led.unexport();
});
process.on('SIGINT', () => {
  Buzz.unexport();
});
process.on('SIGINT', () => {
  ledA.unexport();
});
