let canvas = document.getElementById('canvas_bird'),
    ctx = canvas.getContext('2d'),
    birdStart = document.getElementById('bird_start'),
    speed = document.getElementById('speed'),
    getSpeed = document.getElementById('getSpeed');

let myGamePiece;
let doAnim = true;
let generalSpeed = 2;

const player = {
    x: 50,
    y: 210,
    dx: 0,
    dy: 0,
    speed: 2,
    color: 'red',
    width: 50,
    height: 50
}
class UpObstacle {
    constructor (x, y, width, height, speed = generalSpeed, color = 'green') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
    }
}
// let obstacle1 = {
//     x: 500,
//     y: 0,
//     speed: generalSpeed,
//     color: 'green',
//     width: 50,
//     height: 250
// }
// let obstacle2 = {
//     x: 800,
//     y: 250,
//     speed: generalSpeed,
//     color: 'green',
//     width: 50,
//     height: 250
// }
// создаем игрока
function randomColor() {
    let rand = Math.floor(Math.random()*255);
    return color = `rgb(255, ${rand}, ${rand})`;
}
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// анимация
function clear() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

// Управление
birdStart.addEventListener('click', ()=> {
    update();
    birdStart.style.display = 'none';
});
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);


function newPos() {
    player.x +=player.dx;
    player.y +=player.dy;

    detectWalls();
}

function detectWalls() {
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

function keyDown(e) {
    function moveUp() {
        player.dy = -player.speed;
    }
    function moveDown() {
        player.dy = player.speed;
    }
    function moveRight() {
        player.dx = player.speed;
    }
    function moveLeft() {
        player.dx = -player.speed;
    }

    // e.preventDefault();
    if(e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    } else if(e.key === 'ArrowLeft' || e.key ==='Left') {
        moveLeft();
    } else if(e.key === 'ArrowUp' || e.key ==='Up') {
        moveUp();
    } else if(e.key === 'ArrowDown' || e.key ==='Down') {
        moveDown();
    }
}
function keyUp(e) {
    e.preventDefault();
    if (
        e.key =='Right' ||
        e.key =='ArrowRight' ||
        e.key =='Left' ||
        e.key =='ArrowLeft' ||
        e.key =='Up' ||
        e.key =='ArrowUp' ||
        e.key =='Down' ||
        e.key =='ArrowDown'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

// создаем препятствия 
function obstacles() {
    let a =500;
    for (let i=0; i<2 ; ++i) {
        let item = new UpObstacle(a, 0, 50, 250);
        for (;item.x > 0;) {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.width, item.height);
        console.log(item);
        item.x -= item.speed;
        item.width -= item.speed;
        }
        // a += 300;
    }
}
// двигаем препятствия и определяем столкновения
// function obstacles() {
//     drawObstacle();
//     // drawObstacle(obstacle2);
//     // crashUp(obstacle1);
//     // crashDown(obstacle2);
//     // item.x -=item.speed;
//     // obstacle2.x -=obstacle2.speed;
// }

function crashUp(item) {
    if (player.x+player.width > item.x && 
        player.y < item.height &&
        player.x < item.x + item.width
        ) {
            gameOver();

    }
}
function crashDown(item) {
    if (player.x+player.width > item.x && 
        player.y + player.height > item.height &&
        player.x < item.x + item.width
        ) {
            gameOver();
    }
}


// Игра окончена
function gameOver() {
    doAnim = false;
    ctx.font = '60px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Ты проиграл!', 300, 200);
}
function win() {
    doAnim = false;
    ctx.font = '60px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Ты победил!', 300, 200);
}
// главная функция
function update() {
    if (!doAnim) {
        ctx = null;
    } 
    clear();
    player.x += player.dx;
    drawPlayer();
    obstacles();
    newPos();
    // if (obstacle2.x + obstacle2.width<0) {
    //     win();
    // }
    requestAnimationFrame(update);   
}

