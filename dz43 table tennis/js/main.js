"use strict";
//speed and position randomizer
function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
}
const ball = document.getElementById ('ball')
const redScore = document.getElementById ('redScore');
const blueScore = document.getElementById ('blueScore');
const win = document.getElementById ('win');
const startStop = document.getElementById ('startstop');
let timer = 0;
let audiowin = new Audio('./media/cheer.mp3');
let audiobounce = new Audio('./media/bounce.mp3');
let tickbounce = new Audio('./media/tick.mp3');
let audiogong = new Audio('./media/gong.mp3');

////////////////////
const ballH = {
    posX : randomDiap(250,450),
    posY : randomDiap(40,300),
    speedX : randomDiap(2,5),
    speedY : randomDiap(2,4),
    width : 20,
    height: 20,
    update : function() {
        ball.style.left=this.posX+"px";
        ball.style.top=this.posY+"px";
    }
}

const areaH = {
    width : 730,
    height : 400
}
// paddles
const bluePad = {
    posY : 150,
    speedY : 15,
    width : 10,
    height: 100,
    move: function () {
        const leftPaddle = document.getElementById('paddleBlue')
        leftPaddle.style.top=this.posY+"px"
    }
}
const redPad = {
    posY : 150,
    speedY : 15,
    width : 10,
    height: 100,
    move: function () {
        const rightPaddle = document.getElementById('paddleRed')
        rightPaddle.style.top=this.posY+"px"
    }
}
///////////////////////////////
// paddles movements
const pressedKeys = {};

document.addEventListener ('keydown', (event)=> {

            if (!(event.code in pressedKeys)) {
                pressedKeys[event.code] = 'true';
            }  
            console.log (pressedKeys);

            if (pressedKeys['ShiftLeft']) {
                if (bluePad.posY <= 0) {
                    bluePad.posY = 0;
                } else {
                    bluePad.posY -= bluePad.speedY;
                    bluePad.move();
                }
            }
            if (pressedKeys['ControlLeft']) {
                if (bluePad.posY + bluePad.height >= 400) {
                    bluePad.posY = 300;
                } else {
                    bluePad.posY += bluePad.speedY;
                    bluePad.move();
                }
            }
            if (pressedKeys['ArrowUp']) { 
                if (redPad.posY <= 0) {
                    redPad.posY = 0;
                } else {
                    redPad.posY -= redPad.speedY;
                    redPad.move();
                }
            }
            if (pressedKeys['ArrowDown']) {
                if (redPad.posY + redPad.height >= 400) {
                    redPad.posY = 300;
                } else {
                    redPad.posY += redPad.speedY;
                    redPad.move();
                }
            }
});   

document.addEventListener ('keyup', (event)=> {
    if (event.code in pressedKeys) {
        delete pressedKeys[event.code];
    }
    console.log (pressedKeys);
});



//start stop button function
startStop.addEventListener ('click', start);
function start() {
    blueScore.value = 0;
    redScore.value = 0;
    win.innerHTML = '';
    ball.style.display = 'block'
    timer = setInterval(tick, 10);
    audiogong.play();
    startStop.value = 'Stop';
    startStop.removeEventListener('click', start);
    startStop.addEventListener('click', stop);
}
function stop () {
    clearInterval (timer);
    startStop.value = 'Start playing';
    startStop.removeEventListener('click', stop);
    startStop.addEventListener('click', start);
}

//movement function
function tick() {
    ballH.posX+=ballH.speedX;
    ballH.posY+=ballH.speedY;
    ballH.update();
    
    //red paddle hit or not
    if ((ballH.posX+ballH.width >= areaH.width) && ((ballH.posY + ballH.height / 2) < (redPad.posY)||(ballH.posY + ballH.height / 2) > (redPad.posY + redPad.height))) {
        ++blueScore.value;
        tickbounce.play();
        ballH.speedX=-ballH.speedX;
        ballH.posX=areaH.width-ballH.width;
    } 
    if ((ballH.posX+ballH.width >= areaH.width - redPad.width) && ((ballH.posY + ballH.height / 2) >= (redPad.posY)&&(ballH.posY + ballH.height / 2) <= (redPad.posY + redPad.height))) {
        audiobounce.play();
        ballH.speedX = - (ballH.speedX + 0.5) ;
        ballH.posX=areaH.width-ballH.width-redPad.width;
    }
        
    //blue paddle hit or not
    if ((ballH.posX <= 0) && ((ballH.posY + ballH.height / 2) < (bluePad.posY)||(ballH.posY + ballH.height / 2) > (bluePad.posY + bluePad.height))) {
        ++redScore.value;
        tickbounce.play();
        ballH.speedX=-ballH.speedX;
        ballH.posX = 0;
    } 
    if ((ballH.posX <= bluePad.width) && ((ballH.posY + ballH.height / 2) >= (bluePad.posY)&&(ballH.posY + ballH.height / 2) <= (bluePad.posY + bluePad.height))) {
        audiobounce.play();
        ballH.speedX = - (ballH.speedX - 0.5) ;
        ballH.posX = redPad.width;
    }
    // вылетел ли мяч ниже пола?
    if ( ballH.posY+ballH.height>areaH.height ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=areaH.height-ballH.height;
    }
    // вылетел ли мяч выше потолка?
    if ( ballH.posY<0 ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=0;
    }

    // win conditions
    if (blueScore.value == 10) {
        win.innerHTML = "BLUE PLAYER WINS!"
        win.style.color = "blue"
        ball.style.display = 'none'
        audiowin.play();

        stop ();
        ballH.posX = randomDiap(250,450),
        ballH.posY = randomDiap(40,300),
        ballH.speedX = randomDiap(2,5);
        ballH.speedY = randomDiap(2,4);
    } else if (redScore.value == 10) {
        win.innerHTML = "RED PLAYER WINS!"
        win.style.color = "red"
        ball.style.display = 'none'
        audiowin.play();

        stop (); 
        ballH.posX = randomDiap(250,450),
        ballH.posY = randomDiap(40,300),
        ballH.speedX = randomDiap(2,5);
        ballH.speedY = randomDiap(2,4);
    }
}
ballH.update();





















