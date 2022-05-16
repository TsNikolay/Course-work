const getMatrix = (rows,columns) => {
    const matrix = []
    let idNumber = 1;

    for (let row = 0; row < rows; row++){
        const fullRow = [];
        
        for (let column = 0; column < columns; column++){
            fullRow.push({
              id: idNumber++,
              x: column,
              y: row,
              number: 0,
              bomb: false,
              flag: false,
              visible: true
            })
        }
        matrix.push(fullRow)
    }
    return matrix
}

const getRandomEmptyCell = matrix =>{
    const emptyCells = []
    for( let y = 0; y < matrix.length; y++){
        for( let x = 0; x < matrix[y].length; x++){
            if(!matrix[y][x].bomb){
                emptyCells.push(matrix[y][x]) 
            }
        }
    }
    const cellIndex = Math.floor(Math.random()* emptyCells.length) 
    return emptyCells[cellIndex]
}

const getCell = (matrix, x, y) =>{
    if (!matrix[y] || !matrix[y][x]){
        return false
    } 
    return matrix[y][x];
}

const getCellsAround = (matrix, x, y) => {
    const cellsAround = []

    for( let xCoord = -1; xCoord <= 1; xCoord++){
        for( let yCoord = -1; yCoord <= 1; yCoord++){
            if ( xCoord === 0 && yCoord === 0){
                continue 
            } 
            
            const cellAround = getCell(matrix, x + xCoord ,y + yCoord)
            if (cellAround){
                cellsAround.push(cellAround) 
            } 
        }
    }
    return cellsAround
}

const addMine = matrix =>{
    const emptyCell = getRandomEmptyCell(matrix)
    const checkCells = getCellsAround(matrix, emptyCell.x, emptyCell.y)
    emptyCell.bomb = true;

    for (cell of checkCells){
        cell.number++
    }
}

const matrixInHTML = matrix =>{
    const gameElement = document.createElement('div')
    gameElement.classList.add('sapper')

    for ( let y = 0; y < matrix.length; y++){
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        gameElement.append(rowElement)

        for( let x = 0; x < matrix[y].length; x++){
            const cell = matrix[y][x];
            const imageElement = document.createElement('img')
            imageElement.draggable= false;
            rowElement.append(imageElement)

            if(cell.bomb){
                imageElement.src = 'images/Bomburger.png'
            }

            else if(!cell.visible){
                imageElement.src = 'images/fieldElement.png' 
            }

            else if(cell.flag){
                imageElement.src = 'images/flag.png' 
            }

            else if(cell.number != 0){
                imageElement.src = 'images/' + cell.number +'.png' 
            }

            else{
                imageElement.src = 'images/fieldElement.png'
            }
            
        }
    }
    return gameElement
}