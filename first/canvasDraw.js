//Данные для обучение
var points = [];
var typePoints = [];

//Размеры окна
var weight = 200;
var hight = 200;

//Координаты мыши
var mouseX, mouseY;

//Окно для рислвание
var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");

var imageData = ctx.getImageData(0, 0, weight, hight);

var buf = new ArrayBuffer(imageData.data.length);
var buf8 = new Uint8ClampedArray(buf);
var data = new Uint32Array(buf);

var mapField = [];

var net;

function setup() {
    net = new NeyroNet([2, 10, 5, 3]);
    for (var i = 0; i < weight; i++) {
        mapField[i] = [];
        for (var j = 0; j < hight; j++) {
            mapField[i][j] = [];
        }
    }

    window.requestAnimationFrame(draw);
}

function draw() {
    net.learn(1, points, typePoints);
    drawField();

    window.requestAnimationFrame(draw);
}

function setPoint() {
    var bt = document.getElementsByName("color");
    var color;

    for (var i = 0; i < bt.length; i++) {
        if (bt[i].checked) {
            color = i;
        }
    }

    if (mouseX <= weight && mouseY <= hight) {
        switch (color) {
            case 0:
                points.push([mouseX / weight, mouseY / hight]);
                typePoints.push([1, 0, 0]);
                //console.log("red " + mouseX + " " + mouseY);
                break;

            case 1:
                points.push([mouseX / weight, mouseY / hight]);
                typePoints.push([0, 1, 0]);
                //console.log("green " + mouseX + " " + mouseY);
                break;

            case 2:
                points.push([mouseX / weight, mouseY / hight]);
                typePoints.push([0, 0, 1]);
                break;

            default:
                console.log("no color " + mouseX + " " + mouseY);
                break;
        }

        drawPoitns();
    }
}

function drawPoitns() {
    for (var i = 0; i < points.length; i++) {
        ctx.fillStyle = `rgb(${typePoints[i][0] * 111}, ${
            typePoints[i][1] * 111
        }, ${typePoints[i][2] * 111})`;

        ctx.fillRect(points[i][0] * weight, points[i][1] * hight, 5, 5);
    }
}

function drawField() {
    // const start = new Date().getTime();

    for (var x = 0; x < weight; x++) {
        for (var y = 0; y < hight; y++) {
            var c = net.count([x / weight, y / hight]);
            mapField[x][y] = [c[0] * 255, c[1] * 255, c[2] * 255];
        }
    }

    setPixel(mapField);
    drawPoitns();

    // const end = new Date().getTime();
    // console.log(`SecondWay: ${end - start}ms`);
}

function setPixel(field) {
    for (var x = 0; x < weight; x++) {
        for (var y = 0; y < hight; y++) {
            data[y * weight + x] =
                (255 << 24) | // alpha
                (field[x][y][2] << 16) | // blue
                (field[x][y][1] << 8) | // green
                field[x][y][0]; // red
        }
    }

    imageData.data.set(buf8);
    ctx.putImageData(imageData, 0, 0);
}
