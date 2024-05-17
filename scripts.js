createGrid(16);

const squares = document.querySelectorAll('.square');

function createGrid (num) {
    const gridContainer = document.querySelector(".grid");
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
}

squares.forEach(square => {square.addEventListener("mouseover", changeColor)})

function changeColor(event){
    event.target.style.backgroundColor = "black";
}