function getMatrix (columns, rows) {
const matrix = [];
let idNumber = 1;

  for (let y = 0; y < rows; y++) {
    const fullRow = [];

      for (let x = 0; x < columns; x++){
        fullRow.push({
          id: idNumber++,
          left: false,
          right: false,
          visible: false,
          flag: false,
          burger: false,
          number: 0,
          x: x,
          y: y
        })
      }
    matrix.push(fullRow);
  } 
  return matrix
}

function getRandomEmptyCell (matrix) {
  const emptyCells = [];

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (!matrix[y][x].burger) {
          emptyCells.push(matrix[y][x])
        }
      }
    }
  const cellIndex = Math.floor(Math.random() * emptyCells.length)
  return emptyCells[cellIndex]
}

function addMine (matrix) {
  const emptyCell = getRandomEmptyCell(matrix);
  const checkCells = getCellsAround(matrix, emptyCell.x, emptyCell.y);
  emptyCell.burger = true;
  for (const emptyCell of checkCells) {
    emptyCell.number++;
  }
}

function getCell (matrix, x, y) {
  if (!matrix[y] || !matrix[y][x]) {
    return false;
  }
  return matrix[y][x]
}

function getCellsAround (matrix, x, y) {
  const cellsAround = [];

    for (let xCoord = -1; xCoord <= 1; xCoord++) {
      for (let yCoord = -1; yCoord <= 1; yCoord++) {
        const cellAround = getCell(matrix, x + xCoord, y + yCoord);
        if (xCoord === 0 && yCoord === 0) {
          continue;
        }
        if (cellAround) {
          cellsAround.push(cellAround);
        }
      }
    }
  return cellsAround
}

function matrixInHTML (matrix) {
  const gameElement = document.createElement('div');
  gameElement.classList.add('sapper');

    for (let y = 0; y < matrix.length; y++) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
        for (let x = 0; x < matrix[y].length; x++) {
          const cell = matrix[y][x];
          const imageElement = document.createElement('img');
          imageElement.draggable = false;
          imageElement.oncontextmenu = () => false;
          imageElement.setAttribute('data-cell-id', cell.id);
          rowElement.append(imageElement);
            if (cell.flag) {
            imageElement.src = 'images/flag.png';
            continue;
            }
            if (!cell.visible) {
            imageElement.src = 'images/fieldElement.png';
            continue;
            }
            if (cell.burger) {
            imageElement.src = 'images/Bomburger.png';
            continue;
            }
            if (cell.number) {
            imageElement.src = 'images/' + cell.number +'.png';
            continue;
            }
          imageElement.src = 'images/fieldEmpty.png';
        }
      gameElement.append(rowElement);
    }
  return gameElement
}

function getCellById (matrix, id) {
  for (let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y][x];
      if (cell.id === id) {
        return cell
      }
    }
  }
  return false
}

function forEachElement (matrix, handler) {
  for (let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      handler(matrix[y][x]);
    }
  }
}

function showCells (matrix, x, y) {
  const cell = getCell(matrix, x, y);
  
  if (cell.flag || cell.number || cell.burger) {
    return
  }
  forEachElement(matrix, x => x.marked = false);
  cell.marked = true;
  let flag = true;
  
    while (flag) {
      flag = false;
      for ( let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix.length; x++) {
          const cell = matrix[y][x];
          const cells = getCellsAround(matrix, x, y);
            if (!cell.marked || cell.number) {
              continue;
            }
            for ( const cell of cells) {
            if (cell.marked) {
              continue;
            }
            if (!cell.flag || !cell.burger) {
              cell.marked = true;
              flag = true;
            }
          }
        }
      }
  }
  forEachElement(matrix, x => {
    if (x.marked) {
      x.visible = true;
    }
    delete x.marked;
  })
}

function lose (matrix) {
  for ( let y = 0; y < matrix.length; y++){
    for (let x = 0; x < matrix.length; x++) {
      const cell = matrix[y][x];
        if (cell.burger && cell.visible){
          return true
        }
    }
  }
  return false
}

function win (matrix) {
  const hasFlags = [];
  const hasBurger = [];
  
  forEachElement(matrix, cell =>{
    if (cell.flag) {
      hasFlags.push(cell);
    }
    if (cell.burger) {
      hasBurger.push(cell);
    }
  }) 
  if (hasBurger.length != hasFlags.length) {
    return false;
  }
  for (const cell of hasBurger){
    if (!cell.flag) {
      return false;
    }
  }
  for ( let y = 0; y < matrix.length; y++){
    for (let x = 0; x < matrix.length; x++) {
      const cell = matrix[y][x];
        if (!cell.burger && !cell.visible) {
          return false;
        }
    }
  }
  return true
}
