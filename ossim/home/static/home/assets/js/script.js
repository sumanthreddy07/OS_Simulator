$(function() {

	setInterval(function() {
		var time = new Date(),
			hours = time.getHours(),
			minutes = time.getMinutes();

		if (minutes < 10 ) {
			minutes = "0" + minutes;
		}

		if (hours >= 12) {
			hours = hours - 12;
			$('#am-pm').text('PM');
		}

		else {
			$('#am-pm').text('AM');
		}


		$('#time').text(hours + ':' + minutes);

	},1000);

	
	var height = $(window).height() - $('.navigationbar').height();
	$('.luncher').height(1000);
	$('.desktop').height(1000);


});


//////////////
