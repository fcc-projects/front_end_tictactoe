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
	var selectionMade = false;
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

	function resetSelection() {
		selectionMade = false;
		$("input[name=icon-selection]").attr('disabled', false);
		$("input[name=icon-selection]").prop('checked', false);
	}


	$("div.field").click( function() {

		if (selectionMade &&
			currPlayer == "user" && 
			isEmpty(this)) {

			fillField(this, currPlayer);

		} else {
			if (!selectionMade) {
				alert("Please select your icon!");
			}
		}
	});

	function isEmpty(field) {
		return !$(field).hasClass("filled");
	}

	function fillField(field, player) {

		if (player == "user") {
			$(field).addClass(userChoice);
			$(field).text(userChoice);
		} else {
			$(field).addClass(compChoice);
			$(field).text(compChoice);
		}
		
		$(field).addClass("filled");


		if (!winOrDraw()) {
			togglePlayer();

			if (currPlayer == "computer") {
				compMakeMove();
			}
			
		} 
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


				setTimeout( function() {
					alert(currPlayer.charAt(0).toUpperCase() + currPlayer.slice(1) + " has won!");

					resetBoard();
				}, 200 );

				return true;
			}
		}

		return false;
	}

	function checkDraw() {
		if ($(".filled").length == 9) {

			setTimeout ( function() {
				alert("It's a draw!");

				resetBoard();
			}, 200 );
			
			return true;
		}
	}

	function togglePlayer() {
		currPlayer == "user" ? currPlayer = "computer" : currPlayer = "user";
	}

	function winOrDraw() {
		if (checkWin() || checkDraw()) {

			gameOver = true;
	
			return true;
		} else {
			return false;
		}
	}


	function resetBoard() {

		setTimeout( function() {
			$(".game-container > div").removeClass("filled");
			$(".field").text("");
			$(".game-container > div").removeClass(userChoice);
			$(".game-container > div").removeClass(compChoice);
		}, 100 );

		resetSelection();
	}

	function compMakeMove() {
		var emptySquares = $('.field').not('.filled');
		var numEmpty = emptySquares.length;
		var ranNum = Math.floor(Math.random() * (numEmpty - 1));


		setTimeout(function() {
			fillField(emptySquares[ranNum], "computer");
		}, 200);
		
	}
});