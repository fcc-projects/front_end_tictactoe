$( function() {

	var winningCombinations = [ [1, 2, 3],
							    [4, 5, 6],
							    [7, 8, 9],
							    [1, 4, 7],
							    [2, 5, 8],
							    [3, 6, 9],
							    [1, 5, 9],
							    [7, 5, 3]]

	var userChoice = "x";
	var compChoice = "o";
	var currPlayer = "user";
	var seletionMade = false;
	var gameOver = false;


	$(".field").click() {

		if (isEmpty(this)) {

			fillField(this, currPlayer);

			if (!winOrDraw()) {
				togglePlayer();
				compMakeMove();
			}

		}
	}

	function isEmpty(field) {
		return !field.hasClass("filled");
	}

	function fillField(field, currPlayer) {

		if (currPlayer == "user") {
			field.addClass(userChoice);
		} else {
			field.addClass(compChoice);
		}
		
		field.addClass("filled");

	}

	function checkWin() {

		for (var i = 0; i < winningCombinations.length; ++i) {
			if (($(".game-container:nth-child(" + winningCombinations[0] + ")").hasClass(userChoice) && 
				$(".game-container:nth-child(" + winningCombinations[1] + ")").hasClass(userChoice) && 
				$(".game-container:nth-child(" + winningCombinations[2] + ")").hasClass(userChoice)) || 
				($(".game-container:nth-child(" + winningCombinations[0] + ")").hasClass(compChoice) && 
				$(".game-container:nth-child(" + winningCombinations[1] + ")").hasClass(compChoice) && 
				$(".game-container:nth-child(" + winningCombinations[2] + ")").hasClass(compChoice))) {

				return true;
			}
		}

		return false;
	}

	function checkDraw() {
		return ($(".filled").length == 9);
	}

	function togglePlayer() {
		currPlayer == "user" ? currPlayer = "computer" : currPlayer = "user";
	}

	function winOrDraw() {
		if (checkWin()) {
			gameOver = true;
			resetBoard();
			// WINNER CURRPLAYER
			return true;

		} else if (checkDraw()) {

			gameOver = true;
			resetBoard();
				// DRAW POP UP

			return true;
		}

		return false;

	}


	function resetBoard() {
		$(".game-container > div").removeClass("filled");
		$(".game-container > div").removeClass(userChoice);
		$(".game-container > div").removeClass(compChoice);
	}

	function compMakeMove() {
		// MINIMAX AI;

		if (!winOrDraw()) {
			togglePlayer();
		}
	}
});