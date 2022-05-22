// const level = [
//   [1, 2, 3, 3, 2, 2, 1, 0, 1, 2],
//   [1, 1, 1, 3, 3, 2, 1, 0, 0, 1],
//   [1, 2, 2, 2, 0, 1, 1, 3, 1, 1],
//   [2, 2, 3, 3, 0, 0, 0, 3, 3, 1],
//   [2, 3, 3, 0, 0, 1, 2, 0, 0, 2],
//   [2, 2, 3, 1, 1, 2, 2, 2, 0, 2],
//   [1, 1, 1, 3, 3, 2, 1, 0, 0, 1],
//   [1, 2, 2, 2, 0, 1, 1, 3, 1, 1],
//   [2, 2, 3, 3, 0, 0, 0, 3, 3, 1],
//   [2, 3, 3, 0, 0, 1, 2, 0, 0, 2],
// ];

const level = [
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 5, 5, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 2, 2, 1, 5, 5, 5, 5, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 2, 2, 2, 1, 5, 5, 5, 1, 5, 1, 0, 0],
  [1, 5, 5, 5, 5, 1, 2, 2, 1, 5, 5, 5, 1, 5, 1, 0, 0],
  [1, 5, 5, 5, 5, 5, 1, 2, 2, 1, 5, 5, 5, 5, 1, 0, 0],
  [1, 2, 5, 5, 5, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 1, 2, 2, 2, 1, 4, 4, 4, 4, 4, 4, 1],
  [0, 0, 1, 1, 1, 3, 3, 3, 1, 4, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 1, 0],
  [0, 0, 0, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
];

var currentColor = 0;
var currentCellColoredWithCurrentColor = 0;

let numberOfEachColor = [0, 0, 0, 0, 0, 0];
// let numberOfEachColor = [29, 28, 21, 22, 0, 0];
var numberOfCellInLevel;
var maxColor = 1;

const width = 17,
  height = 12;

colorCodes = ["red", "green", "blue", "yellow", "cyan", "purple"];
// const map = new Map([
//   [1, "#131313"],
//   [2, "green"],
//   [3, "blue"],
//   [4, "yellow"],
// ]);

var mousedown = 0;

document.body.onmousedown = function () {
  ++mousedown;
};

document.body.onemouseup = function () {
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
        (level[i][j] + 1) +
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

  createUI();
  console.log("end of load");
}

function createUI() {
  for (let i = 0; i < 6; i++) {
    uicell =
      '<div class ="ui-cell ' + colorCodes[i] + '">' + (i + 1) + "</div>";
    document.getElementById("ui").insertAdjacentHTML("beforeend", uicell);
    document.querySelector("." + colorCodes[i]).style.background =
      colorCodes[i];
  }
}

function InitNumberOfEachColor() {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      numberOfEachColor[level[i][j]]++;
    }
  }
}

function colorize(a, b) {
  var cell;
  var x, y;

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
          cell.style.background = colorCodes[level[x][y]];
          cell.innerHTML = "";
          currentCellColoredWithCurrentColor++;
          console.log(currentCellColoredWithCurrentColor);
          console.log(currentColor);
          checkAndChangeCurrentColor();
        }
      }
    }
  }
}

function checkAndChangeCurrentColor() {
  if (currentCellColoredWithCurrentColor === numberOfEachColor[currentColor]) {
    // for(let i=0;i<height;i++){
    //     for(let j=0;j<width;j++){

    //     }
    // }

    // document.querySelector("." + colorCodes[currentColor]).classList +=
    //   " .blurred";
    document.querySelector("." + colorCodes[currentColor]).classList +=
      " color-end";
    currentColor++;
    currentCellColoredWithCurrentColor = 0;
    if (currentColor === maxColor) {
      document.getElementById("#game-field").innerHTML = "";
      document.getElementById("ui").innerHTML = "";
      document.getElementById("endscreen").style.opacity = 1;
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

window.onload = loadLevel;
