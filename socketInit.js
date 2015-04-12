var socketIO = require('socket.io');
var io = socketIO();

var socketInit = function() {
  io.on('connection', function(socket) {

    console.log('a user connected');
    io.emit('chat message', 'a user connected');

    socket.on('disconnect', function() {
      console.log('a user disconnected');
      io.emit('chat message', 'a user disconnected');
    });

    socket.on('chat message', function(msg) {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

  });
  return io;
};

module.exports = socketInit;
