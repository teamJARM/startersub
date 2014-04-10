'use strict';
/* global google */
$(document).on('ready', function(){
    navigator.geolocation.getCurrentPosition(initialize);
});

var map,
    root          = window.location.origin,
    container     = document.getElementById('map-canvas'),
    gmaps         = $('#gmaps'),
    radar         = gmaps.find('.radar'),
    legendaElem   = gmaps.find('.gmaps-nav ul li').children('.box').find('ul'),
    infoBar       = $('#info-bar'),
    markerBase    = root + '/images/markers/';

function initialize(location) {
    var currLocation  = new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
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
   var  jsonUrl       = root + '/scripts/data.json',
        typeOrg       = [],
        pointers      = [];

    $.getJSON(jsonUrl, function(data) {
        $.each(data , function(key, value) {
            typeOrg.push(value);
            legenda(value);
        });
    }).done(function() {
        for (var i = 0; i < typeOrg.length; i++) {
            $.each(typeOrg[i].gegevens , function(key, value) {
                var pointer = new google.maps.Marker({
                        position: new google.maps.LatLng(value.lat , value.lng),
                        icon: markerBase + typeOrg[i].image,
                        map: map,
                        title: value.title,
                        text: value.content,
                        url: value.url || '',
                        logo: value.logo || '',
                        draggable: false,
                        optimized: true,
                        visible: true,
                        animation: google.maps.Animation.DROP
                    });

                pointers.push(pointer);
            });
        }

        if(pointers.length){
            markerInfo(pointers);
        }
    });
}

function legenda(point){
    var type    = point.type,
        image   = markerBase + point.image;

        legendaElem.append('<li><img src="' + image + '" alt="' + type +'"><span>' + type + '</span></li>');
}

function markerInfo(p){
    var markers     = p;

    $.each(markers, function(i, val){
        var marker  = val,
            url     = marker.url,
            name    = marker.title;

        var infowindow = new google.maps.InfoWindow({
            content: name + ' ' +  url
        });

        google.maps.event.addListener(marker, 'click', function() {
            var $this = this;
            //infowindow.open(map, marker);
            fullInfoBottom($this);
        });
    });
}

function fullInfoBottom(e) {
        var target      = e,
            container   = $('#info-bar').find('.info'),
            markerImg   = container.children('.org-logo').find('img'),
            infoElem    = container.children('.text'),
            title       = infoElem.find('h2 a'),
            text        = infoElem.find('p');

            markerImg.attr('src', target.icon);
            title.text(target.title);
            text.text(target.text);
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