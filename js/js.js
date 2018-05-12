import "js/phaser";
$(document).ready(loadDoc());

function loadDoc() {
    const socket = io('https://myteamforcebot.herokuapp.com');
        socket.on('join', (user) => {
            console.log(user);
            spawnPlayerSingle(1);
            switch (user.team) {
                case 'Bulgaria':
                    UpdateBulgariaAvatar(user.avatar);
                    break;
                case 'Spain':
                    UpdateSpainAvatar();
                    break;
            }
        });
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

        }
    };
    xhttp.open("GET", "https://myteamforcebot.herokuapp.com/", true);
    xhttp.send();*/
}


function UpdateBulgariaAvatar (userAvatarUrl) {
    console.log(userAvatarUrl);
    $('#team1').css("background-image", `url(${userAvatarUrl})`);
}

function UpdateSpainAvatar () {
    $('team2').css("background-image", userAvatarUrl);
}