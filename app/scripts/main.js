'use strict';
/* global google */
$(document).on('ready', function(){
    navigator.geolocation.getCurrentPosition(initialize);
});

var map,
    root = window.location.origin,
    typeImage = '.png';


function initialize(location) {
    var container     = document.getElementById('map-canvas'),
        radar         = $('#gmaps').find('.radar'),
        infoBar       = $('#info-bar'),
        //infoDiv       = document.getElementById('info'),
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
    //map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(infoDiv);

    radar.on('click', function(){
            radar.fadeOut(500, function(){
                addMarkers();
                infoBar.fadeIn(1000);
            });
    });

}

function addMarkers() {

    var iconBase      = root + '/images/markers/';

    var markers = [];

    var incubator = new google.maps.Marker({
        position: new google.maps.LatLng(51.924655, 4.484926),
        icon: iconBase + 'incubator' + typeImage,
        map: map,
        title: 'Creative Factory',
        text: 'Hét verzamelpand voor jong, creatieve ondernemers in Rotterdam',
        url: 'http://www.creativefactory.nl',
        logo: '',
        draggable: false,
        optimized: false,
        visible: true,
        animation: google.maps.Animation.DROP
    });

    var startup = new google.maps.Marker({
        position: new google.maps.LatLng(51.912981, 4.466759),
        icon: iconBase + 'startup' + typeImage,
        map: map,
        title: 'Hogeschool Rotterdam',
        url: 'http://www.hro.nl/',
        text: ' Het onderwijs op Hogeschool Rotterdam is nauw verweven met de stedelijke en regionale ontwikkelingen in de regio Rotterdam. ',
        logo: '',
        draggable: false,
        optimized: false,
        visible: true,
        animation: google.maps.Animation.DROP
    });

    var accelerator = new google.maps.Marker({
        position: new google.maps.LatLng(51.906366, 4.459603),
        icon: iconBase + 'accelerator' + typeImage,
        map: map,
        title: 'Gemeente Rotterdam',
        draggable: true,
        optimized: false,
        visible: true,
        animation: google.maps.Animation.DROP
    });

    markers.push(incubator, startup, accelerator);

    addInfo(markers);
}

function addInfo(m){
    var markers = m;

    $.each(markers, function(i, val){
        var marker = val,
            url    = '';

        if(marker.url){
            url    = marker.url;
        }

        var infowindow = new google.maps.InfoWindow({
            content: marker.title + ' ' +  url
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    });
}