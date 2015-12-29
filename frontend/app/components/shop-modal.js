import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import modalLayout from '../templates/components/shop-modal'

export default ModalDialog.extend({
	containerClassNames: "shop-modal",
	targetAttachment: "none",
	layout: modalLayout,
	isShowingBody: true, // allow the modal to be created (offscreen)
	actions: {
		toggleBody() { //toggles whether the modal is seen
			this.toggleProperty('isShowingBody');
		}
	},
	// didInsertElement: function() {
	// 	setTimeout(function() { // after a time, animate the modal onto screen
	// 		$('.app-modal').css({
	// 			'right': '2%'
	// 		});
	// 	}, 2000)
	// }
});
