//window.$ = require('jquery');
//window.jQuery = $;

var view = require('./view/view');
var model = require('./model/model');
var controller = new (require('./controller/controller'))(view, model);


(function () {
    var start = {
        init: function () {
            this.main();
            this.control();
            this.event();
        },
        main: function () {
            
        },
        control: function () {
            controller.createShips();
            controller.createDataTitle();

        },
        event: function () {
            var btnShot = document.getElementById("btnShot");

            btnShot.onclick = controller.hBtnClick;

            var elCrdInput = document.getElementById("crdInput");
            elCrdInput.onkeypress = controller.hKeyPress;

            controller.hoverClick("area_game__table");
        }
    };

    start.init();
})();

