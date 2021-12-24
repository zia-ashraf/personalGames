const userChoice = document.createElement("div");
const computerChoice = document.createElement("div");
const verdict = document.createElement("h3");
const gamesgrid = document.getElementById("games");
gamesgrid.append(userChoice, computerChoice, verdict);
const choices = [
  "url(img/icons8-hand-50.png)",
  "url(img/icons8-hand-rock-50.png)",
  "url(img/icons8-hand-scissors-50.png)",
];
// document.querySelector(".user-img").style.backgroundImage = choices[0];
// document.querySelector(".computer-img").style.backgroundImage = choices[0];

const clickHandler = (e) => {
  document.querySelector(".user-img").style.backgroundImage =
    choices[e.target.id];
  const randomVal = Math.floor(Math.random() * 3);
  document.querySelector(".computer-img").style.backgroundImage =
    choices[randomVal];
  if (parseInt(e.target.id) === randomVal) {
    document.getElementById("result").innerHTML =
      "IT's a TIE!! wanna try again ;)";
  } else if (parseInt(e.target.id) === 0 && randomVal === 1) {
    document.getElementById("result").innerHTML = "YOU WON!! :)";
  } else if (parseInt(e.target.id) === 1 && randomVal === 2) {
    document.getElementById("result").innerHTML = "YOU WON!! :)";
  } else if (parseInt(e.target.id) === 2 && randomVal === 0) {
    document.getElementById("result").innerHTML = "YOU WON!! :)";
  } else {
    document.getElementById("result").innerHTML =
      "BAD LUCK! Maybe next time :)";
  }
};
for (let i = 0; i < choices.length; i++) {
  const btn = document.createElement("button");
  btn.id = i;
  btn.style.backgroundImage = choices[i];
  gamesgrid.appendChild(btn);
  console.log(btn.id);
  document.getElementById(i).addEventListener("click", clickHandler);
}
