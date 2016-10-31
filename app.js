$( function() {

	var userChoice = "";
	var compChoice = "";

	var seletionMade = false;
	var gameOver = false;


	$(".field").click() {

		if (isEmpty(this)) {

			fillField(this, userChoice);

			checkWin();

		}
	}

	isEmpty(field) {
		return !field.hasClass("filled");
	}

	fillField(field, icon) {

		field.addClass(icon);

	}

	checkWin() {
		
	}
})