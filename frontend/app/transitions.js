export default function() {

		this.toRoute(['index', 'about', 'training', 'vegucated'] ),
		this.use('toLeft'),
		this.reverse('toRight')


	// this.transition(
	//   this.hasClass('checkbox'),
	//
	//   // this makes our rule apply when the liquid-if transitions to the
	//   // true state.
	//   // this.toValue(true),
	//   this.use('toRight', 1500),
	//
	//   // which means we can also apply a reverse rule for transitions to
	//   // the false state.
	//   this.reverse('toLeft', 1500)
	// );

	// this.transition(
	// 	this.matchSelector('.shopping-content'),
	// 	this.use('toRight')
	// );


	// this.transition(
	//   this.fromRoute('spree.products.show'),
	//   this.toRoute('spree.cart'),
	//   this.use('toLeft'),
	//   this.reverse('toRight')
	// );


}
