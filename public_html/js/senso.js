/*
 * @todo Parameter für Konstruktor nötig?
 */

// Groß geschrieben weil es sich um eine Klasse handelt
function Farbknopf(obj, leuchtfarbe) {
    this.obj = obj;
    this.leuchtfarbe = leuchtfarbe;
}

Farbknopf.deaktiviereClick = function () {
    $('.farbknopf').unbind('mousedown');
    $('.farbknopf').unbind('mouseup');
};

Farbknopf.aktiviereClick = function () {
    $('#gelb').mousedown(function () {
        $(this).css('background-color', '#ffff00');
    });
    $('#gelb').mouseup(function () {
        $(this).css('background-color', '#cccc00');
    });
    $('#rot').mousedown(function () {
        $(this).css('background-color', '#ff3333');
    });
    $('#rot').mouseup(function () {
        $(this).css('background-color', '#cc0000');
    });
    $('#blau').mousedown(function () {
        $(this).css('background-color', '#0066ff');
    });
    $('#blau').mouseup(function () {
        $(this).css('background-color', '#0000cc');
    });
    $('#gruen').mousedown(function () {
        $(this).css('background-color', '#00ff00');
    });
    $('#gruen').mouseup(function () {
        $(this).css('background-color', '#00cc00');
    });
};

Farbknopf.prototype.leuchten = function (next) {
    var standardfarbe = this.obj.css('background-color');
    this.obj.animate({'background-color': this.leuchtfarbe}, 150);
    this.obj.animate({'background-color': this.leuchtfarbe}, 200);
    this.obj.animate({'background-color': standardfarbe}, 150);
    this.obj.animate({'background-color': standardfarbe}, 500, next);
};

// Groß weil KLasse
var Spielsequenz = function () {
    this.farben = Spielsequenz.erstelleArray64Random();
};

//Methode Sequenz erstellen
Spielsequenz.erstelleArray64Random = function () {
    var farben = [];
    var farbknoepfe = [knopfRot, knopfGelb, knopfGruen, knopfBlau];
    for (var i = 0; i < 64; i++) {
        var zahl = Math.floor(Math.random() * 4);
        farben.push(farbknoepfe[zahl]);
    }
    return farben;
};