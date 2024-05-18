let num = 16;
let eraserOn = false;
let rgbMode = false;
let lightenOn = false;
let darkenOn = false;
createGrid(num);

// eraserBtn to set the color to use to white
const eraserBtn = document.querySelector("#eraser");
eraserBtn.addEventListener("click", () => {
    if (eraserOn === true){
        eraserOn = false;
    } else {
        eraserOn = true;
    }    
})    


// rgbBtn to set the color to random 
const rgbBtn = document.querySelector("#rgbMode");
rgbBtn.addEventListener("click", () => {
    if (rgbMode === true){
        rgbMode = false;
    } else {
        rgbMode = true;
    }
})

// lightenBtn to decrease opacity
const lightenBtn = document.querySelector("#lighten");
lightenBtn.addEventListener("click", () => {
    if (lightenOn === true){
        lightenOn = false;
    } else {
        lightenOn = true;
        darkenOn = false;
    }
})

// darkenBtn to increase opacity
const darkenBtn = document.querySelector("#darken");
darkenBtn.addEventListener("click", () =>{
    if (darkenOn === true){
        darkenOn = false;
    } else {
        darkenOn = true;
        lightenOn = false;
    }
})

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
    // select each square and apply changeColor on mouse hover
    const squares = document.querySelectorAll('.square');
    if (lightenOn === true){
        squares.forEach(square => {square.addEventListener("mouseover", changeOpacity)})        
    } else{
        squares.forEach(square => {square.addEventListener("mouseover", changeColor)})
    }
}    

//changes the target color when called according to button pressed, including opacity

function changeColor(event){
    let color = "rgba(0, 0, 0, 0.99)"
    if (eraserOn === true){
        color = 'rgba(255, 255, 255, 0.99';
    } else if (lightenOn === true || darkenOn === true){
        let rgbaValues = extractColor(event.target.style.backgroundColor);
        let rValue = Number(rgbaValues[0]);
        let gValue = Number(rgbaValues[1]);
        let bValue = Number(rgbaValues[2]);
        let aValue = Number(rgbaValues[3]);
        if (lightenOn === true){
            if (aValue > 0){
                color = `rgba(${rValue}, ${gValue}, ${bValue}, ${aValue - 0.1})`;
            } else{
                color = `rgba(${rValue}, ${gValue}, ${bValue}, ${aValue})`;
            }
        } else if (darkenOn === true){
            if (aValue < 0.99){
                color = `rgba(${rValue}, ${gValue}, ${bValue}, ${aValue + 0.1})`;
            } else{
                color = `rgba(${rValue}, ${gValue}, ${bValue}, ${aValue})`;
            } 
        }
    } else if (rgbMode === true){
        color = getRandomColor();
    }
    event.target.style.backgroundColor = color;
    console.log(event.target.style.backgroundColor);
}    

function extractColor(color){
    color = color.slice(0, -1);
    color = color.slice(5);
    console.log(color);
    let rgbaValues = color.split(", ");
    console.log(rgbaValues);
    return rgbaValues;
}

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


// generate a random integer between 1 and 255
function getRandomInteger(){
    return Math.floor(Math.random() * 255) + 1;
}

// use getRandomInteger to generate a random rgba color
function getRandomColor(){
    let rValue = getRandomInteger();
    let gValue = getRandomInteger();
    let bValue = getRandomInteger();
    return `rgba(${rValue}, ${gValue}, ${bValue}, 0.99)`;
}