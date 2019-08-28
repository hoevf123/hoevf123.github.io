var WebSocketServer = require("ws").Server;
var http = require("http");
var wss = new WebSocketServer({port: 12801});

var current_port = 12802;

console.log("Server Loading");

var server =http.createServer(function(request, response){
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(current_port, function(){
    console.log((new Date()) + ' Server is listening on port '+ String(current_port));
})

var wsServer= new WebSocketServer({
    httpServer: server,
    autoAcceptConnections:false
})

function originIsAllowed(origin){return true;}

wsServer.on('request', function(request){
    if(!originIsAllowed(request.origin)){
        //Make Sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept(null, request.origin);
    console.log((new Date()) + 'Connecteion accepted.');
}
);

wss.on("Connection", function(ws){
    ws.send("Hello! I am a server.");
    ws.on("message", function(message){
        console.log("Received: %s", message);
    });
});

console.log("Server Loaded");