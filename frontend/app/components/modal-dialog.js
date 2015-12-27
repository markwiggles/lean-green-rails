import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({

	setup: function() {
		console.log('done');
	}.on('didInsertElement'),

	// didInsertElement: function() {
	// 	console.log('done');
	// 	setTimeout(function() {
	//
	// 	}, 3000); // milliseconds
	// },
	isShowingModal: false,
	toggleModal: function() {
		this.toggleProperty('isShowingModal');
	}

});
