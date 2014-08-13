$(document).ready(function() {
	var clickedBox = null;

	$('table').click(function(event) {
		var tempClickedBox = $(event.target);
		if (clickedBox) {
			// if the click is on the currently selected box, reset clickedBox
			if (tempClickedBox.is(clickedBox)) {
				clickedBox.removeClass('clicked');
				clickedBox = null;
			} else { // otherwise, change clicked element
				clickedBox.removeClass('clicked');
				tempClickedBox.addClass('clicked');
				clickedBox = tempClickedBox;
			}
		} else {
			tempClickedBox.addClass('clicked');
			clickedBox = tempClickedBox;
		}
	});

	$(document).keydown(function(event) {
		// to stop backspaces/deletes from navigating the browser
		if (event.keyCode === 8 || event.keyCode === 46) { event.preventDefault(); }

		// pressedKey will either be a number or NaN
		var pressedKey = Number(String.fromCharCode(event.keyCode));
		
		if (clickedBox && pressedKey !== 0) {
			clickedBox.text(String.fromCharCode(event.which));
		};
	})
});