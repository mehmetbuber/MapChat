
var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000, listen);



function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}     

app.get('/place', function (req, res) {
    var user_id = req.query.id;
    res.sendFile("/public/place/index.html", { root: __dirname });
});

app.use(express.static('public'));

var io = require('socket.io')(server);


io.on('connection', function (socket) {
    socket.on('chat', function (msg) {
        console.log(msg);
        io.sockets.in(id).emit('chat', msg);
    });
    var url_string = socket.request.headers.referer;
    var query = url_string.split("?")[1];
    if (query) {
        var queries = query.split("?");
        var id = "";
        for (var i = 0; i < queries.length; i++) {
            var q = queries[i].split("=")[0];
            if (q === "id")
                id = queries[i].split("=")[1];
        }
        socket.join(id);

        //Send this event to everyone in the room.
        io.sockets.in(id).emit('chat', "You are in room " + id);
    }
})