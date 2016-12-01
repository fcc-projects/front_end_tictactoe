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


	$('input[type="radio"]').click( function() {
		setSelection($(this).attr("value"));

	});

	function setSelection(selection) {
		userChoice = selection;
		compChoice = selection == "x" ? "o" : "x";

		selectionMade = true;
		$("input[name=icon-selection]").attr('disabled', true);
	}

	$("div.field").click( function() {

		if (isEmpty(this)) {

			fillField(this, currPlayer);

			if (!winOrDraw()) {
				togglePlayer();
				compMakeMove();
			} 

		}
	});

	function isEmpty(field) {
		return !$(field).hasClass("filled");
	}

	function fillField(field, currPlayer) {

		if (currPlayer == "user") {
			$(field).addClass(userChoice);
			$(field).text(userChoice);
		} else {
			$(field).addClass(compChoice);
			$(field).text(compChoice);
		}
		
		$(field).addClass("filled");

	}

	function checkWin() {

		console.log("checkWin");
		for (var i = 0; i < winningCombinations.length; ++i) {

			if (($(".field:nth-child(" + winningCombinations[i][0] + ")").hasClass(userChoice) && 
				$(".field:nth-child(" + winningCombinations[i][1] + ")").hasClass(userChoice) && 
				$(".field:nth-child(" + winningCombinations[i][2] + ")").hasClass(userChoice)) || 
				($(".field:nth-child(" + winningCombinations[i][0] + ")").hasClass(compChoice) && 
				$(".field:nth-child(" + winningCombinations[i][1] + ")").hasClass(compChoice) && 
				$(".field:nth-child(" + winningCombinations[i][2] + ")").hasClass(compChoice))) {

				console.log("won game");
				return true;
			}
		}

		console.log("not won");
		return false;
	}

	function checkDraw() {
		return ($(".filled").length == 9);
	}

	function togglePlayer() {
		currPlayer == "user" ? currPlayer = "computer" : currPlayer = "user";
	}

	function winOrDraw() {
		console.log("winOrDraw")
		if (checkWin()) {


		} else if (checkDraw()) {


		} else {


			return false;
		}

		gameOver = true;

		resetBoard();		
		return true;
	}


	function resetBoard() {

		setTimeout( function() {
			$(".game-container > div").removeClass("filled");
			$(".field").text("");
			$(".game-container > div").removeClass(userChoice);
			$(".game-container > div").removeClass(compChoice);
		}, 2000 );
	}

	function compMakeMove() {
		var emptySquares = $('.field').not('.filled');
		var numEmpty = emptySquares.length;
		var ranNum = Math.floor(Math.random() * (numEmpty - 1));


		setTimeout(function() {
			fillField(emptySquares[ranNum], currPlayer);

			if (!winOrDraw()) {
				togglePlayer();
			}
		}, 1000);
		
	}
});