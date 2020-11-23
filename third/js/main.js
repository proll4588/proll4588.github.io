var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");

var height = 200;
var width = 200;

var mouseX;
var mouseY;

var r = 10;

var grid = 10;

var mouseDown = false;

var net;

var iter = 0;

var toLearn = {
    input: [],
    output: [],
};

var image;

var ler = false;

function setup() {
    canvas.width = width;
    canvas.height = height;

    net = new NeyroNet([(height / grid) * (width / grid), 100, 10]);
    net.import(ww);

    console.log((height / grid) * (width / grid));

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);

    console.log(iter);
}

function draw() {
    if (mouseX <= width && mouseY <= height) {
        if (mouseDown) {
            ctx.fillStyle = "rgb(255,255,255)";
            drawCircul(mouseX, mouseY, r, ctx);
        }
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

        if (n % width == 0 && k == 0) {
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

    for (var i = 0; i < (imageData.length - 1) / grid; i++) {
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

// function mind() {
//     rePixel();

//     var inp = [];

//     for (var i = 0; i < image.length; i++) {
//         for (var j = 0; j < image[i].length; j++) {
//             inp.push(image[i][j] / 255);
//         }
//     }

//     var outp = [];

//     for (var i = 0; i < 10; i++) {
//         if (i == iter) {
//             outp[i] = 1;
//         } else {
//             outp[i] = 0;
//         }
//     }

//     toLearn.input.push(inp);
//     toLearn.output.push(outp);

//     console.log(iter);

//     ctx.fillStyle = "rgb(0,0,0)";
//     ctx.fillRect(0, 0, width, height);
// }

function lernNet() {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);
    net.learn(100, toLearn.input, toLearn.output);
    console.log("finish");
    ler = true;
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

function clearField() {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, width, height);
}

// function createFile(data, name = "net") {
//     const text = new Blob([`${data}`], { type: "text/plain" });
//     link.download = `${name}.txt`;
//     link.href = URL.createObjectURL(text);
// }

// function exportNet() {
//     var data = "";

//     // var data = "[";

//     // for (var i = 0; i < net.neyConf.length; i++) {
//     //     data += `${net.neyConf[i]}`;
//     //     if (i + 1 != net.neyConf.length) {
//     //         data += ", ";
//     //     }
//     // }

//     //data += "]\n\n[\n\t";
//     data += "net.import([\n\t";

//     for (var i = 0; i < net.w.length; i++) {
//         data += "[\n\t\t";
//         for (var j = 0; j < net.w[i].length; j++) {
//             data += "[";
//             for (var k = 0; k < net.w[i][j].length; k++) {
//                 data += `${net.w[i][j][k]}`;
//                 if (k + 1 != net.w[i][j].length) {
//                     data += ", ";
//                 }
//             }
//             data += "],\n\t";
//             if (j + 1 != net.w[i].length) {
//                 data += "\t";
//             }
//         }
//         data += "],\n";
//         if (i + 1 != net.w.length) {
//             data += "\t";
//         }
//     }

//     data += "]);";

//     createFile(data, "w");
// }

// function exportLeranData() {
//     data = "";

//     data += "toLearn.input = [\n\t";

//     for (var i = 0; i < toLearn.input.length; i++) {
//         data += "[";
//         for (var j = 0; j < toLearn.input[i].length; j++) {
//             data += `${toLearn.input[i][j]}`;
//             if (j + 1 != toLearn.input[i].length) {
//                 data += ", ";
//             }
//         }
//         data += "],\n";
//         if (i + 1 != toLearn.input.length) {
//             data += "\t";
//         }
//     }

//     data += "];\n";

//     data += "toLearn.output = [\n\t";
//     for (var i = 0; i < toLearn.output.length; i++) {
//         data += "[";
//         for (var j = 0; j < toLearn.output[i].length; j++) {
//             data += `${toLearn.output[i][j]}`;
//             if (j + 1 != toLearn.output[i].length) {
//                 data += ", ";
//             }
//         }
//         data += "],\n";
//         if (i + 1 != toLearn.output.length) {
//             data += "\t";
//         }
//     }
//     data += "];";

//     createFile(data, "learnData");
// }

// function importNet(input) {
//     let file = input.files[0];

//     let reader = new FileReader();

//     reader.readAsText(file);

//     reader.onload = () => {
//         console.log(eval(reader.result));
//     };

//     reader.onerror = () => {
//         console.log(reader.error);
//     };
// }

// function importLearn(input) {
//     let file = input.files[0];

//     let reader = new FileReader();

//     reader.readAsText(file);

//     reader.onload = () => {
//         console.log(eval(reader.result));
//     };

//     reader.onerror = () => {
//         console.log(reader.error);
//     };
// }
