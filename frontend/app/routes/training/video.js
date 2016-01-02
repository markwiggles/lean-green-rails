import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// simulate slow moving data
		// return new Ember.RSVP.Promise(function(resolve){
    //     setTimeout(function(){
    //         var model =  'stuff here';
    //         resolve(model);
    //     }, 3000); // 3 second delay
    // });
	}
});
