const clockCanvas = document.getElementById("clock-canvas");
const ctx = clockCanvas.getContext("2d");
const sunFace = new Image();
sunFace.src = "../images/sunface.png"

let centre = clockCanvas.height / 2;
ctx.translate(centre, centre);
radius = 0.9 * centre;

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}
  
function drawFace(ctx, radius) {
    const grad = ctx.createRadialGradient(0, 0, 0.95 * radius, 0, 0, 1.05 * radius);
    grad.addColorStop(0, "#332b00");
    grad.addColorStop(0.14, "#ffeb7b");
    grad.addColorStop(0.28, "#332b00");
    grad.addColorStop(0.28, "#261006");
    grad.addColorStop(0.40, "#6e260e");
    grad.addColorStop(0.52, "#261006");
    grad.addColorStop(0.8, "#6e260e");
    grad.addColorStop(1, "#261006");
  
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#fcf5e5";
    ctx.fill();
  
    ctx.strokeStyle = grad;
    ctx.lineWidth = 0.1 * radius;
    ctx.stroke();

    ctx.drawImage(sunFace, 0, 0, 1872, 1872, -clockCanvas.width * 0.3, -clockCanvas.height * 0.3, 0.6 * clockCanvas.width, 0.6 * clockCanvas.height);

    ctx.beginPath();
    ctx.arc(0, 0, 0.05 * radius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

const convertToRoman = number => {
    const ref = [
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];
    const res = [];
  
    ref.forEach((array) => {
        while (number >= array[1]) {
            res.push(array[0]);
            number -= array[1];
        }
    });
    
    return res.join("");
};

function drawNumbers(ctx, radius) {
    ctx.font = "bold " + radius * 0.2 + "px quattrocento";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(let num = 1; num < 13; num++){
      let ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -0.8 * radius);
      ctx.fillText(convertToRoman(num), 0, 0);
      ctx.translate(0, 0.8 * radius);
      ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, 0.5 * radius, 0.07 * radius);

    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, 0.8 * radius, 0.07 * radius);
    
    second = (second * Math.PI / 30);
    drawHand(ctx, second, 0.9 * radius, 0.02 * radius);
}
  
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.rotate(-pos);
}

drawClock();
setInterval(drawClock, 1000);