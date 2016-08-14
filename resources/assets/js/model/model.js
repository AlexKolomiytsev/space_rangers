/**
 * Created by Aleksandr on 13.08.2016.
 */
function Model() {
    this.sizeSpace = 7; //size of map
    this.numShips = 6; //number of ships
    this.lengthShips = 3; //length of ships
    this.destroyShips = 0; //destroyed ships

    this.spaceships = [
        {position: ["03", "04", "05"], damage: ["", "", ""], color: "red"},
        {position: ["11", "21", "31"], damage: ["", "", ""], color: "blue"},
        {position: ["15", "25", "35"], damage: ["", "", ""], color: "red"},
        {position: ["26", "36", "46"], damage: ["", "", ""], color: "blue"},
        {position: ["41", "42", "43"], damage: ["", "", ""], color: "red"},
        {position: ["52", "53", "54"], damage: ["", "", ""], color: "blue"}
    ];
}

Model.prototype.shot = function (id) {
    for (var i = 0; i < this.numShips; i++) {
        var spaceship = this.spaceships[i];
        var posDamage = spaceship.position.indexOf(id);

        if (posDamage >= 0) {

            if (spaceship.damage[posDamage] === 'loss') {
                view.showMsg("This ship is already knocked out");
                return true;
            }

            spaceship.damage[posDamage] = "loss";
            var color = spaceship.color;

            view.showShip(id, color);
            view.showMsg("knockout");

            if (this.checkDestroyedShip(spaceship)) {
                view.showMsg("Flotilla of 3 ships is destroyed");
                this.destroyShips++;
                return true;
            }

            return true;
        }
    }

    view.showAsteroid(id);
    view.showMsg("miss");
    return false;
};

Model.prototype.checkDestroyedShip = function (ship) {
    for (var i = 0; i < this.lengthShips; i++) {
        if (ship.damage[i] === "") {
            return false;
        }
    }
    return true;
};



module.exports = new Model();