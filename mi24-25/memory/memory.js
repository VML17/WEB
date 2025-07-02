const tiles = document.querySelectorAll(".tile");
const score = document.getElementById("score");
const timer = document.getElementById("timer");

function shuffle(n){
    for(let i=0; i<n; i++){
        let first = Math.floor(Math.random()*16);
        let second = Math.floor(Math.random()*16);

        [tiles[first].children[0].textContent, tiles[second].children[0].textContent] = [tiles[second].children[0].textContent, tiles[first].children[0].textContent]

    }
}
shuffle(50);

let remainingTime = +timer.textContent;
let clockRun = true;
async function startTimer(){
    await setTimeout(() => {
        if(clockRun ==  false){
            return;
        }else if(remainingTime > 0){
            remainingTime--;
            timer.textContent = remainingTime;
            startTimer();
        }else{
            gameFinish();
        }
    }, 1000);
    
}

startTimer();

function gameFinish(){
    tiles.forEach(tile => {
        tile.classList.add("gameOver")
        if (tile.children[0].classList.contains("hidden")){
            tile.children[0].classList.remove("hidden");
        }
    })
    alert("You lose, GAME OVER");
}


let active = [];

function checkIfPair(){
    if(active[0].children[0].textContent == active[1].children[0].textContent){
        active.forEach( tile => {
            tile.classList.add("matched");
        })
        score.textContent = +score.textContent + 50;
    }else{
        score.textContent = +score.textContent - 10;
    }
}

function checkIfGameWon(){
    let gameOver = true;

    tiles.forEach(tile => {
        if(!tile.classList.contains("matched")){
            gameOver = false;
        }
    })
    
    if (gameOver){
        clockRun=false;
        alert("You won!!!");
    }
}


tiles.forEach(tile => tile.addEventListener("click", () =>{
    if(tile.classList.contains("matched") || tile.classList.contains("gameOver")){
        return;
    }else if (active.length == 0){
        tile.children[0].classList.remove("hidden")
        active.push(tile);
    }else if (active.length == 1){
        tile.children[0].classList.remove("hidden")
        active.push(tile);
        checkIfPair();
        checkIfGameWon();
    }else{
        console.log(active)
        active.forEach(tile => {
            if(!tile.classList.contains("matched")){
                tile.children[0].classList.add("hidden");
            }
        });
        active = [];
        tile.children[0].classList.remove("hidden")
        active.push(tile);
    }
}));

// console.log(tiles)
// console.log(Math.floor(Math.random()*16))