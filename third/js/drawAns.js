var neyCanv = document.getElementById("ans");
var neyDraw = neyCanv.getContext("2d");

neyCanv.width = 200;
neyCanv.height = 200;

var ansWidth = neyCanv.width;
var ansHeight = neyCanv.height;

var halfAnsWidth = ansWidth / 2;
var halfAnsHeight = ansHeight / 2;

function drawAns() {
    neyDraw.clearRect(0, 0, ansWidth, ansHeight);

    neyDraw.font = `${ansHeight / 10}px Times New Roman`;
    neyDraw.strokeStyle = "rgb(49,173,174)";
    neyDraw.fillStyle = "rgb(253,239,199)";
    neyDraw.lineWidth = 20;

    for (var i = 0; i < 10; i++) {
        drawLine(
            0,
            (i + 1) * (ansHeight / 10) - 6,
            ans[i] * ansWidth,
            (i + 1) * (ansHeight / 10) - 6,
            neyDraw
        );
        neyDraw.fillText(`${i}`, 0, (i + 1) * (ansHeight / 10));
    }
}
