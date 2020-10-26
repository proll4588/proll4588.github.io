//Данные для обучение
var inputLearn = [];
var outputLearn = [];

//Окно для рислвание
var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");

//Размеры окна
var weight = canvas.width;
var hight = canvas.height;

//Координаты мыши
var mouseX, mouseY;

var mapField = [];

var net;

var type = 0;
var pastType = -1;

function formedLeranData() {
    if (pastType == type) {
        return;
    }

    net.reset();

    var inm = [];
    var outm = [];

    switch (type) {
        case 0:
            for (var x = 0; x < weight; x += 10) {
                var y = x;
                if (y < hight) {
                    inm.push([x / weight]);
                    outm.push([y / hight]);
                }
            }
            pastType = 0;
            break;

        case 1:
            for (var x = 0; x < weight; x += 10) {
                var y = Math.round(x * x * 0.005);
                if (y < hight) {
                    inm.push([x / weight]);
                    outm.push([y / hight]);
                }
            }
            pastType = 1;
            break;

        case 2:
            for (var x = 1; x < weight; x += 10) {
                var y = Math.round((1 / x) * 5000);
                if (y < hight) {
                    inm.push([x / weight]);
                    outm.push([y / hight]);
                }
            }
            pastType = 2;
            break;

        default:
            break;
    }

    inputLearn = inm;
    outputLearn = outm;
}

function setup() {
    net = new NeyroNet([1, 5, 5, 1]);
    for (var i = 0; i < weight; i++) {
        mapField[i] = [];
        for (var j = 0; j < hight; j++) {
            mapField[i][j] = [];
        }
    }

    initPixelsDraw(canvas, ctx);

    formedLeranData();

    window.requestAnimationFrame(draw);
}

function draw() {
    net.learn(1, inputLearn, outputLearn);
    drawFun();
    drawNey();

    window.requestAnimationFrame(draw);
}

function setFun() {
    var bt = document.getElementsByName("fun");

    for (var i = 0; i < bt.length; i++) {
        if (bt[i].checked) {
            type = i;
        }
    }
}

function drawFun() {
    for (var i = 0; i < weight; i++) {
        for (var j = 0; j < hight; j++) {
            mapField[i][j] = [0, 0, 0];
        }
    }

    switch (type) {
        case 0:
            formedLeranData();
            for (var x = 0; x < weight; x++) {
                var y = x;
                if (y < hight) {
                    mapField[x][y] = [255, 0, 0];
                }
            }
            break;

        case 1:
            formedLeranData();
            for (var x = 0; x < weight; x++) {
                var y = Math.round(x * x * 0.005);
                if (y < hight) {
                    mapField[x][y] = [255, 0, 0];
                }
            }
            break;

        case 2:
            formedLeranData();
            for (var x = 1; x < weight; x++) {
                var y = Math.round((1 / x) * 5000);
                if (y < hight) {
                    mapField[x][y] = [255, 0, 0];
                }
            }
            break;

        default:
            break;
    }

    drawField();
}

function drawField() {
    for (var x = 1; x < weight; x++) {
        var c = net.count([x / weight]);
        if (c[0] * hight < hight) {
            mapField[x][Math.round(c[0] * hight)] = [0, 255, 0];
        }
    }

    //const start = new Date().getTime();

    setPixel(mapField, ctx);

    //const end = new Date().getTime();
    //console.log(`SecondWay: ${end - start}ms`);
}
