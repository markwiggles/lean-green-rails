import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScrollMixin, {

	isShowingModal: false,
  actions: {
    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    }
  },
	activate: function() {
		console.log('activate');
		this.toggleProperty('isShowingModal');
		setTimeout(function() {
			$('.ember-modal-dialog').css({'right':'2%'});
		},2000)

	}

});
