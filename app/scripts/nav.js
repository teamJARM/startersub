$(document).on('ready', function() {
	var container 	= $('#container'),
		topBar 		= container.find('#top-bar'),
		open 		= topBar.children('.open'),
		nav 		= topBar.children('.nav');


		open.on('click', function(){
			nav.slideToggle();
		});
});