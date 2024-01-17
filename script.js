const plays = ["X", "O"];

let gameActive = true;
let winner = null;
let winningPath = [null, null, null];
let currentPlayer = Math.round(Math.random());
let ticTacToeBoard = Array(9).fill(null);

let currentPlayerDisplay = document.getElementById("currentPlayerDisplay");
let displayMessage = document.getElementById("displayMessage");
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
		box.style.backgroundImage = "linear-gradient(to left, rgb(255, 255, 200), goldenrod)";
		box.style.textShadow = "5px 5px 5px black";
	});
	winningPath.forEach(function(number, index) {
		let box = document.querySelector(".box" + number);
		box.style.animationDelay = `${index}.0s`;
		box.style.animation = `spin-it 1.5s 1 ${index - index * 0.5}s`;
	});
}

function postGame (winner) {
	gameActive = false;
	displayMessage.style.animation = "smooth-transition 1250ms forwards linear 1";
	displayMessage.innerHTML = "WINNING PLAYER";
	currentPlayerDisplay.innerHTML = winner;
	currentPlayerDisplay.style.animation = "none";
	console.log(currentPlayerDisplay.offsetHeight);
	currentPlayerDisplay.style.animation = "smooth-transition 1550ms forwards linear 1";
	gridAnimations ();
}

document.addEventListener('DOMContentLoaded', function () {
   const squares = document.querySelectorAll('.ticTacToeBoard div');
	squares.forEach(function (square, index) {
	   square.addEventListener("click", function () {
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

document.getElementById("resetButton").addEventListener('click', function() {

	document.querySelectorAll(".ticTacToeBoard div").forEach(function(div) {
	    div.style.backgroundColor = "white";
	    div.style.backgroundImage = "none";
	    div.innerHTML = "";
	    let styleValue = getComputedStyle(document.documentElement);
	    let shadowValue = styleValue.getPropertyValue("--custom-shadow").trim();
	    div.style.textShadow = shadowValue;
		 div.style.animationDelay = "none";
		 div.style.animation = "none";
		 console.log(div.offsetHeight);
	});

	gameActive = true;
	currentPlayer = Math.round(Math.random());
	winner = null;
	winningPath = [null, null, null];
	ticTacToeBoard.fill(null);

	currentPlayerDisplay.style.animation = "spin-it 750ms linear 1";
	currentPlayerDisplay.innerHTML = plays[currentPlayer];
	currentPlayerDisplay.style.animation = "none";
	console.log(currentPlayerDisplay.offsetHeight);
	currentPlayerDisplay.style.animation = "smooth-transition 1050ms reverse ease 1";

	displayMessage.style.animation = "none";
	console.log(displayMessage.offsetHeight);
	displayMessage.style.animation = "smooth-transition 1800ms reverse linear 1";
	displayMessage.innerHTML = "CURRENT PLAYER";
});
