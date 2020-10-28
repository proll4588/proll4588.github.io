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

var type = 0;
var pastType = -1;

var func;

function formedLeranData() {
    // if (pastType == type) {
    //     return;
    // }

    net.reset();

    var inm = [];
    var outm = [];

    switch (type) {
        case 0:
            for (var x = 0; x < weight; x += 10) {
                var y =
                    x * Number(document.getElementById("parXLine").value) +
                    Number(document.getElementById("parXLine1").value);
                if (y < hight) {
                    inm.push([x / weight]);
                    outm.push([y / hight]);
                }
            }
            pastType = 0;
            break;

        case 1:
            for (var x = 0; x < weight; x += 10) {
                var y = Math.round(
                    Math.pow(x, 2) *
                        Number(document.getElementById("parX1").value) +
                        Number(document.getElementById("parX2").value) * x +
                        Number(document.getElementById("parX3").value)
                );
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
    net = new NeyroNet([1, 5, 1]);

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

    formedLeranData();

    // switch (type) {
    //     case 0:
    //         func = (x) => {
    //             return x * document.getElementById("xText").value;
    //         };
    //         break;

    //     case 1:
    //         func = (x) => {
    //             return x * document.getElementById("xText").value;
    //         };
    //         break;

    //     default:
    //         break;
    // }
}

function drawFun() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(255,0,0)";
    ctx.fillStyle = "rgb(49,49,49)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    funCords = [];

    var step = Number(document.getElementById("step").value);
    if (step <= 0) {
        step = 1;
    }
    //console.log(step);

    switch (type) {
        case 0:
            for (var x = 0; x < weight; x += step) {
                var y =
                    x * Number(document.getElementById("parXLine").value) +
                    Number(document.getElementById("parXLine1").value);
                if (y < hight) {
                    funCords.push([x, y]);
                }
            }
            break;

        case 1:
            for (var x = 0; x < weight; x += step) {
                var y = Math.round(
                    Math.pow(x, 2) *
                        Number(document.getElementById("parX1").value) +
                        Number(document.getElementById("parX2").value) * x +
                        Number(document.getElementById("parX3").value)
                );
                if (y < hight) {
                    funCords.push([x, y]);
                }
            }
            break;

        case 2:
            for (var x = 1; x < weight; x += step) {
                var y = Math.round((1 / x) * 5000);
                if (y < hight) {
                    funCords.push([x, y]);
                }
            }
            break;

        case 3:
            for (var x = 0; x < weight; x += step) {
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

    ctx.strokeStyle = "rgb(252,78,81)";
    for (var i = 0; i < funCords.length - 1; i++) {
        drawLine(
            funCords[i][0],
            funCords[i][1],
            funCords[i + 1][0],
            funCords[i + 1][1],
            ctx
        );
    }

    funCords.forEach((cord) => {
        drawRect(cord[0] - 5, cord[1] - 5, 10, 10, ctx);
    });

    drawField();
}

function drawField() {
    ctx.strokeStyle = "rgb(253,239,199)";
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
