import Ember from 'ember';

export default Ember.Route.extend({

	fetch_cart: function() {
    return "STUFF HERE";
    // $.ajax({
    //   url: Spree.pathFor("cart_link"),
    //   success: function(data) {
    //     return $('#link-to-cart').html(data);
    //   }
    // });
  }.property(),

	heythere: 'hey'

});
