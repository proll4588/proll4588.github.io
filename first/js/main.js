//Данные для обучение
var inputLearn = [];
var outputLearn = [];

//Координаты точек
var pointsOnMap = [];

//Окно для рислвание
var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");

//Задание размеров окна
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

//Размеры окна
var width = canvas.width;
var height = canvas.height;

//Координаты мыши
var mouseX, mouseY;

//Сеть
var net;

//Тип точки
var type = 0;

//Начальная конфигурация сети
var startConf = [2, 7, 5, 3];

//Размер пиксеря
var step = 10;

//Инициализция
function setup() {
    ctx.lineWidth = 4;

    net = new NeyroNet(startConf);

    window.requestAnimationFrame(draw);
}

//Создание точки
function setPoint() {
    if (
        mouseX < document.getElementById("settings").offsetWidth &&
        mouseY < document.getElementById("settings").offsetHeight
    ) {
        return;
    }

    pointsOnMap.push([mouseX, mouseY, type]);

    inputLearn.push([mouseX / width, mouseY / height]);
    switch (type) {
        case 0:
            outputLearn.push([1, 0, 0]);
            break;

        case 1:
            outputLearn.push([0, 1, 0]);
            break;

        case 2:
            outputLearn.push([0, 0, 1]);
            break;

        default:
            break;
    }
}

//Главная функция
function draw() {
    net.learn(1, inputLearn, outputLearn);

    chek();

    ctx.clearRect(0, 0, width, height);

    drawField();

    window.requestAnimationFrame(draw);
}

//Отрисовка поля
function drawField() {
    drawNetField();
    pointsOnMap.forEach((point) => {
        switch (point[2]) {
            case 0:
                ctx.strokeStyle = "rgb(255,95,95)";
                break;
            case 1:
                ctx.strokeStyle = "rgb(255,255,219)";
                break;
            case 2:
                ctx.strokeStyle = "rgb(69,193,194)";
                break;
        }
        drawRect(point[0] - 5, point[1] - 10, 10, 10, ctx);
    });
}

//Отрисовка разделяющих линий
function drawNetField() {
    var par = 0.85;
    for (var i = 0; i < width; i += step) {
        for (var j = 0; j < height; j += step) {
            var ans = net.count([i / width, j / height]);

            if (!(ans[0] > par || ans[1] > par || ans[2] > par)) {
                if (ans[0] > ans[1] && ans[0] > ans[2]) {
                    ctx.fillStyle = "rgb(255,75,75)";
                } else if (ans[1] > ans[0] && ans[1] > ans[2]) {
                    ctx.fillStyle = "rgb(253,239,199)";
                } else if (ans[2] > ans[0] && ans[2] > ans[1]) {
                    ctx.fillStyle = "rgb(49,173,174)";
                }
                ctx.fillRect(i, j, step, step);
            } else {
                ctx.clearRect(i, j, step, step);
            }
        }
    }
}

//Задание типа точки
function chek() {
    var bt = document.getElementsByName("color");

    for (var i = 0; i < bt.length; i++) {
        if (bt[i].checked) {
            type = i;
        }
    }
}
