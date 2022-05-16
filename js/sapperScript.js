const matrix = getMatrix(10,10)
for( let i = 0; i < 10; i++){
    addMine(matrix)
}
const gameElement = matrixInHTML(matrix)
const pageElement = document.querySelector('#app')
pageElement.innerHTML = ''
pageElement.append(gameElement)

console.log(matrix)
console.log(gameElement)