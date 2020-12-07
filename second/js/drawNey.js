var neyCanv = document.getElementById("ney");
var neyDraw = neyCanv.getContext("2d");

neyCanv.width = document.documentElement.clientWidth - 25;
neyCanv.height = document.documentElement.clientHeight / 2.5;

function drawNey() {
    neyDraw.lineWidth = 2;
    neyDraw.fillStyle = "rgba(49,49,49)";
    neyDraw.strokeStyle = "rgb(0,0,0)";
    neyDraw.clearRect(0, 0, neyCanv.width, neyCanv.height);

    var posNey = [];

    //Вычисление наибольшего количества нейронов в слоях
    var maxNeysInLayers = 0;
    for (var i = 0; i < net.ney.length; i++) {
        if (maxNeysInLayers < net.ney[i].length) {
            maxNeysInLayers = net.ney[i].length;
        }
    }

    var sizeOneNey = neyCanv.height / (maxNeysInLayers + 4); //Радиус одного нейрона
    var padx = neyCanv.width / net.ney.length; //Отступы по оси х

    //Вычисление координат нейронов
    for (var i = 0; i < net.ney.length; i++) {
        var pady = neyCanv.height / (net.ney[i].length + 1); //Отступы по оси у
        posNey[i] = [];
        for (var j = 0; j < net.ney[i].length; j++) {
            posNey[i][j] = [sizeOneNey + padx * i, pady * (j + 1)];
        }
    }

    //Прорисовка связей нейронов
    for (var i = 0; i < net.w.length; i++) {
        for (var j = 0; j < net.w[i].length; j++) {
            for (var k = 0; k < net.w[i][j].length; k++) {
                var valW = net.w[i][j][k];
                if (valW < 0) {
                    valW = Math.abs(valW);
                    var color = Math.round((255 / 3) * valW);
                    if (color > 255) {
                        color = 255;
                    }
                    neyDraw.strokeStyle = `rgb(${color / 255 + 49},${(color / 255) * 124 + 49},${
                        (color / 255) * 125 + 49
                    })`;
                } else {
                    var color = Math.round((255 / 3) * valW);
                    if (color > 255) {
                        color = 255;
                    }
                    neyDraw.strokeStyle = `rgb(${(color / 255) * 191 + 49},${
                        (color / 255) * 63 + 49
                    },${color / 255 + 49})`;
                }

                drawLine(
                    posNey[i][j][0],
                    posNey[i][j][1],
                    posNey[i + 1][k][0],
                    posNey[i + 1][k][1],
                    neyDraw
                );
            }
        }
    }

    //Прорисовка нейронов
    for (var i = 0; i < posNey.length; i++) {
        for (var j = 0; j < posNey[i].length; j++) {
            neyDraw.fillStyle = "rgb(255,75,75)";
            drawCircul(posNey[i][j][0], posNey[i][j][1], sizeOneNey / 2, neyDraw);

            neyDraw.strokeStyle = "rgb(49,49,49)";
            drawCircul(posNey[i][j][0], posNey[i][j][1], sizeOneNey / 2, neyDraw, "stroke");
        }
    }
}
