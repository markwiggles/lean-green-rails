//# Custom JS for the admin area
$(document).ready(function() {

	// Get the data-attributes settings
	var delay = $('#myModal').data('delay');
	var backdrop = $('#myModal').data('backdrop');
	var size = $('#myModal').data('size');
	var position = $('#myModal').data('position');

	if ($('#myModal').length) { //if modal exists on page
		if ($('#myModal .modal-title').html().trim() != '') { // if there is a modal title

			$('body').css('padding-right', ''); //removes the scrollbar on the modal body

			//Set the size of the modal
			var newClass = "";
			switch (size) {
				case 'large':
					newClass = 'modal-lg'
					break;
				case 'small':
					newClass = 'modal-sm';
					break;
			}
			$('#myModal .modal-dialog').addClass(newClass);

			//Set the position
			newCss = "";

			console.log(position, ", ", size);
			switch (position) {
				case 'top-middle':
					$('#myModal').css({
						'bottom': 'auto',
						'margin-top': '-25px'
					});
					break;
				case 'top-left':
					$('#myModal').css({
						'bottom': 'auto',
						'right': 'auto',
						'margin-top': '-25px'
					});
					break;
				case 'top-right':
					$('#myModal').css({
						'bottom': 'auto',
						'left': 'auto',
						'margin-top': '-20px'
					})
					break;
				case 'bottom-middle':
					$('#myModal').css({
						'top': 'auto',
					});
					break;
				case 'bottom-right':
					$('#myModal').css({
						'top': 'auto',
						'left':'auto'
					});
					break;
				default:

			}
			//Show the modal
			setTimeout(function() { // after a time, animate the modal onto screen
				$('#myModal').modal({
					backdrop: backdrop
				});
				$('#myModal').modal('show');
			}, delay);
		}
	}

});
