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

    addMarkers();
}

function addMarkers() {
    var iconBase      = root + 'images/markers/';
    var icons         = {
        incubators: {
            point: new google.maps.LatLng(51.924655, 4.484926),
            icon: iconBase + 'incubator' + typeImage
        },
        startups: {
            point: new google.maps.LatLng(51.912981, 4.466759),
            icon: iconBase + 'startup' + typeImage
        },
        accelerators: {
            point: new google.maps.LatLng(51.906366, 4.459603),
            icon: iconBase + 'accelerator' + typeImage
        }
    };

    var markers = [];

    var incubator = new google.maps.Marker({
        position: icons.incubators.point,
        icon: icons.incubators.icon,
        map: map,
        title: 'Een incubator',
        draggable: false,
        optimized: false,
        visible: true
    });

    var startup = new google.maps.Marker({
        position: icons.startups.point,
        icon: icons.startups.icon,
        map: map,
        title: 'Een startup',
        draggable: false,
        optimized: false,
        visible: true
    });

    var accelerator = new google.maps.Marker({
        position: icons.accelerators.point,
        icon: icons.accelerators.icon,
        map: map,
        title: 'Een accelerator',
        draggable: true,
        optimized: false,
        visible: true,
        url: 'http://www.google.com'
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