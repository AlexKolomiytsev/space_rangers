/**
 * Created by Aleksandr on 13.08.2016.
 */
var self;
function Controller(view, model) {
    this.view = view;
    this.model = model;

    this.numShots = 0;
    self = this;

}
Controller.prototype.createShips = function () {
    this.model.createSpaceships();
};

Controller.prototype.shotShip = function (c) {
    var id = this.convertToID(c);

    if (id) {
        var loss = this.model.shot(id);

        if (loss === true) {
            this.view.showMsg("This ship is already knocked out");
        }
        else if (loss.status === 3) {
            this.view.showShip(loss.id, loss.color);
            this.view.showMsg("Flotilla of 3 ships is destroyed");
        }
        else if (loss.status === 1) {
            this.view.showShip(loss.id, loss.color);
            this.view.showMsg("knockout");
        }
        else if (typeof(loss) == 'string') {
            this.view.showAsteroid(loss);
            this.view.showMsg("miss");
        }

        this.numShots++;

        if (loss && (this.model.destroyShips === this.model.numShips)) {
            this.view.showMsg("You already destroy all ships");
            this.view.showCount(count)
        }

        this.view.soundShot();
    }
};

Controller.prototype.convertToID = function (c) {
    var symbol = ["A", "B", "C", "D", "E", "F", "G"];

    if (c !== null && c.length === 2) {
        var firstChar = c.charAt(0);
        var row = symbol.indexOf(firstChar);
        var col = c.charAt(1);

        if (!this.isNumeric(row) || !this.isNumeric(col)) {
            alert("Value should be an numeric");
        }
        else if (row < 0 || row >= this.model.sizeSpace || col < 0 || col >= this.model.sizeSpace) {
            alert("Aim is situated outside of map");
        }
        else {
            return row + col;
        }
    }
    else {
        alert("Please enter symbol form range A - G");
    }
    return null;
};
Controller.prototype.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

Controller.prototype.hoverClick = function (id) {
    var self = this;
    var el = document.getElementById(id);
    el.onmouseover = function (e) {
        e = e || window.event;
        
        if (e.target.id !== "") {
            e.target.style.transition = "0.5s";
            e.target.style.backgroundColor = "rgba(104, 142, 218, 0.33)";
            
            e.target.onclick = function () {
                var c = this.getAttribute("data-title");
                self.shotShip(c);
            }
        }
    };

    el.onmouseout = function (e) {
        e = e || window.event;

        if (e.target.id !== "") {
            e.target.style.backgroundColor = "inherit";
        }
    }
};

Controller.prototype.createDataTitle = function () {
    var elCell = document.getElementsByTagName("td");

    for (var i = 0; i < elCell.length; i++) {
        if (elCell[i].id !== "") {
            var value = elCell[i].getAttribute("id");
            var element = elCell[i];
            var letter = element.parentNode.firstElementChild.firstElementChild.innerHTML;

            elCell[i].setAttribute("data-title", letter + value.charAt(1));

        }
    }
};

Controller.prototype.hBtnClick = function () {

    var el = document.getElementById("crdInput");
    var elValueUp = el.value.toUpperCase();

    self.shotShip(elValueUp);

};

Controller.prototype.hKeyPress = function (e) {
    e = e || window.event;

    var el = document.getElementById("btnShot");

    if (e.keyCode === 13) {
        el.click();
        return false;
    }
};


module.exports = Controller;