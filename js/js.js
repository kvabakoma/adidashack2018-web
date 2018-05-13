$(document).ready(loadDoc());

function loadDoc() {
    const socket = io('https://myteamforcebot.herokuapp.com');
        socket.on('join', (user) => {
            console.log(user);
            //spawnPlayerSingle(user.team);
            switch (user.team) {
                case 'Spain':
                    UpdateBulgariaAvatar(user);
                    spawnPlayerSingle(1);
                    break;
                case 'Netherlands':
                    UpdateSpainAvatar(user);
                    spawnPlayerSingle(2);
                    break;
            }
        });

    socket.on('team-stats', (stats) => {
        updateStats(stats);
        console.log(stats);
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

function updateStats(stats) {
    $('#fans1count').text(stats.spain);
    $('#fans2count').text(stats.netherlands);
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

    setTimeout(function(){
        $('#team2cardcontainer').css('transform', 'translateX(150px)');
        $('#team2cardcontainer').css('transition', '0.3s ease-out');
        $('#titleTeam2').text('');
    }, 1500);
}

$('#endscreen').hide();

$('#startscreen').click(startGame);

