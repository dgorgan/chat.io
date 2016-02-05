var socket = io.connect();
var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);

ws.onmessage = function (event) {
  var li = document.createElement('li');
  li.innerHTML = JSON.parse(event.data);
  document.querySelector('#chatEntries').appendChild(li);
};

function addMessage(msg, pseudo) {
    $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sentMessage() {
    if ($('#messageInput').val() != "")
    {
        socket.emit('message', $('#messageInput').val()); //
        addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
        $('#messageInput').val('');
    }
}

function setPseudo() {
    if ($("#pseudoInput").val() != "")
    {
        socket.emit('setPseudo', $("#pseudoInput").val());
        $('#chatControls').show();
        $('#pseudoInput').hide();
        $('#pseudoSet').hide();
    }
}

socket.on('message', function(data) {
    addMessage(data['message'], data['pseudo']);
});

$(function() {

    $("#chatControls").hide();
    $("#pseudoSet").click(function() {
      setPseudo()
    });
    $("#submit").click(function() {
      sentMessage();
    });
});
