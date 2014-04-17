'use strict';
/* global google */
$(document).on('ready', function(){
    navigator.geolocation.getCurrentPosition(initialize);

});

var map,
    root          = window.location.origin,
    container     = document.getElementById('map-canvas'),
    currentPoint  = 0,
    gmaps         = $('#gmaps'),
    radar         = gmaps.find('.radar'),
    legendaElem   = gmaps.find('.zie').find('.information ul'),
    infoBar       = $('#info-bar'),
    imageBase     = root + '/images/',
    markerBase    = imageBase + 'markers/',
    animMarker    = '';

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
        var id = 0;

        for (var i = 0; i < typeOrg.length; i++) {

            var myIcon = new google.maps.MarkerImage(markerBase + typeOrg[i].image, null, null, null, new google.maps.Size(22,40));

            $.each(typeOrg[i].gegevens , function(key, value) {
                var pointer = new MarkerWithLabel({
                        position: new google.maps.LatLng(value.lat , value.lng),
                        icon: myIcon,
                        map: map,
                        labelContent: id + 1,
                        labelAnchor: new google.maps.Point(6, 33),
                        labelClass: "labels", // the CSS class for the label
                        labelInBackground: false,
                        labelVisible: true,
                        id: id,
                        title: value.title,
                        text: value.content,
                        extra     : value.extra,
                        match     : value.match,
                        price     : value.price,
                        rank      : value.rank,
                        stemmen   : value.stemmen,
                        parking   : value.parking,
                        ov        : value.ov,
                        horeca    : value.horeca,
                        url: value.url || '',
                        logo: value.logo || '',
                        draggable: false,
                        optimized: true,
                        visible: true,
                        animation: google.maps.Animation.DROP
                    });
                id++;
                pointers.push(pointer);
            });
        }

        if(pointers.length){
            markerInfo(pointers);
            google.maps.event.trigger(pointers[currentPoint], 'click');
        }
    });
}

function legenda(point){
    var type    = point.type,
        image   = markerBase + point.image;

        legendaElem.append('<li><img src="' + image + '" alt="' + type +'"><span>' + type + '</span></li>');
}

function markerInfo(p){
    var markers     = p,
        container    = $('#info-bar'),
        next         = container.find('.next'),
        prev         = container.find('.previous');

    $.each(markers, function(i, val){
        var marker  = val,
            pos     = i;

        google.maps.event.addListener(marker, 'click', function() {
            var $this = this;
            currentPoint = $this.id;

            fullInfoBottom($this, markers);
            toggleBounce($this, markers);

        });
    });

    next.on('click', function(){
        currentPoint++;
        (currentPoint > markers.length - 1)? currentPoint = 0: currentPoint = currentPoint;

        google.maps.event.trigger(markers[currentPoint], 'click');
    });

    prev.on('click', function(){
        currentPoint--;
        (currentPoint < 0)? currentPoint = markers.length - 1: currentPoint = currentPoint;

        google.maps.event.trigger(markers[currentPoint], 'click');
    });
}

function toggleBounce(e, markers) {
        for (var i = 0; i < markers.length; i++) {
            if(i != e.id){
                if (markers[i].getAnimation() != null) {
                    markers[i].setAnimation(null);
                }
            }else{
                  markers[i].setAnimation(google.maps.Animation.BOUNCE);
            }
        };
}

function fullInfoBottom(e, markers) {
        var target       = e,
            currentPoint = target.id,
            match        = target.match,
            logo         = target.logo,
            name         = target.title,
            parking      = target.parking,
            price        = target.price,
            ov           = target.ov,
            stemmen      = target.stemmen,
            rank         = target.rank,
            horeca       = target.horeca,
            text         = target.text,
            extra        = target.extra,
            pointers     = markers,
            container    = $('#info-bar'),
            infoElem     = container.find('.info'),
            markerImg    = infoElem.children('.org-logo').find('img'),
            textElem     = infoElem.children('.text'),
            title        = textElem.find('h2'),
            allInfo      = container.find('.allinfo'),
            priceRanked  = allInfo.children('.priceranked'),
            diagrams     = allInfo.children('.diagrams'),
            rankedH2     = priceRanked.find('.ranked h2'),
            profile      = $('#profile'),
            profcontent  = profile.children('#content'),
            profServ     = profile.children('#services');

            allInfo.find('.myStat2').remove();

            markerImg.attr('src', imageBase + logo);
            title.text((currentPoint + 1) + '. ' + name);

            var dataWidth       = 7,
                dataFont        = 14,
                dataDimens      =  45;

            allInfo.children('.match').prepend("<div class='myStat2' data-dimension='65' data-text=" + match  + "%" + " data-width=" + dataWidth +" data-fontsize=" + dataFont + " data-percent='" + match + "' data-fgcolor='#2885c7' data-bgcolor='#a8daf2' ></div>");
            priceRanked.find('.price h2').text(price);

            var starIcon = rankedH2.children('i.star').clone();
            rankedH2.empty().prepend(starIcon);
            rankedH2.append(rank);
            priceRanked.find('.ranked p span.stemmen').text(stemmen);
            diagrams.find('.parking').prepend("<div class='myStat2' data-dimension=" + dataDimens +" data-text='P' data-width=" + dataWidth +" data-fontsize=" + dataFont + " data-percent='" + parking + "' data-fgcolor='#f05151' data-bgcolor='#f59799' ></div>");
            diagrams.find('.ov').prepend("<div class='myStat2' data-dimension=" + dataDimens +" data-text='' data-width=" + dataWidth +" data-fontsize=" + dataFont + " data-percent='" + ov + "' data-icon='ov' data-icon-size='10' data-fgcolor='#a7c838' data-bgcolor='#cfe178' ></div>");
            diagrams.find('.horeca').prepend("<div class='myStat2' data-dimension=" + dataDimens +" data-text='' data-width=" + dataWidth +" data-fontsize=" + dataFont + " data-percent='" + horeca + "' data-icon='ov' data-icon-size='10' data-fgcolor='#0c71b5' data-bgcolor='#4f9ecd' ></div>");
            profcontent.find('.info h1').text(name);
            profcontent.find('.info p').text(text);
            profServ.find('.text p').text(extra);



            $('.myStat2').circliful();
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