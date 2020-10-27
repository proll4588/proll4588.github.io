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

var funCords = [];
var netCords = [];

var net;

var type = 3;
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

        case 3:
            for (var x = 0; x < weight; x += 5) {
                var y =
                    Math.round(Math.sin(x * 0.01) * 100) + canvas.height / 2;
                if (y < hight) {
                    inm.push([x / weight]);
                    outm.push([y / hight]);
                }
            }
            pastType = 3;
            break;

        default:
            break;
    }

    inputLearn = inm;
    outputLearn = outm;
}

function setup() {
    net = new NeyroNet([1, 3, 1]);

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
    ctx.strokeStyle = "rgb(255,0,0)";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    funCords = [];

    switch (type) {
        case 0:
            formedLeranData();
            for (var x = 0; x < weight; x += 30) {
                var y = x;
                if (y < hight) {
                    funCords.push([x, y]);
                }
            }
            break;

        case 1:
            formedLeranData();
            for (var x = 0; x < weight; x += 30) {
                var y = Math.round(x * x * 0.005);
                if (y < hight) {
                    funCords.push([x, y]);
                }
            }
            break;

        case 2:
            formedLeranData();
            for (var x = 1; x < weight; x += 30) {
                var y = Math.round((1 / x) * 5000);
                if (y < hight) {
                    funCords.push([x, y]);
                }
            }
            break;

        case 3:
            formedLeranData();
            for (var x = 0; x < weight; x += 10) {
                var y =
                    Math.round(Math.sin(x * 0.01) * 100) + canvas.height / 2;
                if (y < hight) {
                    funCords.push([x, y]);
                }
            }
            break;

        default:
            break;
    }

    for (var i = 0; i < funCords.length - 1; i++) {
        drawLine(
            funCords[i][0],
            funCords[i][1],
            funCords[i + 1][0],
            funCords[i + 1][1],
            ctx
        );
    }

    ctx.strokeStyle = "rgb(255,0,0)";
    funCords.forEach((cord) => {
        drawRect(cord[0] - 5, cord[1] - 5, 10, 10, ctx);
    });

    drawField();
}

function drawField() {
    ctx.strokeStyle = "rgb(0,255,0)";
    netCords = [];
    funCords.forEach((cord) => {
        var c = net.count([cord[0] / weight]);
        netCords.push([cord[0], Math.round(c[0] * hight)]);
    });

    for (var i = 0; i < netCords.length - 1; i++) {
        drawLine(
            netCords[i][0],
            netCords[i][1],
            netCords[i + 1][0],
            netCords[i + 1][1],
            ctx
        );
    }

    netCords.forEach((cord) => {
        drawRect(cord[0] - 5, cord[1] - 5, 10, 10, ctx);
    });
}
