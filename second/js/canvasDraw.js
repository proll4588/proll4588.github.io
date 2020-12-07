//Данные для обучение
var inputLearn = [];
var outputLearn = [];

var pointsOnMap = [];

//Окно для рислвание
var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

//Размеры окна
var width = canvas.width;
var height = canvas.height;

var halfWidth = Math.round(width / 2);
var halfHeight = Math.round(height / 2);

//Координаты мыши
var mouseX, mouseY;

var funCords = [];
var netCords = [];

var net;

var startConf = [1, 3, 1];

var fun = "x";

function setup() {
    net = new NeyroNet(startConf);

    initPixelsDraw(canvas, ctx);

    formedLeranData();

    window.requestAnimationFrame(draw);
}

function resetNey() {
    var conf = eval(document.getElementById("config").value);
    var newConf = [startConf[0]];

    conf.forEach((el) => {
        newConf.push(el);
    });
    newConf.push(startConf[startConf.length - 1]);

    net.neyConf = newConf;
    net.fullReset();
}

function formedLeranData() {
    var inm = [];
    var outm = [];

    for (var x = -halfWidth; x < halfWidth; x += 10) {
        var y = eval(fun);
        if (!isFinite(y)) {
            continue;
        }

        if (y + halfHeight < height && y + halfHeight >= 0) {
            inm.push([(x + halfWidth) / width]);
            outm.push([(y + halfHeight) / height]);
        }
    }

    inputLearn = inm;
    outputLearn = outm;
}

function draw() {
    net.learn(1, inputLearn, outputLearn);
    ctx.clearRect(0, 0, width, height);

    drawCords();
    drawFun();
    drawNey();

    window.requestAnimationFrame(draw);
}

function setFun(val = "x") {
    fun = val;

    net.reset();
}

function drawFun() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(255,0,0)";
    ctx.fillStyle = "rgb(49,49,49)";

    funCords = [];

    var step = Number(document.getElementById("step").value);
    if (step <= 0) {
        step = 1;
    }

    formedLeranData();

    for (var x = -halfWidth; x < halfWidth; x += step) {
        var y = eval(fun);
        if (!isFinite(y)) {
            continue;
        }

        if (y + halfHeight < height && y + halfHeight >= 0) {
            funCords.push([x + halfWidth, y + halfHeight]);
        }
    }

    ctx.strokeStyle = "rgb(252,78,81)";
    for (var i = 0; i < funCords.length - 1; i++) {
        drawLine(funCords[i][0], funCords[i][1], funCords[i + 1][0], funCords[i + 1][1], ctx);
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
        var c = net.count([cord[0] / width]);
        netCords.push([cord[0], Math.round(c[0] * height)]);
    });

    for (var i = 0; i < netCords.length - 1; i++) {
        drawLine(netCords[i][0], netCords[i][1], netCords[i + 1][0], netCords[i + 1][1], ctx);
    }

    netCords.forEach((cord) => {
        drawRect(cord[0] - 5, cord[1] - 5, 10, 10, ctx);
    });
}

function drawCords() {
    ctx.strokeStyle = "rgb(100,49,49)";
    ctx.fillStyle = "rgb(200,49,49)";
    drawLine(halfWidth, 0, halfWidth, height, ctx);
    drawLine(0, halfHeight, width, halfHeight, ctx);

    ctx.font = "30px Times New Roman";
    ctx.fillText("y", halfWidth + 5, height - 10);
    ctx.fillText("x", width - 20, halfHeight + 25);
}

function setPoint() {
    if (mouseX <= width && mouseY <= height) {
        pointsOnMap.push([mouseX, mouseY]);
    }
}

function resetPoints() {
    pointsOnMap = [];
}
