// Variablen für die Farbknöpfe
var level = 'Spiel starten';
var knopfRot;
var knopfGelb;
var knopfGruen;
var knopfBlau;
var timer;
var sq;
var aktuellerIndex;
var highscore1 = 0;
var highscore2 = 0;
var spielername;
var db;

$(document).ready(function () {
    var request = window.indexedDB.open("SensoTestDB");
    request.onerror = function (event) {
        alert("DB nicht erreichbar");
    };
    request.onsuccess = function (event) {
        db = event.target.result;
        laden();
    };
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("highscore", {keyPath: "id"});
    };

    Farbknopf.deaktiviereClick();
    zeigeLevelAn(level);
    zeigeHighscoreNameAn();
    aktiviereStartknopf();

    // Objekte erstellen
    knopfRot = new Farbknopf($('#rot'), '#ff3333');
    knopfGelb = new Farbknopf($('#gelb'), '#ffff00');
    knopfGruen = new Farbknopf($('#gruen'), '#00ff00');
    knopfBlau = new Farbknopf($('#blau'), '#0066ff');
});


//  Zeige Level Funktion
var zeigeLevelAn = function (level) {
    $('#level').val(level);
};


//  Zeige Highscore Funktion
var zeigeHighscoreNameAn = function () {
    if (spielername === undefined) {
        $('#highscore').val('Noch kein Highscore');
    } else {
        $('#highscore').val(spielername + ' - Level: ' + highscore1 + ' - Treffer: ' + highscore2);
    }
};

//  Aktiviere Startknopf
var aktiviereStartknopf = function () {
    $('#start').css('cursor', 'pointer');
    $('#start').click(function () {
        loeseStartaus();
    });
};

// Deaktiviere Startknopf
var deaktiviereStartknopf = function () {
    $('#start').unbind('click');
    $('#start').css('cursor', 'default');
};


//  Starte Spiel
var loeseStartaus = function () {
    aktuellerIndex = 0;
    level = 1;
    sq = new Spielsequenz();
    zeigeLevelAn(level);
    Farbknopf.deaktiviereClick();
    deaktiviereStartknopf();
    spielSequenzAb(sq, 0, level);
};

var spielSequenzAb = function (sequenz, von, level) {
    if (von < level - 1) {
        sequenz.farben[von].leuchten(function () {
            spielSequenzAb(sequenz, von + 1, level);
        });
    } else {
        sequenz.farben[von].leuchten(starteSpielereingabe);
    }
};

var starteSpielereingabe = function () {
    Farbknopf.aktiviereClick();
    timer = window.setTimeout(spielEnde, 3650);
};

var spielEnde = function () {
    Farbknopf.deaktiviereClick();
    if (highscore1 < level) {
        switchAnzeigefeld();
        highscore1 = level;
        highscore2 = aktuellerIndex;
        $("#submitname").click(function () {
            spielername = $("#username").val();
            speichern();
            reset();
        });
    } else if (highscore1 === level) {
        if (highscore2 < aktuellerIndex) {
            switchAnzeigefeld();
            highscore1 = level;
            highscore2 = aktuellerIndex;
            $("#submitname").click(function () {
                spielername = $("#username").val();
                speichern();
                reset();
            });
        }
    }

};

var switchAnzeigefeld = function () {
    $('#bedienFeld').html('<div id="highscoreEingabe"><input class="unSelectable" id="level" type="text" style="color: yellow; font-size: medium" value="Neuer Highscore" readonly="" disabled="disabled"/><span>Name:</span> <input id="username" type="text" required="" value=""/><button id="submitname">Yeah!</button></div>');
};

var pruefeUserreaktion = function (farbknopf) {
    clearTimeout(timer);
    if (farbknopf.obj === sq.farben[aktuellerIndex].obj) {
        if (aktuellerIndex < level - 1) {
            aktuellerIndex++;
            starteSpielereingabe();
        } else {
            if (level === sq.farben.length) {
                alert('Yeahhh');
            } else {
                level++;
                zeigeLevelAn(level);
                aktuellerIndex = 0;
                window.setTimeout(function () {
                    spielSequenzAb(sq, 0, level);
                }, 1000);
            }
        }
    } else {
        spielEnde();
    }
};

var reset = function () {
    $('#bedienFeld').html('<div id="bedienFlaeche"><input class="unSelectable" id="level" type="text" value="1" readonly="" disabled="disabled"/><button id="start">Start</button><input class="unSelectable" id="highscore" type="text" value="" readonly="" disabled="disabled"/></div>');
    laden();
    zeigeHighscoreNameAn();
    level = '';
    zeigeLevelAn(level);
    aktiviereStartknopf();
};

var getObjectStore = function (modus) {
    // modus: "readwrite" oder "readonly"
    var transaction = db.transaction(["highscore"], modus);
    return transaction.objectStore("highscore");
};

var speichereInDB = function (highscoreObj) {
    var objStore = getObjectStore("readwrite");
    var anfrage = objStore.put(highscoreObj);
    anfrage.onsuccess = function (event) {
    };
    anfrage.onerror = function (event) {
        alert("Speichern fehlgeschlagen!");
    };
};

var speichern = function () {
    var highscoreObj = {};
    highscoreObj.id = 1;
    highscoreObj.spieler = spielername;
    highscoreObj.level = highscore1;
    highscoreObj.levelposition = highscore2;
    speichereInDB(highscoreObj);
};

var ladeAusDB = function (key) {
    var objStore = getObjectStore("readonly");
    var anfrage = objStore.get(key);
    anfrage.onsuccess = function (event) {
        var highscoreObj = this.result;
        spielername = highscoreObj.spieler;
        highscore1 = highscoreObj.level;
        highscore2 = highscoreObj.levelposition;
        zeigeHighscoreNameAn();
    };
    anfrage.onerror = function (event) {
        alert("Datensatz nicht vorhanden!");
    };
};

var laden = function () {
    ladeAusDB(1);
};

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
    $(id).animate({'background-color': standardfarbe}, 1, function () {
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

var Spielsequenz = function () {
    this.farben = Spielsequenz.erstelleArray64Random();
};

Spielsequenz.erstelleArray64Random = function () {
    var farben = [];
    var farbknoepfe = [knopfRot, knopfGelb, knopfGruen, knopfBlau];
    for (var i = 0; i < 64; i++) {
        var zahl = Math.floor(Math.random() * 4);
        farben.push(farbknoepfe[zahl]);
    }
    return farben;
};