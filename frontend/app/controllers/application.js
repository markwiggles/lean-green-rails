import Ember from 'ember';

export default Ember.Controller.extend({
	fetch_cart: function() {
    $.ajax({
      url: Spree.pathFor("cart_link"),
      success: function(data) {
        return $('#link-to-cart').html(data);
      }
    });
  }.property()
});
