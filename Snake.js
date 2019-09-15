var gamePlatform = document.querySelector('#gamePlatform');
var snake = document.querySelector('#snake');
var snakeHead = document.querySelector('#snakeHead');
var header = document.querySelector('#header');
var food = document.querySelector('.food');
var score = document.querySelector('#score');
score.innerHTML = 0;
//--------------------------------------------
function addFood() {

    var food = document.createElement('span');
    food.className = 'food';
    food.style.left = gamePlatform.offsetLeft + Math.floor((Math.random() * gamePlatform.clientWidth) / 10) * 10 + 'px';
    food.style.top = gamePlatform.offsetTop + Math.floor((Math.random() * gamePlatform.clientHeight) / 10) * 10 + 'px';
    document.body.insertBefore(food, gamePlatform);

};

function addFoodToBody(direction) {

    var food = document.querySelector('.food');
    if (!food) { addFood() };
    var foodClone = food.cloneNode(true);
    var snakeHeadCoords = snakeHead.getBoundingClientRect();
    if (snakeHeadCoords.top === food.getBoundingClientRect().top && snakeHeadCoords.left === food.getBoundingClientRect().left) {

        snake.appendChild(foodClone);
        foodClone.style.position = 'absolute';
        foodClone.style.top = '0px';
        foodClone.style.left = '0px';

        if (direction == 'right') {
            snake.children[snake.children.length - 1].style.left = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).left) - 10 + 'px';
            snake.children[snake.children.length - 1].style.top = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).top) + 'px';
        };
        if (direction == 'down') {
            snake.children[snake.children.length - 1].style.top = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).top) - 10 + 'px';
            snake.children[snake.children.length - 1].style.left = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).left) + 'px'
        };
        if (direction == 'left') {
            snake.children[snake.children.length - 1].style.left = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).left) + 10 + 'px';
            snake.children[snake.children.length - 1].style.top = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).top) + 'px'
        };
        if (direction == 'up') {
            snake.children[snake.children.length - 1].style.top = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).top) + 10 + 'px';
            snake.children[snake.children.length - 1].style.left = parseInt(getComputedStyle(snake.children[snake.children.length - 2]).left) + 'px'
        };

        addScore();
        food.remove();
        addFood()

    }
};

function clearAllAsyncCalls(windowObject) {
    var id = Math.max(
        windowObject.setInterval(noop, 1000),
        windowObject.setTimeout(noop, 1000)
    );

    while (id--) {
        windowObject.clearTimeout(id);
        windowObject.clearInterval(id);
    }

    function noop() {}
};

function addScore() {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(snake.children.length)
};

//-----------------------------------------

function moveRight() {

    timerId = setInterval(() => {
        if (snakeHead.getBoundingClientRect().left > gamePlatform.getBoundingClientRect().left + gamePlatform.offsetWidth - 23) {
            clearInterval(timerId);
            displayLostPlatform();
        }
        addFoodToBody('right');
        snake.style.left = parseInt(getComputedStyle(snake).left) + 10 + 'px';
    }, 200)

}

function moveDown() {

    timerId = setInterval(() => {
        if (snakeHead.getBoundingClientRect().top > gamePlatform.getBoundingClientRect().top + gamePlatform.offsetHeight - 23) {
            clearInterval(timerId);
            displayLostPlatform();
        }
        addFoodToBody('down');
        snake.style.top = parseInt(getComputedStyle(snake).top) + 10 + 'px';
    }, 200)

}

function moveLeft() {

    timerId = setInterval(() => {
        if (snakeHead.getBoundingClientRect().left < gamePlatform.getBoundingClientRect().left + 20) {
            clearInterval(timerId);
            displayLostPlatform();
        }
        addFoodToBody('left');
        snake.style.left = parseInt(getComputedStyle(snake).left) - 10 + 'px';
    }, 200)

}

function moveUp() {

    timerId = setInterval(() => {
        if (snakeHead.getBoundingClientRect().top < gamePlatform.getBoundingClientRect().top + 20) {
            clearInterval(timerId);
            displayLostPlatform();
        }
        addFoodToBody('up');
        snake.style.top = parseInt(getComputedStyle(snake).top) - 10 + 'px';
    }, 200)

}

//-----------------------------------------------------
let rightFlag = false;
let downFlag = false;
let leftFlag = false;
let upFlag = false;
let timerId;
let turnTimerId;

//---------------------------------------------------------
document.addEventListener('keydown', function(e) {

    if (e.keyCode === 39) {


        if (leftFlag) { return };
        if (rightFlag) { return };
        clearAllAsyncCalls(window);

        turnRight().then(() => {
            clearAllAsyncCalls(window);
            moveRight()
        })

        rightFlag = true;
        downFlag = false;
        leftFlag = false;
        upFlag = false;


    } else if (e.keyCode === 40) {


        if (upFlag) { return };
        if (downFlag) { return };
        clearAllAsyncCalls(window);

        turnDown().then(() => {
            clearAllAsyncCalls(window);
            moveDown()
        })

        rightFlag = false;
        downFlag = true;
        leftFlag = false;
        upFlag = false;


    } else if (e.keyCode === 37) {


        if (rightFlag) { return };
        if (leftFlag) { return };
        clearAllAsyncCalls(window);

        turnLeft().then(() => {
            clearAllAsyncCalls(window);
            moveLeft()
        })

        rightFlag = false;
        downFlag = false;
        leftFlag = true;
        upFlag = false;


    } else if (e.keyCode === 38) {


        if (downFlag) { return };
        if (upFlag) { return };
        clearAllAsyncCalls(window);

        turnUp().then(() => {
            clearAllAsyncCalls(window);
            moveUp()
        })

        rightFlag = false;
        downFlag = false;
        leftFlag = false;
        upFlag = true;


    } else if (e.keyCode === 32) {

        clearAllAsyncCalls(window);

    }
});

//---------------------------------------------------

let turnRight = () => {
    return new Promise((resolve, reject) => {

        for (let j = 0; j < snake.children.length - 2; j++) {
            let turnTimerId = setTimeout(function() {
                for (let i = snake.children.length - 1; i > 0; i--) {
                    snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                    snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
                }
                snake.children[0].style.left = parseInt(getComputedStyle(snake.children[0]).left) + 10 + 'px';
            }, j * 200);
        }
        let turnTimerId = setTimeout(function() {
            for (let i = snake.children.length - 1; i > 0; i--) {
                snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
            }
            snake.children[0].style.left = parseInt(getComputedStyle(snake.children[0]).left) + 10 + 'px';
            resolve()
        }, (snake.children.length - 1) * 200);

    })

};

let turnDown = () => {
    return new Promise((resolve, reject) => {

        for (let j = 0; j < snake.children.length - 2; j++) {
            let turnTimerId = setTimeout(function() {
                for (let i = snake.children.length - 1; i > 0; i--) {
                    snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                    snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
                }
                snake.children[0].style.top = parseInt(getComputedStyle(snake.children[0]).top) + 10 + 'px';
            }, j * 200);
        }
        let turnTimerId = setTimeout(function() {
            for (let i = snake.children.length - 1; i > 0; i--) {
                snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
            }
            snake.children[0].style.top = parseInt(getComputedStyle(snake.children[0]).top) + 10 + 'px';
            resolve()
        }, (snake.children.length - 1) * 200);

    })

};

let turnLeft = () => {
    return new Promise((resolve, reject) => {

        for (let j = 0; j < snake.children.length - 2; j++) {
            let turnTimerId = setTimeout(function() {
                for (let i = snake.children.length - 1; i > 0; i--) {
                    snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                    snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
                }
                snake.children[0].style.left = parseInt(getComputedStyle(snake.children[0]).left) - 10 + 'px';
            }, j * 200);
        }
        let turnTimerId = setTimeout(function() {
            for (let i = snake.children.length - 1; i > 0; i--) {
                snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
            }
            snake.children[0].style.left = parseInt(getComputedStyle(snake.children[0]).left) - 10 + 'px';
            resolve()
        }, (snake.children.length - 1) * 200);

    })

};

let turnUp = () => {
    return new Promise((resolve, reject) => {

        for (let j = 0; j < snake.children.length - 2; j++) {
            let turnTimerId = setTimeout(function() {
                for (let i = snake.children.length - 1; i > 0; i--) {
                    snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                    snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
                }
                snake.children[0].style.top = parseInt(getComputedStyle(snake.children[0]).top) - 10 + 'px';
            }, j * 200);
        }
        let turnTimerId = setTimeout(function() {
            for (let i = snake.children.length - 1; i > 0; i--) {
                snake.children[i].style.left = parseInt(getComputedStyle(snake.children[i - 1]).left) + 'px';
                snake.children[i].style.top = parseInt(getComputedStyle(snake.children[i - 1]).top) + 'px';
            }
            snake.children[0].style.top = parseInt(getComputedStyle(snake.children[0]).top) - 10 + 'px';
            resolve()
        }, (snake.children.length - 1) * 200);

    })

};

//-----------------------------------------------------------
document.addEventListener('click', function(e) {

    if (e.target === document.querySelector('#startButton')) {
        document.querySelector('#startPlatform').style.display = 'none';
        gamePlatform.style.display = 'block';
        snake.style.left = gamePlatform.offsetLeft + 'px';
        snake.style.top = gamePlatform.offsetTop + 'px';
        addFood();

        gamePlatform.previousElementSibling.style.display = 'inline';
        gamePlatform.previousElementSibling.style.left = gamePlatform.offsetLeft + Math.floor((Math.random() * gamePlatform.clientWidth) / 10) * 10 + 'px';
        gamePlatform.previousElementSibling.style.top = gamePlatform.offsetTop + Math.floor((Math.random() * gamePlatform.clientHeight) / 10) * 10 + 'px';

    }

});

document.addEventListener('click', function(e) {
    if (e.target === document.querySelectorAll('.quitButton')[0] || e.target === document.querySelectorAll('.quitButton')[1]) {
        window.close()
    }
});

document.addEventListener('click', function(e) {
    if (e.target === document.querySelector('#startAgainButton')) {
        document.querySelector('#lostPlatform').style.display = 'none';
        gamePlatform.style.display = 'block';


        for (let i = snake.children.length - 1; i > 0; i--) {
            snake.children[i].remove()
        }

        score.innerHTML = 0;

        snake.style.left = gamePlatform.offsetLeft + 'px';
        snake.style.top = gamePlatform.offsetTop + 'px';
        snakeHead.style.left = 0;
        snakeHead.style.top = 0
        addFood()
    }
})

//----------------------------------------------------------------

function displayLostPlatform() {

    setTimeout(function() {
        document.querySelector('.food').remove();
        gamePlatform.style.display = 'none';
        document.querySelector('#lostPlatform').style.display = 'block';

    }, 0)

}