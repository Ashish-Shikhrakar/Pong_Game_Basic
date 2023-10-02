//selecting canvas element
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');//access to 2D drawing functions to draw on canvas

//objects for game
//user object
const user = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}

//computer object
const com = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}


//net object
const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: 'white'
}

//ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 8,
    velocityX: 8,
    velocityY: 8,
    color: 'white'
}

//functions for game
//function to draw paddles and net
function drawrect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

//function to draw ball
function drawcircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

//function to place text on canvas
function drawtext(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = '45px Courier New';
    ctx.fillText(text, x, y);
}

let rectX = 0;//x coordinate of rectangle

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawrect(net.x, net.y + i, net.width, net.height, net.color);
    }
}


function resetBall(){
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    ball.speed = 8;
    ball.velocityX = -ball.velocityX;
}



function collision(b,p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

canvas.addEventListener('mousemove', movePaddle);

function movePaddle(event){
    let rect = canvas.getBoundingClientRect();//returns size of element and position relative to viewport so that we can take into account scrolling and border
    user.y = event.clientY - rect.top - user.height / 2;
}

let paused = false;

//function to render canvas
function render() {
    drawrect(0, 0, canvas.width, canvas.height, 'black');
    drawtext(user.score, canvas.width / 4, canvas.height / 5, 'white');
    drawtext(com.score, 3 * canvas.width / 4, canvas.height / 5, 'white');
    drawNet();
    drawrect(user.x, user.y, user.width, user.height, user.color);
    drawrect(com.x, com.y, com.width, com.height, com.color);
    drawcircle(ball.x, ball.y, ball.radius, ball.color);
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    let computerlevel = 0.08;
    com.y += ((ball.y - (com.y + com.height / 2))) * computerlevel;

    if (ball.y+ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width / 2) ? user : com;

    if(collision(ball,player)){
        let collidepoint = ball.y - (player.y + player.height / 2);
        collidepoint = collidepoint / (player.height / 2);
        let angleRad = collidepoint * (Math.PI / 4);

        let direction = (ball.x < canvas.width / 2) ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;
    }

    if(ball.x - ball.radius < 0){
        com.score++;
        resetBall();
    }
    else if(ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    }
}
const fps = 50;
let gamestate = false;
document.getElementById("start").addEventListener("click",function(){
    clearInterval(game);
    resetBall();
    gamestate = true;
    paused = false;
})

function game(){
    if ((gamestate)){
        if((!paused)){
            update();
        }
        render();
    }
    if (user.score === 5 || com.score === 5){
        resetBall();
        drawtext("GAME OVER", canvas.width /2 - 125, canvas.height - 50, 'white');
        
        user.score = 0;
        com.score = 0;
        gamestate = false;
        paused = true;
    }
}
setInterval(game, 1000 / fps);//render game every 1/50 second