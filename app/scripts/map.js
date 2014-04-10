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
            document.querySelector('#gmaps .overlay').setAttribute('data-ping', 'true');
            var ping = new Audio('audio/sonar.wav');
            ping.play();
            radar.fadeOut(500, function(){
                removeOverlay();
                addMarkers();
                infoBar.fadeIn(1000);
            });
    });

    addOverlay();
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

function addOverlay(){
    // responsejs.com/labs/dimensions/
    var matchMedia = window.matchMedia || window.msMatchMedia;

    var viewportH = (function(win, docElem, mM) {
        var client = docElem.clientHeight,
            inner = win.innerHeight;
        if (mM && client < inner && true === mM('(min-height:' + inner + 'px)').matches){
            return win.innerHeight;
        }
        else{
            return docElem.clientHeight;
        }
    }(window, document.documentElement, matchMedia));


    var viewportW = (function(win, docElem, mM) {
        var client = docElem.clientWidth,
            inner = win.innerWidth;
        if (mM && client < inner && true === mM('(min-width:' + inner + 'px)').matches){
            return win.innerWidth;
        }
        else{
            return docElem.clientWidth;
        }
    }(window, document.documentElement, matchMedia));

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var svgNS = svg.namespaceURI;
    var rect = document.createElementNS(svgNS,'rect');
    rect.setAttribute('x', 0);
    rect.setAttribute('y', 0);
    rect.setAttribute('width', viewportW);
    rect.setAttribute('height', viewportH);
    rect.setAttribute('fill','black');
    rect.setAttribute('fill-opacity','0.5');
    svg.appendChild(rect);
    document.querySelector('#gmaps .overlay').appendChild(svg);

}

function removeOverlay(){
    $('#gmaps .overlay').remove();
}

function sonarListener(){
    var radar = document.querySelector('#gmaps .radar');
    radar.addEventListener('touchstart', function(e){
        e.preventDefault();
    }, false);
    radar.addEventListener('touchend', function(e){
        e.preventDefault();
        document.querySelector('#gmaps .overlay').setAttribute('data-ping', 'true');
    }, false);
}