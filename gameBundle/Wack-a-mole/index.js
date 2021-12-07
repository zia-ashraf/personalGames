const boxes = document.querySelectorAll(".box");

let score = 0;
let currentTimer = 10;

function clickedBox(x) {
  if (this.classList.contains("mole")) {
    ++score;
  }
  document.getElementById("score").innerHTML = score;
}

function moleMover() {
  boxes.forEach((item) => {
    item.classList.remove("mole");
    item.addEventListener("click", clickedBox);
  });

  const randomBox = boxes[Math.floor(Math.random() * 9)];
  randomBox.classList.add("mole");
  //   console.log(randomBox);
}

let moleMoverId = setInterval(moleMover, 500);

function countdownTimer() {
  --currentTimer;
  document.getElementById("timer").innerHTML = currentTimer;
  if (currentTimer === 0) {
    clearInterval(countdownTimerId);
    clearInterval(moleMoverId);
    alert(
      "the game has ended,\n Your score is: " +
        score +
        "\nthanks for playing :)"
    );
  }
}

let countdownTimerId = setInterval(countdownTimer, 1000);
