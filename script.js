
const plays = ["X", "O"];

let gameActive = true;
let winner = null;
let currentPlayer = Math.round(Math.random());
let ticTacToeBoard = Array(9).fill(null);


function checkWin () {

	const winConditions = [
	    [0, 1, 2], [3, 4, 5], [6, 7, 8],
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		[0, 4, 8], [2, 4, 6]
	];

	for (let i = 0; i <winConditions.length; i++) {
		const [a, b, c] = winConditions[i];
		if (ticTacToeBoard[a] && ticTacToeBoard[a] === ticTacToeBoard[b] && ticTacToeBoard[a] === ticTacToeBoard[c]) {
			postGame(winner);
			return ticTacToeBoard[a];
		}
	}

	return null;
}

function gridAnimations () {
	document.querySelectorAll(".ticTacToeBoard div").forEach(function(div) {
	    div.style.textShadow = "5px 5px 5px black";
	});
	document.querySelector(".box1").style.backgroundColor = "lightblue";
	document.querySelector(".box2").style.backgroundColor = "yellow";
	document.querySelector(".box3").style.backgroundColor = "lightgreen";
	document.querySelector(".box5").style.backgroundColor = "rgba(255, 0, 0, 0.4";
	document.querySelector(".box6").style.backgroundColor = "lightblue";
	document.querySelector(".box9").style.backgroundColor = "yellow";
}

function postGame (winner) {
	gameActive = false;
	document.querySelectorAll(".box1").forEach(function(div) {
		div.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
	});

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
	            winner = checkWin();
	        }

	    });

	});

});
