const plays = ["X", "O"];

let gameActive = true;
let winner = null;
let winningPath = [null, null, null];
let currentPlayer = Math.round(Math.random());
let ticTacToeBoard = Array(9).fill(null);

let currentPlayerDisplay = document.getElementById("currentPlayer");
let displayMessage = document.getElementById("span1");
currentPlayerDisplay.innerHTML = plays[currentPlayer];



function checkWin () {
	const winConditions = [
	   [0, 1, 2], [3, 4, 5], [6, 7, 8],
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		[0, 4, 8], [2, 4, 6]
	];

	for (let i = 0; i <winConditions.length; i++) {
		const [a, b, c] = winConditions[i];
		if (ticTacToeBoard[a] && ticTacToeBoard[a] === ticTacToeBoard[b] && ticTacToeBoard[a] === ticTacToeBoard[c]) {
			winningPath = winConditions[i].map(value => value + 1);
			return ticTacToeBoard[a];
		}
	}
	return null;
}

function gridAnimations () {
	document.querySelectorAll(".ticTacToeBoard div").forEach(function(div) {
	    div.style.backgroundColor = "lightgray";
	});
	winningPath.forEach(function(number) {
		let box = document.querySelector(".box" + number);
		box.style.backgroundColor = "rgba(235, 255, 0, 90%)";
		box.style.textShadow = "5px 5px 5px black";
	});
	winningPath.forEach(function(number, index) {
		let box = document.querySelector(".box" + number);
		box.style.animationDelay = `${index}.0s`;
		box.style.animation = `slowSpin 1.5s 1 ${index - index * 0.5}s`;
	});
}

function postGame (winner) {
	gameActive = false;
	displayMessage.innerHTML = "WINNING PLAYER";
	currentPlayerDisplay.innerHTML = winner;
	gridAnimations ();
}

document.getElementById('resetButton').addEventListener('click', function() {
    location.reload();
});

document.addEventListener('DOMContentLoaded', function () {
   const squares = document.querySelectorAll('.ticTacToeBoard div');

	squares.forEach(function (square, index) {
	   square.addEventListener('click', function () {
	      if (gameActive && this.textContent === '') {
	         this.textContent = plays[currentPlayer];
	         ticTacToeBoard[index] = plays[currentPlayer];
	         currentPlayer = currentPlayer ^ 1;
	         currentPlayerDisplay.innerHTML = plays[currentPlayer];
	         winner = checkWin();
	         if (winner) { postGame(winner) };
	      }

	   });

	});

});
