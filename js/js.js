$(document).ready(loadDoc());

function loadDoc() {
    const socket = io('https://myteamforcebot.herokuapp.com');
        socket.on('join', (user) => {
            console.log(user);
            //spawnPlayerSingle(user.team);
            switch (user.team) {
                case 'Bulgaria':
                    UpdateBulgariaAvatar(user);
                    spawnPlayerSingle(1);
                    break;
                case 'Spain':
                    UpdateSpainAvatar(user);
                    spawnPlayerSingle(2);
                    break;
            }
        });
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

        }
    };
    xhttp.open("GET", "https://myteamforcebot.herokuapp.com/", true);
<<<<<<< HEAD
    xhttp.send();*/
}


function UpdateBulgariaAvatar (user) {
    $('#team1').attr("src", user.avatar);
    $('#titleTeam1').text(user.name);
    $('#team1CardBody').show();
    $('#team1cardcontainer').css('transform', 'translateX(0px)');
    $('#team1cardcontainer').css('transition', '0.3s ease all');

    setTimeout(function(){
        $('#team1cardcontainer').css('transform', 'translateX(-150px)');
        $('#team1cardcontainer').css('transition', '0.3s ease-out');
        $('#titleTeam1').text('');
    }, 1500);

}

function UpdateSpainAvatar (user) {
    $('#team2').attr("src", user.avatar);
    $('#titleTeam2').text(user.name);
    $('#team2CardBody').show();
    $('#team2cardcontainer').css('transform', 'translateX(-150px)');
    $('#team2cardcontainer').css('transition', '0.3s ease all');
<<<<<<< HEAD

    setTimeout(function(){
        $('#team2cardcontainer').css('transform', 'translateX(150px)');
        $('#team2cardcontainer').css('transition', '0.3s ease-out');
        $('#titleTeam2').text('');
    }, 1500);
}
=======
}

$('#endscreen').hide();
setTimeout(function() {
    $('#endscreen').show();
}, 5000)
// function ShowEndScreen() {
//     $('#endscreen').show();
// }
>>>>>>> a1afada562402a32c54e6b9f37a44c7920d64965
