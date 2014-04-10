$(document).on('ready', function() {
	var container 	= $('#container'),
		topBar 		= container.find('#top-bar'),
		open 		= topBar.children('.open'),
		nav 		= topBar.children('.nav'),
		gmapsNav	= container.find('.gmaps-nav'),
		gmapsList	= gmapsNav.children('ul').find('li');


		open.on('click', function(){
			nav.slideToggle();
		});

		gmapsList.on('click', function(e) {
			e.preventDefault();
			var $this 		= $(e.target),
				parentLi 	= $this.closest('li');

				parentLi.toggleClass('active')
						.siblings()
						.removeClass("active");

				parentLi.find('.box')
						.slideToggle(300)
						.closest('li')
						.siblings()
						.find('.box')
						.css('display', 'none');
		});

});