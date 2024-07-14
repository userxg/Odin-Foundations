const cellSizeBar = document.querySelector('#cell-size');
console.log(cellSizeBar.value);
const cellColorBar = document.querySelector('#cell-color');
let cellColor = cellColorBar.value;
console.log(cellColor);
const gridContainer = document.querySelector('.grid-container');
gridContainer.setAttribute('style', 'width: 502px; height: 502px;');
const GRID_CONTAINER_SIZE = parseInt(gridContainer.style.height) - 2;
console.log(GRID_CONTAINER_SIZE);
const DIVISORS_Of_500 = [4, 5, 10, 20, 25, 50, 100, 125, 250, 500];
                    //  0   10  20  30 40  50  60   70   80   90
                    //  0   1   2   3   4  5     6   7   8     9
fillGrid(cellSizeBar.value);


cellSizeBar.addEventListener('input', () => {
    
    const cellSize = cellSizeBar.value;
    fillGrid(cellSize);
})

cellColorBar.addEventListener('input', () => {
    cellColor = cellColorBar.value;
})

// gridContainer.addEventListener('mousedown', () => {
//     gridContainer.addEventListener('mouseover', e => {
//         console.log(e.target);
//         e.target.style.backgroundColor = cellColor;
//     })
    
// })


function fillGrid(cellSize) {
    
    //clean container
    gridContainer.replaceChildren();

    //calculate amount and size
    cellSize = roundCellSize(cellSize);

    const amountOfCells = (GRID_CONTAINER_SIZE / cellSize) ** 2; 

    for (let i = 0; i <amountOfCells; ++i){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('style', `width: ${cellSize}px; height: ${cellSize}px;`);
        gridContainer.append(cell);
    }
}

function roundCellSize(cellSize) {
    cellSize = DIVISORS_Of_500[Math.round(cellSize / 10)];
    return cellSize;
}




/*


3.make cells colorable


sdfsdf
*/