const boxes = document.querySelectorAll(".box");

let score = 0;
let currentTimer = 11;
var mole = document.createElement("img");
mole.src = "./mole2.svg";
function clickedBox(x) {
  if (this.classList.contains("mole")) {
    ++score;
  }
  document.getElementById("score").innerHTML = score;
  moleMover();
}

function moleMover() {
  boxes.forEach((item) => {
    item.classList.remove("mole");
    item.addEventListener("click", clickedBox);
  });

  const randomBox = boxes[Math.floor(Math.random() * 9)];
  randomBox.appendChild(mole);
  randomBox.classList.add("mole");
  //   console.log(randomBox);
}

let moleMoverId = setInterval(moleMover, 1000);

function countdownTimer() {
  --currentTimer;
  document.getElementById("timer").innerHTML = currentTimer;
  if (currentTimer === 0) {
    clearInterval(countdownTimerId);
    clearInterval(moleMoverId);
    document.querySelector(".timer").innerHTML = "GAME OVER";
    boxes.forEach((item) => {
      item.removeEventListener("click", clickedBox);
    });
  }
}

let countdownTimerId = setInterval(countdownTimer, 1000);
