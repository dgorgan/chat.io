var socket = io.connect();

function addMessage(msg, pseudo) {
    $("#chatEntries").append('<i class="small material_icons"></i>'+'<div class="message card-panel teal lighten-2"><p>' + pseudo + ' : ' + msg + '</p></div>');
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
