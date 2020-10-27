var neyCanv = document.getElementById("ney");
var neyDraw = neyCanv.getContext("2d");

function drawNey() {
    neyDraw.fillStyle = "rgb(0,0,0)";
    neyDraw.strokeStyle = "rgb(0,0,0)";
    neyDraw.fillRect(0, 0, neyCanv.width, neyCanv.height);

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
                    neyDraw.strokeStyle = `rgb(0,0,${color})`;
                } else {
                    var color = Math.round((255 / 3) * valW);
                    if (color > 255) {
                        color = 255;
                    }
                    neyDraw.strokeStyle = `rgb(${color},${color},0)`;
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
            neyDraw.fillStyle = "rgb(0,0,0)";
            drawCircul(
                posNey[i][j][0],
                posNey[i][j][1],
                sizeOneNey / 2,
                neyDraw
            );

            neyDraw.strokeStyle = "rgb(200,200,200)";
            drawCircul(
                posNey[i][j][0],
                posNey[i][j][1],
                sizeOneNey / 2,
                neyDraw,
                "stroke"
            );
        }
    }
}
