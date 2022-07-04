
const gridItems = document.querySelectorAll('[data-gridItem]')
const newGameBtn = document.querySelector("#new-game-btn")
const winner = document.querySelector("#winner")
const pointsX = document.querySelector(".counter-x")
const pointsO = document.querySelector(".counter-o")



//create keys to store the points if necessary
if(localStorage.getItem("x-counter") === null || localStorage.getItem("o-counter") === null) {
    localStorage.setItem("x-counter", 0)
    localStorage.setItem("o-counter", 0)
};

//display the points from the local storage on the scoreboard
let counterX = localStorage.getItem("x-counter");
let counterO = localStorage.getItem("o-counter");
pointsX.innerText = counterX;
pointsO.innerText = counterO;

//used on the buttons
function refreshPage() {
    window.location.reload()
}

function resetPoints() {
    localStorage.clear()
    refreshPage()
}

//all possible ways to win
const winCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
/*for each array from winCheck, the function compares if the innerTexts are equal and then returns the winner
if there is one*/
function checkifWin() {
    for(let i=0; i<8; i++) {
        if(gridItems[winCheck[i][0]].innerText === gridItems[winCheck[i][1]].innerText && gridItems[winCheck[i][1]].innerText === gridItems[winCheck[i][2]].innerText) {
            if(gridItems[winCheck[i][2]].innerText === "X") {
                return "X WINS!"
            } else if(gridItems[winCheck[i][2]].innerText === "O") {
                return "O WINS!"
            }
        }
    }
}

//used to know whose turn it is
let counter = 0

//adds eventlisteners for each grid-item
gridItems.forEach(div => div.addEventListener("click", e => {
    //1. logic to know whose turn it is
    
    if(counter % 2 === 0 ) {
        e.target.innerText = "X"
    } else {
        e.target.innerText = "O"
    }
    counter++
    //2. checks if there is a winner everytime one of the targets is clicked
    checkifWin()
    //3.makes the button "next round" visible, displays the winner and stores/shows the new score
    if(checkifWin() === "X WINS!") {
        newGameBtn.classList.remove("end-game")
        winner.innerText = "X WINS!"
        counterX++
        localStorage.setItem("x-counter", counterX)
        pointsX.innerText = counterX
    } else if(checkifWin() === "O WINS!") {
        newGameBtn.classList.remove("end-game")
        winner.innerText = "O WINS!"
        counterO++
        localStorage.setItem("o-counter", counterO)
        pointsO.innerText = counterO
    }
    
}, { once : true}))





