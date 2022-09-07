var mqtt = require('mqtt');
var express = require('express');
var app = express();
var server = require('http').createServer(app); const https = require('https');
const http = require('http');
var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Unknown'; const mdnsResolver = require('mdns-resolver');

console.log("hello guys");

mdnsResolver.resolve4('192.168.0.100').then(ip => {
  console.log('connecting to '+ip);
  client = mqtt.connect('mqtt://'+ip+':9001',{clientId: serverName}); client.on('connect',function(){
    console.log('connected to MQTT Broker'); client.subscribe("edc/update/#"); client.publish("log","connect successful from nodejs server");
  });
  client.on('message', function (topic, message) { try {
    console.log('topic : '+topic); console.log('message : '+message);
    var msg = JSON.parse(message.toString()); console.log(msg);
    if (msg.type=='loc'){
      console.log('new loc : '+msg.tag+' from device id : '+msg.mac);
    };
    /***
     From now you can post your data on your server :
     const postData = querystring.stringify(msg);
     const options = {
       hostname: 'yourservername',
       port: 80,
       path: '/new-event-url',
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': Buffer.byteLength(postData) }
     };
     const req = http.request(options, (res) => { console.log(`STATUS: ${res.statusCode}`); console.log(`HEADERS: ${JSON.stringify(res.headers)}`); res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});
     req.on('error', (e) => {
console.error(`problem with request: ${e.message}`);
});
     // Write data to request body
     req.write(postData);
     req.end();
     ***/
  } catch (e) {
  } });
});
//var client = mqtt.connect('mqtt://192.168.0.102:9001',{clientId: serverName});
server.listen(port, function () {
  console.log('Server listening at port %d..', port); });
// Routing
app.use(express.static(__dirname + '/public'));