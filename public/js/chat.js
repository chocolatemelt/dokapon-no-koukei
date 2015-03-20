var socket = io();
$(document).ready(function(){
    $('form').submit(function(){
        socket.broadcast.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
});
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});
