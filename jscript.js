//global variables
var direction = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};

var rounds = [5,5,3,3,2];
var colors = ['red', 'blue', 'green', 'yellow', 'orange'];

//pong ball that bounces around
var Ball = {
    new: function (incrementedSpeed){
        return{
            //ball size
            width:18,
            height: 18,
            //ball position center
            x: (this.canvas.width / 2) - 9,
            y: (this.canvas.height / 2) - 9,
            //ball movement
            moveX: direction.IDLE,
            moveY: direction.IDLE,
            //default speed
            speed: incrementedSpeed || 7 
        }
    }
}

//paddles for the players
var Ai = {
    new: function(side){
        return{
            width: 18,
            height: 180,
            x: side === 'left' ? 150 : this.canvas.width - 150,//paddle position for player at 150, else paddle position for ai at canvas width - 150
            y: (this.canvas.height / 2) - 35,//paddle height position at center
            score: 0,
            move: direction.IDLE,
            speed: 8//paddle speed
        }
    }
}

//game screen canvas
var Game = {
    initialize: function(){//initialize game
        this.canvas = document.querySelector('canvas');//get canvas
        this.context = this.canvas.getContext('2d');//access to 2D drawing functions to draw on canvas

        //setting canvas size
        this.canvas.width = 1400;
        this.canvas.height = 1000;

        //setting canvas style
        this.canvas.style.width = (this.canvas.width / 2) + 'px';
        this.canvas.style.height = (this.canvas.height / 2) + 'px';

        this.player = Ai.new.call(this, 'left');//calling function to place paddle for player
        this.ai = Ai.new.call(this, 'right');//calling function to place paddle for ai
        this.ball = Ball.new.call(this);//calling function to place ball

        this.ai.speed = 5;//default speed of paddles
        this.running = this.over = false;//game is not running and game is not over
        this.turn = this.ai;
        this.timer = this.round = 0;
        this.color = '#fff';

        //game loop
        Pong.menu();
        Pong.listen();
    },
    endGameMenu: function(text){
        //change the canvas font size and color
        Pong.context.font = '45px Courier New';
        Pong.context.fillStyle = this.color;

        //draw rectangle
        Pong.context.fillRect(
            Pong.canvas.width / 2 - 350,
            Pong.canvas.height / 2 - 48,
            700,
            100
        );

        // Change the canvas color;
        Pong.context.fillStyle = '#fff';

        //End game menu text
        Pong.context.fillText(text,
            Pong.canvas.width / 2,
            Pong.canvas.height / 2 + 15
        );

        setTimeout(function(){
            Pong = Object.assign({}, Game);
            Pong.initialize();
        }, 3000);
    },

    menu: function(){
        // drwaing the objects on the screen
        Pong.draw();

        //change the canvas font size and color
        this.context.font = '50px Courier New';
        this.context.fillStyle = this.color;

        this.context.fillRect(
            this.canvas.width / 2 - 350,
            this.canvas.height / 2 - 48,
            700,
            100
        );
        
        this.context.fillStyle = '#fff';
        this.context.fillText('Press Spacebar to begin',
            this.canvas.width / 2,
            this.canvas.height / 2 + 15
        );
    },

    update: function(){
        if(this.over){
            //reset x and y coordinates
            if (this.ball.x <=0){
                
            }
        }
    }
}