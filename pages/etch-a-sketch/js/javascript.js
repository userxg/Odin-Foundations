const cellSizeBar = document.querySelector('#cell-size');
const cellColorBar = document.querySelector('#cell-color');
let cellColor = cellColorBar.value;
let isDrawing = false;
const gridContainer = document.querySelector('.grid-container');
gridContainer.setAttribute('style', 'width: 502px; height: 502px;');
const GRID_CONTAINER_SIZE = parseInt(gridContainer.style.height) - 2;
const DIVISORS_Of_500 = [4, 5, 10, 20, 25, 50, 100, 125, 250, 500];




fillGrid(cellSizeBar.value);

cellSizeBar.addEventListener('input', () => {
    
    const cellSize = cellSizeBar.value;
    fillGrid(cellSize);
})

cellColorBar.addEventListener('input', () => {
    cellColor = cellColorBar.value;
})

gridContainer.addEventListener('mousedown', startDrawing);


gridContainer.addEventListener('mouseover', draw);

document.addEventListener('mouseup', stopDrawing);


function startDrawing(e) {
    e.preventDefault();
    console.log('startDrawing');
    console.log(e.target);
    console.log(gridContainer);
    isDrawing = true;
    if (e.target !== gridContainer)
        draw(e);
}

function stopDrawing(e) {
    console.log('stopDrawing');
    e.preventDefault();
    isDrawing = false;
}


function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;
    
    console.log('draw');
    if (e.target !== gridContainer)
        e.target.style.backgroundColor = cellColor;
}

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

