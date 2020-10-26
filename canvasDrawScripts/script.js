var imageData;
var buf;
var buf8;
var data;

//Рисование линии
function drawLine(x0, y0, x1, y1, canvDraw) {
    canvDraw.beginPath();

    canvDraw.moveTo(x0, y0);
    canvDraw.lineTo(x1, y1);

    canvDraw.stroke();
    canvDraw.closePath();
}

//Рисование окружности
function drawCircul(x, y, r, canvDraw) {
    canvDraw.beginPath();

    canvDraw.arc(x, y, r, 0, Math.PI * 2, true);

    canvDraw.stroke();
    canvDraw.closePath();
}

//Попиксельная рисовка
function setPixel(field, canvDraw) {
    for (var x = 0; x < field.length; x++) {
        for (var y = 0; y < field[x].length; y++) {
            data[y * field.length + x] =
                (255 << 24) | // alpha
                (field[x][y][2] << 16) | // blue
                (field[x][y][1] << 8) | // green
                field[x][y][0]; // red
        }
    }

    imageData.data.set(buf8);
    canvDraw.putImageData(imageData, 0, 0);
}
//Инициализация попиксильной рисовки
function initPixelsDraw(canv, canvDraw) {
    imageData = canvDraw.getImageData(0, 0, canv.width, canv.height);

    buf = new ArrayBuffer(imageData.data.length);
    buf8 = new Uint8ClampedArray(buf);
    data = new Uint32Array(buf);
}
