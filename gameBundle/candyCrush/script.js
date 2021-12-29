document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreCount = document.getElementById("score");
  const movesCount = document.getElementById("moves");
  let score = 0;
  let moves = 0;
  scoreCount.innerHTML = score;
  movesCount.innerHTML = moves;

  const colors = [
    "green",
    "blue",
    "red",
    "pink",
    "yellow",
    "purple",
    "orange",
    "brown",
  ];
  const squares = [];
  function fillcolors() {
    for (let i = 0; i < 8 * 8; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      const randomColor = Math.floor(Math.random() * colors.length);
      square.style.backgroundColor = colors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  fillcolors();

  let validMoves;
  let IdOfSquareEeingDragged;
  let IdOfSquareBeingReplaced;
  squares.forEach((square) => {
    square.addEventListener("dragstart", dragStart);
  });
  squares.forEach((square) => {
    square.addEventListener("dragend", dragEnd);
  });
  squares.forEach((square) => {
    square.addEventListener("dragover", dragOver);
  });
  squares.forEach((square) => {
    square.addEventListener("dragenter", dragEnter);
  });
  squares.forEach((square) => {
    square.addEventListener("dragleave", dragLeave);
  });
  squares.forEach((square) => {
    square.addEventListener("drop", dragDrop);
  });

  function dragStart() {
    if (moves > 25) {
      document.querySelector(".line1").innerHTML = "Game Over";
      document.querySelector(".line2").innerHTML = "Your score:" + score;
      document.querySelector(".icon").classList.add("makeVisible");
      return;
    }
    IdOfSquareEeingDragged = this.id;
    // console.log(this.style.backgroundColor);
    console.log(this.id, "dragStart");
    movesCount.innerHTML = moves;
  }
  function dragEnd(e) {
    e.preventDefault();
    console.log(this.id, "d");
  }
  function dragOver(e) {
    e.preventDefault();
    // console.log(this.id, "dd");
  }
  function dragEnter() {
    console.log(this.id, "ddd");
  }
  function dragLeave() {
    console.log(this.id, "dddd");
  }
  function dragDrop() {
    IdOfSquareBeingReplaced = this.id;
    const idofsquarebeingdraggedinInteger = parseInt(IdOfSquareEeingDragged);
    validMoves = [
      idofsquarebeingdraggedinInteger - 1,
      idofsquarebeingdraggedinInteger + 1,
      idofsquarebeingdraggedinInteger + 8,
      idofsquarebeingdraggedinInteger - 8,
    ];

    if (validMoves.includes(parseInt(IdOfSquareBeingReplaced))) {
      moves += 1;
      const storedDraggedColor =
        squares[IdOfSquareEeingDragged].style.backgroundColor;
      squares[IdOfSquareEeingDragged].style.backgroundColor =
        squares[IdOfSquareBeingReplaced].style.backgroundColor;
      squares[IdOfSquareBeingReplaced].style.backgroundColor =
        storedDraggedColor;
    }
  }

  //check row for three matches
  function matchRow() {
    for (let i = 0; i < 62; i++) {
      let ignoredValues = [];
      for (let j = 1; j <= 8; j++) {
        const a = 8 * j + 6;
        ignoredValues.push(a);
        ignoredValues.push(a + 1);
      }
      // console.log(ignoredValues);
      if (ignoredValues.includes(i)) continue;
      if (
        squares[i].style.backgroundColor ===
          squares[i + 1].style.backgroundColor &&
        squares[i + 1].style.backgroundColor ===
          squares[i + 2].style.backgroundColor &&
        squares[i].style.backgroundColor != "white"
      ) {
        score += 3;
        scoreCount.innerHTML = score;
        squares[i].style.backgroundColor = "white";
        squares[i + 1].style.backgroundColor = "white";
        squares[i + 2].style.backgroundColor = "white";
      }
    }
  }
  // setInterval(matchRow, 100);

  //check column for three matchesko
  function matchColumn() {
    for (let i = 0; i < 48; i++) {
      let values = [i, i + 8, i + 16];
      let pickedColour = squares[i].style.backgroundColor;
      const checker = values.every((j) => {
        // console.log(j);
        return (
          squares[j].style.backgroundColor === pickedColour &&
          squares[j].style.backgroundColor != "white"
        );
      });
      // console.log(checker, i);
      if (checker) {
        score += 3;
        values.forEach((j) => {
          scoreCount.innerHTML = score;
          squares[j].style.backgroundColor = "white";
        });
      }
    }
  }
  for (let i = 0; i < 64; i++) {
    if (squares[i].style.backgroundColor === "white") console.log(i);
  }
  // setInterval(matchColumn, 100);
  // matchColumn();

  //moveDown

  function moveDown() {
    for (let i = 0; i < 56; i++) {
      if (squares[i + 8].style.backgroundColor === "white") {
        squares[i + 8].style.backgroundColor = squares[i].style.backgroundColor;
        squares[i].style.backgroundColor = "white";
        let topLayer = [0, 1, 2, 3, 4, 5, 6, 7];
        if (topLayer.includes(i)) {
          squares[i].style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        }
      }
    }
  }

  setInterval(() => {
    moveDown();
    matchRow();
    matchColumn();
  }, 100);
});
