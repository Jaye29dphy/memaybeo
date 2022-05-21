const level = [
  [1, 2, 3, 3, 2, 2, 1, 4, 1, 2],
  [1, 1, 1, 3, 3, 2, 1, 4, 4, 1],
  [1, 2, 2, 2, 4, 1, 1, 3, 1, 1],
  [2, 2, 3, 3, 4, 4, 4, 3, 3, 1],
  [2, 3, 3, 4, 4, 1, 2, 4, 4, 2],
  [2, 2, 3, 1, 1, 2, 2, 2, 4, 2],
  [1, 1, 1, 3, 3, 2, 1, 4, 4, 1],
  [1, 2, 2, 2, 4, 1, 1, 3, 1, 1],
  [2, 2, 3, 3, 4, 4, 4, 3, 3, 1],
  [2, 3, 3, 4, 4, 1, 2, 4, 4, 2],
];

var currentColor = 1;
var currentCellColoredWithCurrentColor = 0;

let numberOfEachColor = [0, 0, 0, 0, 0, 0];
// let numberOfEachColor = [29, 28, 21, 22, 0, 0];
var numberOfCellInLevel = 100;

const width = 10,
  height = 10;

const map = new Map([
  [1, "red"],
  [2, "green"],
  [3, "blue"],
  [4, "yellow"],
]);

var mousedown = 0;

document.body.onmousedown = function () {
  ++mousedown;
};

document.body.onmouseup = function () {
  --mousedown;
};

function reload() {
  var gameField = document.getElementById("#game-field");
  if (gameField.innerHTML == "") {
    loadLevel();
  } else {
    gameField.innerHTML = "";
    loadLevel();
  }
}

function loadLevel() {
  var str = "";

  for (let i = 0; i < height; i++) {
    str += '<div class="row">';

    for (let j = 0; j < width; j++) {
      str +=
        '<div class="cell non-select" onclick="colorize(' +
        i +
        ", " +
        j +
        ')">' +
        level[i][j] +
        "</div>";
    }

    str += "</div>";
  }

  document.getElementById("#game-field").insertAdjacentHTML("beforeend", str);

  // init number of each color

  InitNumberOfEachColor();

  console.log("1 amount: " + numberOfEachColor[0]);
  console.log("2 amount: " + numberOfEachColor[1]);
  console.log("3 amount: " + numberOfEachColor[2]);
  console.log("4 amount: " + numberOfEachColor[3]);
  console.log("5 amount: " + numberOfEachColor[4]);
  console.log("6     amount: " + numberOfEachColor[5]);

  console.log("end of load");
}

function InitNumberOfEachColor() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      switch (level[i][j]) {
        case 1:
          // code block
          numberOfEachColor[0]++;
          break;
        case 2:
          // code block
          numberOfEachColor[1] += 1;

          break;
        case 3:
          // code block
          numberOfEachColor[2] += 1;

          break;
        case 4:
          // code block
          numberOfEachColor[3] += 1;

          break;
        case 5:
          // code block
          numberOfEachColor[4] += 1;

          break;
        case 6:
          numberOfEachColor[5] += 1;
          // code block
          break;
      }
    }
  }
}

function colorize(a, b) {
  var cell;
  var x, y;
  if (currentCellColoredWithCurrentColor === numberOfEachColor[currentColor]) {
    currentColor++;
    currentCellColoredWithCurrentColor = 0;
  }
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      x = a + i;
      y = b + j;
      if (x >= 0 && y >= 0 && x < height && y < width) {
        cell = document.querySelector(
          '[onclick="colorize(' + x + ", " + y + ')"]'
        );

        if (
          level[x][y] === currentColor &&
          !cell.classList.contains("colored")
        ) {
          cell.classList += " colored";
          cell.style.background = map.get(currentColor);
          cell.innerHTML = "";
          currentCellColoredWithCurrentColor++;
          console.log(currentCellColoredWithCurrentColor);
        }
      }
    }
  }
}

function dragColorize(e) {
  var cell;
  var str;
  var arr;
  var x, y;

  if (e.target.className == "cell non-select" && mousedown) {
    cell = e.target;
    str = cell.getAttribute("onclick");
    str = str.replace("colorize(", "");
    str = str.replace(")", "");
    str = str.replace(",", "");
    arr = str.split(" ");
    x = parseInt(arr[0]);
    y = parseInt(arr[1]);
    colorize(x, y);
  }
}

window.onload = function () {};
