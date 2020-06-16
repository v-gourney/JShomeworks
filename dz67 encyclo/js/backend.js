const express = require ('express');
const server = express ();
const path = require ('path');
server.use(express.static(__dirname));





server.get ('/', function (resolve) {
  resolve.sendFile (path.join(__dirname + '/index.html'));
})
server.get ('/getContentList', function (resolve) {
  resolve.json (contentList);
});

server.listen (4000, ()=> console.log ('Server has been started'));