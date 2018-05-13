var config = {
    backgroundColor: "#592986",
    team1color: '#FC4329',
    team2color: '#FFDA00'
}

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        return true;
    }
    return false;
}

var isIOS = iOSversion();