/*
 * @todo Parameter für Konstruktor nötig?
 */

function Farbknopf(obj) {
    this.obj = obj;
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