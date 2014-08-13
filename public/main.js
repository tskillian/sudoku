$(document).ready(function() {
	var clickedBox = null;

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

	$('table').click(function (event) {
		event.stopPropagation();
		var newClickedBox = $(event.target);
		if (newClickedBox.is(clickedBox)) {
			resetClickedBox();
		} else {
			setClickedBox(newClickedBox);
		}
	});

	$(document).click(function (event) {
		resetClickedBox();
	});

	$(document).keydown(function (event) {
		// pressedKey will either be a number or NaN here
		var pressedKey = Number(String.fromCharCode(event.keyCode));

		// to stop backspaces/deletes from navigating the browser
		if (event.keyCode === 8 || event.keyCode === 46) {
			event.preventDefault();
			pressedKey = 'delete';
		}
		
		if (clickedBox && (pressedKey > 0 || pressedKey === 'delete')) {
			clickedBox.text(String.fromCharCode(event.which));
		}
	});
});