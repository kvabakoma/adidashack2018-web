$(document).ready(loadDoc());

function loadDoc() {
    const socket = io('https://myteamforcebot.herokuapp.com');
        socket.on('join', (user) => {
           console.log(user);
           draw();
        });
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            document.getElementById("demo").innerHTML = this.responseText;
            console.log('ready');
        }
    };
    xhttp.open("GET", "https://myteamforcebot.herokuapp.com/", true);
    xhttp.send();
}


function draw (){
    console.log('draw');
}