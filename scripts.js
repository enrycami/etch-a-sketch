let num = 16;
createGrid(num);

// creates a grid with "num" rows and each row with "num" squares. 

function createGrid (num) {
    let gridContainer = document.querySelector('.grid');
    const height = (500/num);
    for (let i = 0; i < num; i++){
        const row = document.createElement("div");
        gridContainer.appendChild(row);
        row.className = "row";
        row.style.height = height;
        for (let i = 0; i < num; i++){
            const square = document.createElement("div");
            row.appendChild(square);
            square.className = "square";
            square.style.width = height;
        }
    }
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {square.addEventListener("mouseover", changeColor)})
}

//changes the target color when called

function changeColor(event){
    let color = "black"
    if (eraserOn === true){
        color = 'white';
    } else if (rgbMode === true){
        color = getRandomColor();
    }
    event.target.style.backgroundColor = color;
}

// setGridSize button removes the grid container and creates a new one after asking the user for the number of squares

const setGridSize = document.querySelector("#setGridSize");
setGridSize.addEventListener("click", ()=> {
    num = prompt("How many squares should each side of the box have?");
    if (num > 100){
        num = prompt("That is too high and could impact performance. Please input a lower number:");
    }
    let gridContainer = document.querySelector('.grid');
    gridContainer.remove();
    const newDiv = document.createElement("div");
    newDiv.className = "grid";
    document.body.appendChild(newDiv);
    createGrid(num);
})

// reset button creates a new empty grid, without changing the number of squares

const resetBtn = document.querySelector("#reset")
resetBtn.addEventListener("click", () => {
    let gridContainer = document.querySelector('.grid');
    gridContainer.remove();
    const newDiv = document.createElement("div");
    newDiv.className = "grid";
    document.body.appendChild(newDiv);
    createGrid(num);
})

const rgbBtn = document.querySelector("#rgbMode");
let rgbMode = false;
rgbBtn.addEventListener("click", () => {
    if (rgbMode === true){
        rgbMode = false;
    } else {
        rgbMode = true;
    }
})

const eraserBtn = document.querySelector("#eraser");
let eraserOn = false;
eraserBtn.addEventListener("click", () => {
    if (eraserOn === true){
        eraserOn = false;
    } else {
        eraserOn = true;
    }
})

function getRandomInteger(){
    return Math.floor(Math.random() * 15) + 1;
}

function getRandomColor(){
    let randomColor = "#";
    let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    for (let i = 0; i < 6; i++){
        randomColor += hexDigits[getRandomInteger()];
    }
    return randomColor;
}