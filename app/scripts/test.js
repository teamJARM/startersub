'use strict';
/* global google */
$(document).on('ready', function(){
    navigator.geolocation.getCurrentPosition(initialize);
});

var map,
    root = window.location,
    typeImage = '.png';

function initialize(location) {
    var container     = document.getElementById('map-canvas'),
        currLocation  = new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
        mapOptions    = {
            center: currLocation,
            zoom: 12,
            mapType: google.maps.MapTypeId.ROADMAP,
            styles:[
                {
                    stylers:[{hue: '#2796b8'}]
                },{
                    featureType: 'road',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                },{
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [
                        {saturation: -40},
                        {lightness: 40}
                    ]
                }
            ]
        };

    map = new google.maps.Map(container, mapOptions);
   	addMarkers();
}

function addMarkers() {
    var iconBase      = root + 'images/markers/',
    	items = [];

    $.getJSON(root + 'scripts/data.json', function(data) {
		$.each( data.Organisations, function(i, marker) {
			$('#map_canvas').gmap('addMarker', { 
				'position': new google.maps.LatLng(marker.latitude, marker.longitude), 
				'bounds': true 
			}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', { 'content': marker.content }, this);
			});
		});
	});

    console.log(items);

   // markers.push(incubator, startup, accelerator);

    //addInfo(markers);
}