document.addEventListener("DOMContentLoaded", () => {
  let shooterIndex = 587; //initial position of the shooter
  let squares = [];
  const alienInvaders = [];
  const grid = document.getElementById("grid");
  const width = 25;
  let movingRight = true;
  let invadersInterval;
  const deadInvaders = [];
  let displayedScore = document.querySelector("#score");
  let score = 0;
  displayedScore.innerHTML = score;
  for (
    let i = 28;
    i < 37;
    i++ // adding all invaders
  ) {
    alienInvaders.push(i);
    alienInvaders.push(i + width);
    alienInvaders.push(i + width * 2);
  }
  for (let i = 0; i < 25 * 25; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);
  }
  squares[shooterIndex].classList.add("shooter");
  console.log(squares[shooterIndex]);

  //function to draw the invaders
  //this is called after each updation
  function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
      if (deadInvaders.includes(i)) continue;
      squares[alienInvaders[i]].classList.add("invaders");
    }
  }
  function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove("invaders");
    }
  }
  draw();

  //shooter movement -left and right
  function moveshooterIndex(e) {
    squares[shooterIndex].classList.remove("shooter");
    switch (e.key) {
      case "ArrowLeft":
        if (shooterIndex % width !== 0) shooterIndex -= 1;
        break;

      case "ArrowRight":
        if (shooterIndex % width !== width - 1) shooterIndex += 1;
        break;
    }
    squares[shooterIndex].classList.add("shooter");
  }
  document.addEventListener("keydown", moveshooterIndex);

  //function to move the alien invaders
  function moveInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
      //   to check if game is over
      if (
        squares[alienInvaders[i]].classList.contains("invaders") &&
        squares[alienInvaders[i]].classList.contains("shooter")
      ) {
        console.log("game over");
        clearInterval(invadersInterval);
      }
      if (alienInvaders[i] >= width * width - width) {
        displayedScore.innerHTML = score + "\n GAME OVER";
        clearInterval(invadersInterval);
      }
      if (deadInvaders.length === alienInvaders.length) {
        displayedScore.innerHTML = score + "\n YOU WIN";
        clearInterval(invadersInterval);
      }
    }
    const leftEdge = alienInvaders[0] % width === 0 ? true : false;
    const rightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1
        ? true
        : false;

    remove();
    if (leftEdge && !movingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width;
      }
      movingRight = !movingRight;
    } else if (rightEdge && movingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width;
      }
      movingRight = !movingRight;
    } else {
      const direction = movingRight ? 1 : -1;
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
      }
    }
    draw();
  }
  invadersInterval = setInterval(moveInvaders, 100);

  function moveLaser(e) {
    let laserId = shooterIndex;
    let laserMoveInterval;

    function laserUp() {
      squares[laserId].classList.remove("laser");
      laserId -= width;
      if (laserId < 0) {
        clearInterval(laserMoveInterval);
        return;
      }
      squares[laserId].classList.add("laser");
      if (squares[laserId].classList.contains("invaders")) {
        console.log("here");
        squares[laserId].classList.remove("invaders");
        squares[laserId].classList.remove("laser");
        squares[laserId].classList.add("boom");

        setTimeout(() => squares[laserId].classList.remove("boom"), 500);
        clearInterval(laserMoveInterval);

        deadInvaders.push(alienInvaders.indexOf(laserId));
        score += 1;
        displayedScore.innerHTML = score;
        // console.log(deadInvaders);
      }
    }
    switch (e.key) {
      case "ArrowUp":
        squares[laserId - width].classList.add("laser");
        laserMoveInterval = setInterval(laserUp, 100);
        break;
    }
  }
  document.addEventListener("keydown", moveLaser);
});
