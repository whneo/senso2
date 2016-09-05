/*
 * @todo Parameter für Konstruktor nötig?
 */

// Groß geschrieben weil es sich um eine Klasse handelt
function Farbknopf(obj, leuchtfarbe) {
    this.obj = obj;
    this.leuchtfarbe = leuchtfarbe;
}

Farbknopf.deaktiviereClick = function () {
    $('.farbknopf').unbind('click');
    $('.farbknopf').css('cursor', 'default');
};

Farbknopf.aktiviereClick = function () {
    $('.farbknopf').css('cursor', 'pointer');
    $('.farbknopf').click(function () {
        Farbknopf.leuchtenOnclick(this);
    });
};

Farbknopf.leuchtenOnclick = function (obj) {
    Farbknopf.deaktiviereClick();
    var id = '#' + obj.id;
    var farbknopf = 'knopf' + id.charAt(1).toUpperCase() + id.substring(2, id.length);
    var standardfarbe = $(id).css('background-color');
    $(id).animate({'background-color': window[farbknopf].leuchtfarbe}, 100);
    $(id).animate({'background-color': window[farbknopf].leuchtfarbe}, 150);
    $(id).animate({'background-color': standardfarbe}, 100);
    $(id).animate({'background-color': standardfarbe}, 1, function (){
        pruefeUserreaktion(window[farbknopf]);
    });
};

Farbknopf.prototype.leuchten = function (next) {
    var standardfarbe = this.obj.css('background-color');
    this.obj.animate({'background-color': this.leuchtfarbe}, 100);
    this.obj.animate({'background-color': this.leuchtfarbe}, 150);
    this.obj.animate({'background-color': standardfarbe}, 100);
    this.obj.animate({'background-color': standardfarbe}, 300, next);
};

// Groß weil Klasse
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