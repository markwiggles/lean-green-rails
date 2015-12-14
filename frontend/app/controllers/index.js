import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingModal: false,
  actions: {
    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    }
  },
	init: function() {
		this.toggleProperty('isShowingModal');
		setTimeout(function() {
			$('.ember-modal-dialog').css({'right':'2%'});
		},2000)

	}
});

// export default Ember.Controller.extend({
//   actions: {
//     toggleHello() {
//       this.toggleProperty('showHello');
//     }
//   }
//
// });
