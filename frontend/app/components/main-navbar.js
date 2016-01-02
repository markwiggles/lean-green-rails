import Ember from 'ember';

export default Ember.Component.extend({

	didInsertElement: function() {
		// close menu when collapsed (after selection)
		$(".navbar-nav li a").click(function(event) {
			// check if window is small enough so dropdown is created
			var toggle = $(".navbar-toggle").is(":visible");
			if (toggle) {
				$(".navbar-collapse").removeClass('in');
			}
		});
	},
	fetch_cart: function() { //get the cart contents from Spree
		$.ajax({
			url: Spree.pathFor("cart_link"),
			success: function(data) {
				return $('#link-to-cart').html(data);
			}
		});
	}.property()

});
