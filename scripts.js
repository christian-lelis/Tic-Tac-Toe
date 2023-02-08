const cellElements= document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const endGameMsg = document.querySelector("[data-end-msg]");
const winMsg = document.querySelector("[data-win]");
const resetBtn = document.getElementById("win-btn")
let isBall;

const winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
const startGame = () =>{
    

    for (const cell of cellElements){
        cell.classList.remove('x');
        cell.classList.remove('ball');
        cell.addEventListener('click', handleClick, {once: true});
    }
    board.classList.remove('x', 'ball');

    isBall= false;
    board.classList.add('x');
    winMsg.classList.remove ('winning-msg');
}
// --------------------------------------------------------------
const endGame = (isDraw) =>{
    
if(isDraw){
    endGameMsg.innerText = 'Empate!'
} else {
    endGameMsg.innerText = isBall ? "O venceu!" : "X venceu!"
}
    winMsg.classList.add("winning-msg")
}

const checkForWin = (currentPlayer) => {
    return winCombination.some(combination => {
        return combination.every((index) => {
            return cellElements [index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () => {
    return [...cellElements].every(cell =>{
        return cell.classList.contains ('x') || cell.classList.contains ('ball');
    })
}
// --------------------------------------------------------------
const placeMark = (cell, classToAdd) => { // marca a celula
    cell.classList.add(classToAdd);
} 
const swapTurn = () => { //troca o jogador
    isBall = !isBall;

    board.classList.remove ('ball');
    board.classList.remove ('x');

    if(isBall){
        board.classList.add('ball');
    } else {
        board.classList.add('x');}
}
const handleClick = (e) => { //onde a magica acontece
// colocar X ou bola
    const cell = e.target;
    const classToAdd = isBall ? "ball" : "x";
    cell.classList.add(classToAdd);
    placeMark (cell, classToAdd);
// verificar vitória
    const isDraw = checkForDraw();// verificar empate
    const isWin = checkForWin(classToAdd); // verificar vitória com o match dos arrays
    if (isWin) {
        endGame(false) // retorna o vencedor
    } else if (isDraw) { 
        endGame(true)} // retorna tela de empate
    swapTurn () // troca o turno do jogador
} 

startGame () //começa o jogo

resetBtn.addEventListener('click', startGame) // reseta o jogo