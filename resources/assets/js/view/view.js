/**
 * Created by Aleksandr on 13.08.2016.
 */
function View() {}

View.prototype.showCount = function (count) {
    var elCount = document.getElementById("area_game__user_count--total");
    elCount.innerHTML = count;
};

View.prototype.showMsg = function (msg) {
    var elMessage = document.getElementById("area_game__user-message--msg");
    elMessage.innerHTML = msg;
};

View.prototype.showShip = function (id, color) {
    var elShip = document.getElementById(id);
    if (color == 'red') {
        elShip.setAttribute("class", "ship-red");
    }
    else if (color == 'blue') {
        elShip.setAttribute("class", "ship-blue");
    }
};

View.prototype.showAsteroid = function (id) {
    var elAsteroid = document.getElementById(id);
    elAsteroid.setAttribute("class", "asteroid");
};

View.prototype.soundShot = function() {
    var audio = document.getElementsByTagName('audio')[0];
    audio.pause();
    audio.currentTime = 0;
    audio.play();
};

module.exports = new View();


