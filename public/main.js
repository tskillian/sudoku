$(document).ready(function() {
	var clickedBox = null;
	// numberCollisionBoxes is to hold any boxes where the numbers are not possible (i.e. two 9s in a row)
	var numberCollisionBoxes = [];

	function resetClickedBox() {
		if (clickedBox) {
			clickedBox.removeClass('clicked');
			clickedBox = null;
		}
	}

	function setClickedBox(newClickedBox) {
		if (clickedBox) {
			clickedBox.removeClass('clicked');
		}
		newClickedBox.addClass('clicked');
		clickedBox = newClickedBox;
	}

	function returnNumberCollisionBoxesToOriginalState() {
		for (var i = 0; i < numberCollisionBoxes.length; i++) {
			numberCollisionBoxes[i].removeClass('collision');
		}
		numberCollisionBoxes = [];
	}

	function updateNumberCollisionBoxes(inputElement, number) {
		returnNumberCollisionBoxesToOriginalState();
		var parent = inputElement.parent();
		var columnClassName = parent.attr('class');
		var rowClassName = parent.parent().attr('class');
		var columns = $('.' + columnClassName + ' input');
		var rows = $('.' + rowClassName + ' input');
		var isCurrentlyACollision = false;
		for (var i = 0; i < 9; i++) {
			// both columns and rows will always have 9 elements
			var tempColumnBox = $(columns[i]);
			var tempRowBox = $(rows[i]);
			if (tempColumnBox.val() == number) {
				tempColumnBox.addClass('collision');
				numberCollisionBoxes.push(tempColumnBox);
				isCurrentlyACollision = true;
			}

			if (tempRowBox.val() == number) {
				tempRowBox.addClass('collision');
				numberCollisionBoxes.push(tempRowBox);
				isCurrentlyACollision = true;
			}
		}
		// TODO check local grid for duplicate num

		if (isCurrentlyACollision) {
			inputElement.addClass('collision');
			numberCollisionBoxes.push(inputElement);
		}
	}

	$('table').click(function (event) {
		var newClickedBox = $(event.target);
		if (newClickedBox.hasClass('variableNum')) {
			event.stopPropagation();
			if (newClickedBox.is(clickedBox)) {
				resetClickedBox();
			} else {
				setClickedBox(newClickedBox);
			}
		}
	});

	$(document).click(function (event) {
		resetClickedBox();
	});

	$('input').keydown(function (event) {	
		var target = $(event.target);
		if (target.hasClass('variableNum')) {
			// prevent defalt on everything but backspace/delete so we can dictate what goes into the input field
			if (event.keyCode !== 8 && event.keyCode !== 46) {
				event.preventDefault();
			}

			// pressedKey will either be a number or NaN here
			var pressedKey = Number(String.fromCharCode(event.keyCode));
			if (pressedKey > 0) {
				updateNumberCollisionBoxes(clickedBox, pressedKey);
				clickedBox.val(String.fromCharCode(event.keyCode));
			}
		} else {
			event.preventDefault();
		}
	});
});