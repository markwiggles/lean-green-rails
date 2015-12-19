export default function() {

	var durationTime = 500;

	this.transition(
		this.toRoute(['index', 'why','training','vegucated','team']),
		this.use('crossFade',{duration: durationTime})
	);

}
