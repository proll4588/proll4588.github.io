var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");

var height = 100;
var width = 100;

var mouseX;
var mouseY;

var r = 5;

var grid = 5;

var mouseDown = false;

var net;

var iter = 0;

var toLearn = {
    input: [],
    output: [],
};

var image;

function setup() {
    canvas.width = width;
    canvas.height = height;

    net = new NeyroNet([(height / grid) * (width / grid), 100, 10]);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);

    console.log(iter);
}

function draw() {
    if (mouseDown) {
        ctx.fillStyle = "rgb(255,255,255)";
        drawCircul(mouseX, mouseY, r, ctx);
    }
}

function rePixel() {
    var data = ctx.getImageData(0, 0, width, height).data;
    var imageData = [[]];

    var k = 0;

    var layer = 0;
    var n = 0;

    for (var i = 0; i < data.length; i++) {
        if (k == 0) {
            imageData[layer].push(data[i]);
            n++;
        }

        if (n % 100 == 0 && k == 0) {
            layer++;
            imageData[layer] = [];
        }

        k++;

        if (k == 4) {
            k = 0;
        }
    }

    //console.log(imageData);

    var newImageData = [];

    for (var i = 0; i < imageData.length / grid; i++) {
        newImageData[i] = [];
        for (var j = 0; j < imageData[i * grid].length / grid; j++) {
            var col = 0;
            for (var x = 0; x < grid; x++) {
                for (var y = 0; y < grid; y++) {
                    col += imageData[grid * i + x][grid * j + y];
                }
            }
            newImageData[i][j] = col / (grid * grid);
        }
    }

    //console.log(newImageData);

    // for (var x = 0; x < newImageData.length - 1; x++) {
    //     for (var y = 0; y < newImageData[x].length; y++) {
    //         ctx.fillStyle = `rgb(${newImageData[x][y]},${newImageData[x][y]},${newImageData[x][y]})`;
    //         ctx.fillRect(y * grid, x * grid, y * grid + grid, x * grid + grid);
    //     }
    // }

    image = newImageData;
}

function mind() {
    rePixel();

    var inp = [];

    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            inp.push(image[i][j] / 255);
        }
    }

    var outp = [];

    for (var i = 0; i < 10; i++) {
        if (i == iter) {
            outp[i] = 1;
        } else {
            outp[i] = 0;
        }
    }

    toLearn.input.push(inp);
    toLearn.output.push(outp);

    iter++;
    console.log(iter);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);
}

function lernNet() {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);
    net.learn(3000, toLearn.input, toLearn.output);
    console.log("finish");
}

function getAns() {
    rePixel();
    var inp = [];

    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            inp.push(image[i][j] / 255);
        }
    }

    var c = net.count(inp);

    var max = 0;
    var maxIndex = 0;
    for (var i = 0; i < c.length; i++) {
        if (c[i] > max) {
            max = c[i];
            maxIndex = i;
        }
    }

    console.log(c);
    console.log(maxIndex);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);
}
