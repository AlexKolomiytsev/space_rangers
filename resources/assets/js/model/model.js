/**
 * Created by Aleksandr on 13.08.2016.
 */
function Model() {
    this.sizeSpace = 7; //size of map
    this.numShips = 6; //number of ships
    this.lengthShips = 3; //length of ships
    this.destroyShips = 0; //destroyed ships

    this.spaceships = [
        {position: ["0", "0", "0"], damage: ["", "", ""], color: "red"},
        {position: ["0", "0", "0"], damage: ["", "", ""], color: "blue"},
        {position: ["0", "0", "0"], damage: ["", "", ""], color: "red"},
        {position: ["0", "0", "0"], damage: ["", "", ""], color: "blue"},
        {position: ["0", "0", "0"], damage: ["", "", ""], color: "red"},
        {position: ["0", "0", "0"], damage: ["", "", ""], color: "blue"}
    ];
}

Model.prototype.shot = function (id) {
    for (var i = 0; i < this.numShips; i++) {
        var spaceship = this.spaceships[i];
        var posDamage = spaceship.position.indexOf(id);

        if (posDamage >= 0) {

            if (spaceship.damage[posDamage] === 'loss') {
                //view.showMsg("This ship is already knocked out");
                return true;
            }

            spaceship.damage[posDamage] = "loss";
            var color = spaceship.color;

            //view.showShip(id, color);
            //view.showMsg("knockout");

            if (this.checkDestroyedShip(spaceship)) {
                //view.showMsg("Flotilla of 3 ships is destroyed");
                this.destroyShips++;
                return {
                    id: id,
                    color: color,
                    status: 3
                }
            }

            return {
                id: id,
                color: color,
                status: 1
            }
        }
    }

    //view.soundShot();
    //view.showAsteroid(id);
    //view.showMsg("miss");
    return id
};

Model.prototype.checkDestroyedShip = function (ship) {
    for (var i = 0; i < this.lengthShips; i++) {
        if (ship.damage[i] === "") {
            return false;
        }
    }
    return true;
};

Model.prototype.createShipPos = function () {
    var col = 0;
    var row = 0;
    var location = Math.floor(Math.random() * 2);
    var shipPosition = [];

    if (location === 1) { //horizontal
        row = Math.floor(Math.random() * this.sizeSpace);
        col = Math.floor(Math.random() * (this.sizeSpace - this.lengthShips));
    }
    else { //vertical
        row = Math.floor(Math.random() * (this.sizeSpace - this.lengthShips));
        col = Math.floor(Math.random() * this.sizeSpace);
    }

    for (var i = 0; i < this.lengthShips; i++) {
        if (location === 1) {
            shipPosition.push(row + "" + (col + i));
        }
        else {
            shipPosition.push((row + i) + "" + col);
        }
    }

    return shipPosition;
};

Model.prototype.checkRepeatPos = function (position) {
    for (var i = 0; i < this.numShips; i++) {
        var spaceship = this.spaceships[i];
        for (var j = 0; j < position.length; j++) {
            if (spaceship.position.indexOf(position[j]) >= 0) {
                return true;
            }
        }
    }
    return false;
};

Model.prototype.createSpaceships = function () {
    var position;

    for (var i = 0; i < this.numShips; i++) {
        do {
            position = this.createShipPos();
        }
        while (this.checkRepeatPos(position));
        this.spaceships[i].position = position;
    }
};



module.exports = new Model();