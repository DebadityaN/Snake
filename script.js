var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var n = 0;

var canvasHeight = 20;
var canvasWidth = 20;
var blockSize = 25;

var snakeArray = [[Math.floor((canvasWidth / 5) * blockSize), (canvasHeight / 2) * blockSize]];

var foodX = randomRange(0, canvasWidth)*blockSize;
var foodY = randomRange(0, canvasHeight)*blockSize;

var alerted = false;

if (foodX > canvasWidth*blockSize) {
    foodX = randomRange(0, canvasWidth)*blockSize;
}

if (foodY > canvasHeight*blockSize) {
    foodY = randomRange(0, canvasWidth)*blockSize;
}

var velocityX = 0;
var velocityY = 0;

var gameOver = false;

function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function render() {
    if (gameOver == false) {
    ctx.rect(0, 0, canvasHeight*blockSize, canvasWidth*blockSize);
    ctx.fillStyle = 'black';
    ctx.fill();
    }

    snakeArray.unshift([snakeArray[0][0]+velocityX*blockSize, snakeArray[0][1]+velocityY*blockSize]);
    snakeArray.pop();

    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[i][0] == snakeArray[0][0] && snakeArray[i][1] == snakeArray[0][1]) {
            gameOver = true;
        }
    }

    if (snakeArray[0][0] < 0 || snakeArray[0][0] > canvasWidth * blockSize || snakeArray[0][1] < 0 || snakeArray[0][1] > canvasHeight * blockSize) {
        gameOver = true;
    }

    for (const i of snakeArray) {
        ctx.beginPath();
        ctx.rect(i[0], i[1], blockSize, blockSize)
        ctx.fillStyle = 'lime';
        ctx.fill();
    }

    ctx.beginPath();
    ctx.rect(foodX, foodY, blockSize, blockSize);
    ctx.fillStyle = 'red';
    ctx.fill();
    
    window.addEventListener('keydown', function(e) {
        if (gameOver == false) {
        if (e.code == 'ArrowUp' && ((velocityX != 0 && velocityY != -1) || n == 0)){
            velocityX = 0; velocityY = -1;
        } else
        if (e.code == 'ArrowDown' && ((velocityX != 0 && velocityY != 1) || n == 0)){
            velocityX = 0; velocityY = 1;
        } else
        if (e.code == 'ArrowLeft' && ((velocityX != 1 && velocityY != 0) || n == 0)){
            velocityX = -1; velocityY = 0;
        } else
        if (e.code == 'ArrowRight' && ((velocityX != -1 && velocityY != 0) || n == 0)){
            velocityX = 1; velocityY = 0;
        }
        n += 1
    }});

    if (snakeArray[0][0] == foodX && snakeArray[0][1] == foodY) {
        foodX = randomRange(0, canvasWidth)*blockSize;
        foodY = randomRange(0, canvasHeight)*blockSize;

        for (let i = 0; i < 500; i++) {
            if (foodX > canvasHeight*blockSize/2) {
                foodX = randomRange(0, canvasWidth)*blockSize;
            }
            if (foodY > canvasHeight*blockSize/2) {
                foodY = randomRange(0, canvasHeight)*blockSize;
            }
            if (foodX < canvasHeight*blockSize/2 && foodY < canvasHeight*blockSize/2) {
                break
            }
        }
        snakeArray.push([(snakeArray[0][0] + velocityX * blockSize) + velocityX, (snakeArray[0][1] + velocityY * blockSize) + velocityY]);    
    }
    
    if (snakeArray.includes([foodX, foodY])) {
        foodX = randomRange(0, canvasWidth)*blockSize;
        foodY = randomRange(0, canvasHeight)*blockSize;
    }

    if (gameOver == true) {
        velocityX = 0;
        velocityY = 0;
        
        alerted = true;

        ctx.beginPath();
        ctx.font = '50px Segoe UI';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Game Over\n', canvasWidth*blockSize/4, canvasHeight*blockSize/2);
        ctx.fillText('Your score is ' + snakeArray.length, canvasWidth*blockSize/6, (canvasHeight*blockSize/2)+blockSize*2);
    }

}

window.onload = function() {
    render();
    setInterval(render, 1000/10);
}
