
import { target } from 'liquid-tether';

export default function() {

	// this.toRoute(['index', 'about', 'training', 'vegucated']),
	// 	this.use('toLeft'),
	// 	this.reverse('toRight')

		this.transition(
			target('hello-world'),
			this.use('tether', ['to-up', {
				duration: 1500,
				easing: 'easeInOutQuint'
			}])
		);


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
