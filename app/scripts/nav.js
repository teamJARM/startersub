$(document).on('ready', function() {
	var container 	= $('#container'),
		topBar 		= container.find('#top-bar'),
		open 		= topBar.children('.open'),
		nav 		= topBar.children('.nav'),
		gmapsNav	= container.find('.gmaps-nav'),
		gmapsList	= gmapsNav.children('ul').find('li'),
		mapsElem 	= $('#map-canvas'),
		infoBar 	= $('#info-bar'),
		slideBtn	= infoBar.find('.slidebtn'),
		gmaps       = $('#gmaps'),
		mapsDisplay	= true,
		navActive	= false;

		open.on('click', function(){
			nav.slideToggle();
		});

			gmapsList.on('click', function(e) {
				e.preventDefault();
				var $this 		= $(e.target),
					box,
					parentLi 	= $this.closest('li');

					parentLi.toggleClass('active')
							.siblings()
							.removeClass('active');

					if((parentLi).hasClass('active') || (parentLi).siblings().hasClass('active')){
						navActive = true;
					}else {
						navActive = false;
					}

					clickedNav(parentLi);
					showHideMaps(navActive, mapsElem);
			});

			slideBtn.on('click', function(){
				gmaps.slideToggle(time);
				infoBar.find('.allinfo').slideToggle();
			});
});

var time = 400;

function clickedNav(p){
	var box;

	if(p.hasClass('wzi')){box = $('#gmaps .zie').slideToggle(time);}
	if(p.hasClass('hzw')){box = $('#gmaps .hoe').slideToggle(time);}
	if(p.hasClass('wzw')){box = $('#gmaps .wat').slideToggle(time);}

	box.siblings('.box').css('display', 'none');
}

function showHideMaps(navAct, mapsE){
	var infoBar = $('#info-bar');

	if(navAct){
		mapsE.slideUp(time);
		infoBar.hide();
	}else{
		mapsE.slideDown(time);
		infoBar.show();
	}
}