let blockSize = 25;
let rows = 20;
let columns = 20;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];


let foodX ;
let foodY ;

let gameOver = false;
let score =0;



let buttons = document.querySelectorAll(".btn");
let levelOne = document.getElementById("btn1");
let levelTwo = document.getElementById("btn2");
let levelThree = document.getElementById("btn3");


buttons.forEach(button => {
    button.addEventListener("click", function() {
        on(this.id); 
    });
});


function on(level){
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext('2d')

    placeFood();
    document.addEventListener("keyup",changeDirection);

    if(level === "btn1"){
        setInterval(update,150);
    }
    else if(level === "btn2"){
        setInterval(update,100);
    }
    else if(level === "btn3"){
        setInterval(update,60);
    }
}


function update(){
    if(gameOver){
        return
    }

    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize)

    if(snakeX == foodX && snakeY == foodY){
        score+=10;
        document.getElementById('score').innerHTML = `Score: ${score}`
        snakeBody.push([foodX,foodY])
        placeFood();
    }

    for(let i= snakeBody.length-1; i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }


    context.fillStyle = "lime";
    snakeX+=velocityX * (blockSize);
    snakeY+=velocityY * (blockSize);
    context.fillRect(snakeX,snakeY,blockSize,blockSize)

    for(let i=0; i< snakeBody.length; i++){
        context.fillRect(snakeBody[i][0] , snakeBody[i][1] , blockSize,blockSize)
    }




   
    if(snakeX < 0 || snakeX > columns* blockSize || snakeY < 0 || snakeY >rows * blockSize){
        gameOver = true;
        alert("Game Over  ")
    }

    for(let i=0; i< snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over")
        }
    }
}

function changeDirection(event){
    if(event.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;

    }
    else if(event.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;

    }
    else if(event.code == "ArrowLeft"  && velocityX !=1){
        velocityX = -1;
        velocityY = 0;

    }
    else if(event.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;

    }

}



function placeFood(){
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}