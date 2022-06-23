let matrix = null;
let play = null;
const x = 10;
const y = 10;
const burgers = 10;

game(x, y, burgers);

document
  .querySelector("button")
  .addEventListener("click", () => game(10, 10, 10));

function game(x, y, burgers) {
  matrix = getMatrix(x, y);
  play = true;
  for (let i = 0; i < burgers; i++) {
    addMine(matrix);
  }
  update();
}

function update() {
  if (!play) {
    return;
  }

  const gameElement = matrixInHTML(matrix);
  const pageElement = document.querySelector("#app");

  pageElement.innerHTML = "";
  pageElement.append(gameElement);

  pageElement.querySelectorAll("img").forEach((imageElement) => {
    imageElement.addEventListener("mousedown", mouseDown);
    imageElement.addEventListener("mouseup", mouseUp);
    imageElement.addEventListener("mouseleave", mouseLeave);
  });

  if (lose(matrix)) {
    alert("Вы проиграли");
    play = false;
  }

  if (win(matrix)) {
    alert("Вы победили");
    play = false;
  }
}

function mouseDown(event) {
  const { cell, left, right } = getInfo(event);
  if (left) {
    cell.left = true;
  }
  if (right) {
    cell.right = true;
  }
  update();
}

function mouseUp(event) {
  const { cell, left, right } = getInfo(event);
  const both = cell.right && cell.left && (left || right);
  const leftMouse = !both && cell.left && !right;
  const rightMouse = !both && cell.right && right;

  if (left) {
    cell.left = false;
  }
  if (right) {
    cell.right = false;
  }
  if (leftMouse) {
    leftClick(cell);
  }
  if (rightMouse) {
    rightClick(cell);
  }
  update();
}

function mouseLeave(event) {
  const info = getInfo(event);
  info.cell.left = false;
  info.cell.right = false;
  update();
}

function getInfo(event) {
  const element = event.target;
  const cellId = parseInt(element.getAttribute("data-cell-id"));
  const leftMouseId = 1;
  const rightMouseId = 3;
  return {
    left: event.which === leftMouseId,
    right: event.which === rightMouseId,
    cell: getCellById(matrix, cellId),
  };
}

function leftClick(cell) {
  if (cell.visible || cell.flag) {
    return;
  }
  cell.visible = true;
  showCells(matrix, cell.x, cell.y);
}

function rightClick(cell) {
  if (!cell.visible) {
    cell.flag = !cell.flag;
  }
}
