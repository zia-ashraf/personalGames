const userChoice = document.createElement("h3");
const computerChoice = document.createElement("h3");
const verdict = document.createElement("h3");
const gamesgrid = document.getElementById("games");
gamesgrid.append(userChoice, computerChoice, verdict);
const choices = ["rock", "paper", "scissors"];

const clickHandler = (e) => {
  userChoice.innerHTML = "User Choice:" + e.target.innerHTML;
  const randomVal = Math.floor(Math.random() * 3);
  computerChoice.innerHTML = "Computer Choice:" + choices[randomVal];
};
for (let i = 0; i < choices.length; i++) {
  const btn = document.createElement("button");
  btn.id = choices[i];
  btn.innerHTML = choices[i];
  gamesgrid.appendChild(btn);
  console.log(btn.id);
  document.getElementById(choices[i]).addEventListener("click", clickHandler);
}
