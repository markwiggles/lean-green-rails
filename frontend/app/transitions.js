export default function() {

	var durationTime = 2000;

	this.transition(
		this.matchSelector('.navigation-content'),
		this.use('crossFade')
	);
}
