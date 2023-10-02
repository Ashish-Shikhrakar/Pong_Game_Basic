const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(100, 200, 50, 75);

ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(300, 350, 100, 0, Math.PI * 2, false);

function drawrect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawcircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawtext(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = '45px Courier New';
    ctx.fillText(text, x, y);
}

let rectX = 0;

function render() {
    drawrect(0, 0, 600, 400, 'black');
    drawrect(rectX, 100, 100, 100, 'red');
    rectX += 100;
}

setInterval(render, 1000);

const user = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}

const com = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}

drawrect(user.x, user.y, user.width, user.height, user.color);
drawrect(com.x, com.y, com.width, com.height, com.color);

const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: 'white'
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawrect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: 'white'
}

drawtext(user.score, canvas.width / 4, canvas.height / 5, 'white');
drawtext(com.score, 3 * canvas.width / 4, canvas.height / 5, 'white');

function render(){
    drawrect(0, 0, canvas.width, canvas.height, 'black');
    drawtext(user.score, canvas.width / 4, canvas.height / 5, 'white');
    drawtext(com.score, 3 * canvas.width / 4, canvas.height / 5, 'white');
}