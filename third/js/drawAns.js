var neyCanv = document.getElementById("ans");
var neyDraw = neyCanv.getContext("2d");

neyCanv.width = 200;
neyCanv.height = 200;

function drawAns() {
    ctx.clearRect(0, 0, neyCanv.width, neyCanv.height);

    ctx.strokeStyle = "rgb(100,49,49)";
    ctx.fillStyle = "rgb(200,49,49)";
    drawLine(halfWidth, 0, halfWidth, height, ctx);
    drawLine(0, halfHeight, width, halfHeight, ctx);

    ctx.font = "30px Times New Roman";
    ctx.fillText("y", halfWidth + 5, height - 10);
    ctx.fillText("x", width - 20, halfHeight + 25);
}
