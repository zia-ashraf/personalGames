const grid = document.getElementById("grid");
const score = document.getElementById("score");
const squares = [];
let snakeInterval = null;
let snakeBody = [7, 8, 9, 10];
const width = 15;
let myscore = 0;
let direction = -1;
let intervalDuration = 500;
let foodId;
let speedFactor = 0.8; //factor of increase in speed each time.
for (let i = 0; i < 15 * 15; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
  squares.push(square);
}
// snakeBody.forEach((i) => squares[i].classList.add("snake"));

function startGame() {
  snakeBody = [7, 8, 9, 10];
  direction = -1;
  myscore = 0;
  intervalDuration = 500;
  speedFactor = 0.8;
  // score.innerHTML = "GAME OVER \n Your Score :" + myscore;
  console.log("here", intervalDuration);
  score.innerHTML = "Your Score :" + myscore;
  squares.forEach((item) => {
    item.classList.remove("snake");
    item.classList.remove("food");
  });
  makeFood();
  snakeBody.forEach((i) => squares[i].classList.add("snake"));
  clearInterval(snakeInterval);
  snakeInterval = setInterval(move, intervalDuration);
}

function move() {
  //game over cases:
  if (snakeBody[0] + width >= width * width && direction === width) {
    // hit down
    clearInterval(snakeInterval);
    score.innerHTML = "GAME OVER \n Your Score :" + myscore;
    return;
  } else if (snakeBody[0] - width <= 0 && direction === -width) {
    //hit top
    clearInterval(snakeInterval);
    score.innerHTML = "GAME OVER \n Your Score :" + myscore;
    return;
  } else if (snakeBody[0] % width === 0 && direction === -1) {
    //hit left
    clearInterval(snakeInterval);
    score.innerHTML = "GAME OVER \n Your Score :" + myscore;
    return;
  } else if (snakeBody[0] % width === width - 1 && direction === 1) {
    //hit left
    clearInterval(snakeInterval);
    score.innerHTML = "GAME OVER \n Your Score :" + myscore;
    return;
  } else if (squares[snakeBody[0] + direction].classList.contains("snake")) {
    //it hits itself
    clearInterval(snakeInterval);
    score.innerHTML = "GAME OVER \n Your Score :" + myscore;
    return;
  }
  //if food is found
  if (squares[snakeBody[0] + direction].classList.contains("food")) {
    snakeBody.unshift(snakeBody[0] + direction);

    squares[snakeBody[0]].classList.remove("food");
    squares[snakeBody[0]].classList.add("snake");
    makeFood();
    myscore += 1;
    score.innerHTML = "Your Score :" + myscore;
    clearInterval(snakeInterval);
    intervalDuration = intervalDuration * speedFactor;
    snakeInterval = setInterval(move, intervalDuration);
    console.log("here", intervalDuration);
  }

  //the snake simply moves
  snakeBody.unshift(snakeBody[0] + direction); 
  squares[snakeBody[0]].classList.add("snake");
  const tail = snakeBody.pop();
  squares[tail].classList.remove("snake");
}

function makeFood() {
  foodId = Math.floor(Math.random() * (width * width));
  if (snakeBody.includes(foodId)) makeFood();
  squares[foodId].classList.add("food");
}

function snakeDirection(e) {
  switch (e.key) {
    case "ArrowUp":
      direction = -width;
      break;
    case "ArrowDown":
      direction = width;
      break;
    case "ArrowLeft":
      direction = -1;
      break;
    case "ArrowRight":
      direction = 1;
      break;
  }
  // document.removeEventListener('keydown') check for this!
}
document.addEventListener("keydown", snakeDirection);
