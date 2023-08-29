let direction = {x: 0, y: 0}
let foodAudio = new Audio('music/food.mp3')
let gameoverAudio = new Audio('music/gameover.mp3')
let moveAudio = new Audio('music/move.mp3') 
let musicAudio = new Audio('music/music.mp3')
let board = document.getElementById('board')
let speed = 4
let lastPaintTime = 0
let score = 0
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7}


//Game Functions
function main(currentTime){
    window.requestAnimationFrame(main);
    // console.log(currentTime)
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime
    gameEngine()
}

function isCollide(snake){
    // If snake collides to itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If snake collides to wall
    if(snake[0].x >= 18 || snake[0].x <= 0 && snake[0].y >= 0 || snake[0].y <= 0){
        return true
    }
            
}

function gameEngine(){
    // P1 : Updating the snake array & food
    if(isCollide(snakeArr)){
        gameoverAudio.play()
        musicAudio.pause()
        direction = {x: 0, y: 0}
        alert("Game Over. Press any key to restart.")
        snakeArr = [
            {x: 13, y: 15}
        ]
        musicAudio.play()
        score = 0
        scoreBox.innerHTML = 'Score: ' + score
    }

    // If the snake eats food, increment score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodAudio.play()
        score += 1
        scoreBox.innerHTML = 'Score: ' + score
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a) * Math.random()), y: Math.round(a+(b-a) * Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}     // destructuring
    }

    snakeArr[0].x += direction.x
    snakeArr[0].y += direction.y

    // P2 : Rendering the snake array & food

    // Display Snake
    board.innerHTML = ''
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add('snakeHead')
        } else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    // Display Food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('snakeFood')
    board.appendChild(foodElement)
}




//Main Logic 
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    direction = {x: 0, y: 1}    // Start the game
    moveAudio.play();
    switch (e.key) {
        case 'ArrowUp':
            direction.x = 0;
            direction.y = -1;
            break;

        case 'ArrowDown':
             direction.x = 0;
             direction.y = 1;
             break;
        
        case 'ArrowLeft':
             direction.x = -1;
             direction.y = 0;
             break;    
             
        case 'ArrowRight':
             direction.x = 1;
             direction.y = 0;
             break; 
    
        default:
            break;
    }
})