$(document).ready(function() {
	var clickedBox = null;
	// collisionMap is to hold any boxes where the numbers are not possible (i.e. two 9s in a row)
	var collisionMap = {};
	var idToNumCollisionsMap = {};

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

	function updateInfo() {
		var numCollisions = Object.keys(collisionMap).length;
		var numFilledInBoxes = 0;
		$('input').each(function (index, element) {
			if ($(element).val()) { numFilledInBoxes += 1; }
		});
		if (numCollisions > 0) {
			console.log('collisions')
			$('.info').text('There are currently number collisions');
		} else if (numCollisions === 0 && numFilledInBoxes === 81) {
			$('.info').text('Congratulations! You have successfully completed the puzzle!');
		} else {
			$('.info').text('');
		}
	}

	function getCollisions(inputElement, number) {
		var parent = inputElement.parent();
		var parentClasses = parent.attr('class').split(' '); // first class is column, second is subgrid
		var rowClassName = parent.parent().attr('class');
		var columns = $('.' + parentClasses[0] + ' input');
		var rows = $('.' + rowClassName + ' input');
		var subgrid = $('.' + parentClasses[1] + ' input');
		var inputElementUniqueId = parent.attr('id');
		var collisions = [];
		var collisionIdSet = {}; // to ensure there are never duplicate collision elements
		for (var i = 0; i < 9; i++) {
			var tempColumnBox = $(columns[i]);
			var tempRowBox = $(rows[i]);
			var tempSubgridBox = $(subgrid[i]);
			if (tempColumnBox.val() == number && !tempColumnBox.is(inputElement)) {
				var tempId = tempColumnBox.parent().attr('id');
				
				if (!(tempId in collisionIdSet)) {
					tempColumnBox.addClass('collision');
					collisions.push(tempColumnBox);
					collisionIdSet[tempId] = true; // true is arbitrary
				}
			}

			if (tempRowBox.val() == number && !tempRowBox.is(inputElement)) {
				var tempId = tempRowBox.parent().attr('id');
				if (!(tempId in collisionIdSet)) {
					tempRowBox.addClass('collision');
					collisions.push(tempRowBox);
					collisionIdSet[tempId] = true; // true is arbitrary
				}
			}

			if (tempSubgridBox.val() == number && !tempSubgridBox.is(inputElement)) {
				var tempId = tempSubgridBox.parent().attr('id');
				if (!(tempId in collisionIdSet)) {
					tempSubgridBox.addClass('collision');
					collisions.push(tempSubgridBox);
					collisionIdSet[tempId] = true; // true is arbitrary
				}
			}
		}

		return collisions;
	}

	function updateNumberCollisionBoxes(inputElement, number) {
		var id = inputElement.parent().attr('id');
		// if there are collisions for this element, clear them
		if (id in collisionMap) {
			var collisionIdsToClear = Object.keys(collisionMap[id]);
			for (var i = 0; i < collisionIdsToClear.length; i++) {
				var collisionElementId = collisionIdsToClear[i];
				collisionElement = collisionMap[id][collisionElementId];
				idToNumCollisionsMap[collisionElementId] -= 1;
				// only remove collision class if collision element if its number of collisions is 0
				if (idToNumCollisionsMap[collisionElementId] === 0) {
					collisionElement.removeClass('collision');
				}
				
			}
			delete collisionMap[id];
			$('#' + id + ' input').removeClass('collision');
		}
		
		var collisions = getCollisions(inputElement, number);
		idToNumCollisionsMap[id] = collisions.length;

		if (collisions.length > 0) {
			collisionMap[id] = {}; // this obj will be a set of collisions
			inputElement.addClass('collision');
		}

		for (var i = 0; i < collisions.length; i++) {
			var tempId = collisions[i].parent().attr('id');
			collisionMap[id][tempId] = collisions[i];
			if (!(tempId in idToNumCollisionsMap)) { idToNumCollisionsMap[tempId] = 0; }
			idToNumCollisionsMap[tempId] += 1;
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
		if (target.hasClass('variableNum') && clickedBox) {
			// prevent defalt on everything but backspace/delete so we can dictate what goes into the input field
			if (event.keyCode !== 8 && event.keyCode !== 46) {
				event.preventDefault();
			} else {
				// still need to update collision boxes if the user removes a number with backspace/delete
				updateNumberCollisionBoxes(clickedBox, null);
				updateInfo();
			}

			// pressedKey will either be a number or NaN here
			var pressedKey = Number(String.fromCharCode(event.keyCode));
			if (pressedKey > 0) {
				updateNumberCollisionBoxes(clickedBox, pressedKey);
				clickedBox.val(String.fromCharCode(event.keyCode));
				updateInfo();
			}
		} else {
			event.preventDefault();
		}
	});
});