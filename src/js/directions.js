//array
var locations = [{}]; var selectedContent = ''; var zm = 5; var initMap = function () {
  var map, directionsService, directionsDisplay, autoSrc, autoDest, pinA, pinB, markerA = new google.maps.MarkerImage('images/end.png', new google.maps.Size(36, 34), new google.maps.Point(0, 0), new google.maps.Point(18, 17)), markerB = new google.maps.MarkerImage('images/pin.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),// Caching the Selectors		
    $Selectors = { mapCanvas: jQuery('#mapCanvas')[0], dirPanel: jQuery('#panel'), dirInputs: jQuery('.directionInputs'), dirSrc: jQuery('#dirSource'), dirDst: jQuery('#dirDestination'), getDirBtn: jQuery('#getDirections'), dirSteps: jQuery('#directionSteps'), paneToggle: jQuery('#paneToggle'), useGPSBtn: jQuery('#useGPS'), paneResetBtn: jQuery('#paneReset') };//set up defaul
  function setMarkers(map, locations) {
    var marker, i, j;//change icon
    var companyImage = new google.maps.MarkerImage('images/pin.png', new google.maps.Size(36, 34), new google.maps.Point(0, 0)); $.each(locations, function (index, city) {
      var cityName = '<div class="cityName" data-city=parent' + index + '><span class="txt-city">' + city['city'] + '<span class="sumCount">(0)</span></span></div>'; $('.directionAdrress').append(cityName);// var index = ''
      $.each(city['child'], function (k, ward) {
        var wardName = '<div class="wardName" data-ward =parent' + index + '_parentWard' + k + '><span class="txt-ward">' + ward['ward'] + '</span><ul class="directionAdrress__item"></ul></div>'; $('.cityName[data-city=parent' + index + ']').append(wardName); $.each(ward['child'], function (kloc, loc) {// console.log("--------------------------" );
          // console.log("_____ Tên: " + loc['name'] );
          // console.log("_____ lat: " + loc['lat'] );
          // console.log("_____ long: " + loc['long'] );
          // console.log("_____ add: " + loc['add'] );
          var name = loc['name']; var lat = loc['lat']; var long = loc['long']; var add = loc['add']; var phone = loc['phone']; var path = loc['path']; var status = loc['status']; latlngset = new google.maps.LatLng(lat, long); var marker = new google.maps.Marker({ map: map, title: name, position: latlngset, icon: companyImage }); map.setCenter(marker.getPosition()); var content = '<div class=\'contentMap\'><h3 class=\'m-name\'>' + name + '</h3>' + '<div class=\'add\'>' + add + '</div><div class=\'phone\'>' + phone + '</div><div class=\'path\'>' + path + '</div><div class=\'status\'>' + status + '</div></div>'; var infowindow = new google.maps.InfoWindow; google.maps.event.addListener(marker, 'click', function (marker, content, infowindow) { return function () { infowindow.setContent(content); infowindow.open(map, marker) } }(marker, content, infowindow)); var item = '<li data-lat="' + lat + '" data-lng="' + long + '" data-content="' + content + '"><p class="txt-name">' + add + '</p><p class="txt-phone">' + phone + '</p></li>'; $('.wardName[data-ward=parent' + index + '_parentWard' + k + '] ul').append(item); var count = $('.cityName[data-city=parent' + index + '] li').length; $('.cityName[data-city=parent' + index + ']').find('.sumCount').text('(' + count + ')')
        })
      })
    })
  } function autoCompleteSetup() {
    autoSrc = new google.maps.places.Autocomplete($Selectors.dirSrc[0]);//autoDest ="Vincom Center Đồng Khởi, tầng B1, 72 Lê Thánh Tôn";
    //autoDest = new google.maps.places.Autocomplete($Selectors.dirDst[0]);
    //autoDest = new google.maps.places.Autocomplete($Selectors.dirDst[0]);
    autoSrc.addListener('place_changed', function () {
      var place = autoSrc.getPlace();//check case choose pin B
      var lat = parseFloat($('.directionAdrress__item').find('li.active').data('lat')), lng = parseFloat($('.directionAdrress__item').find('li.active').data('lng')), src = $Selectors.dirSrc.val(); dst = lat + ',' + lng; directionsRender(src, dst);//console.log(place.formatted_address);
    });// autoDest.addListener('place_changed', function() {
    //   	var place = autoDest.getPlace();
    //     console.log(place.formatted_address);
    // });
  }// autoCompleteSetup Ends
  function directionsSetup() { directionsService = new google.maps.DirectionsService; directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: { strokeColor: '#000000' } }); directionsDisplay.setPanel($Selectors.dirSteps[0]) }// direstionsSetup Ends
  function mapSetup() {
    map = new google.maps.Map($Selectors.mapCanvas, { zoom: zm, center: new google.maps.LatLng(10.770906, 106.671703), disableDefaultUI: true, styles: [{ 'elementType': 'geometry', 'stylers': [{ 'color': '#f5f5f5' }] }, { 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#616161' }] }, { 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#f5f5f5' }] }, { 'featureType': 'administrative.country', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#f5faff' }] }, { 'featureType': 'administrative.country', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#666666' }, { 'weight': 1.5 }] }, { 'featureType': 'administrative.land_parcel', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#bdbdbd' }] }, { 'featureType': 'administrative.neighborhood', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#000080' }] }, { 'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{ 'color': '#eeeeee' }] }, { 'featureType': 'poi', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#757575' }] }, { 'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{ 'color': '#e5e5e5' }] }, { 'featureType': 'poi.park', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#9e9e9e' }] }, { 'featureType': 'road', 'elementType': 'geometry', 'stylers': [{ 'color': '#ffffff' }] }, { 'featureType': 'road.arterial', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ffffff' }] }, { 'featureType': 'road.arterial', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#ffffff' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#757575' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{ 'color': '#dadada' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.highway', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#616161' }] }, { 'featureType': 'road.local', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#9e9e9e' }] }, { 'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{ 'color': '#e5e5e5' }] }, { 'featureType': 'transit.station', 'elementType': 'geometry', 'stylers': [{ 'color': '#eeeeee' }] }, { 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#c9c9c9' }] }, { 'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#e4ebfa' }] }, { 'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#9e9e9e' }] }], mapTypeControl: false, mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DEFAULT, position: google.maps.ControlPosition.TOP_RIGHT }, panControl: true, panControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP }, zoomControl: false, zoomControlOptions: { style: google.maps.ZoomControlStyle.LARGE, position: google.maps.ControlPosition.RIGHT_TOP }, scaleControl: true, streetViewControl: true, overviewMapControl: true, mapTypeId: google.maps.MapTypeId.ROADMAP }); autoCompleteSetup(); directionsSetup(); setMarkers(map, locations);// }
    //trafficSetup();
  }// mapSetup Ends 
  function directionsRender(source, destination) {
    $Selectors.dirSteps.find('.msg').hide(); directionsDisplay.setMap(map); var request = { origin: source, destination: destination, provideRouteAlternatives: false, travelMode: google.maps.DirectionsTravelMode.DRIVING }; directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response); var _route = response.routes[0].legs[0]; pinA = new google.maps.Marker({ position: _route.start_location, map: map, icon: markerA }), pinB = new google.maps.Marker({ position: _route.end_location, map: map, icon: markerB }); var infowindow = new google.maps.InfoWindow({ content: selectedContent }); infowindow.open(map, pinB);// google.maps.event.addListener(pinA, 'click', function () {
        //     infowindow.open(map, pinA);
        // });
      }
    })
  }// directionsRender Ends
  function fetchAddress(p) {
    var Position = new google.maps.LatLng(p.coords.latitude, p.coords.longitude), Locater = new google.maps.Geocoder; Locater.geocode({ 'latLng': Position }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var _r = results[0]; $Selectors.dirSrc.val(_r.formatted_address);//check case choose pin B
        var lat = parseFloat($('.directionAdrress__item').find('li.active').data('lat')), lng = parseFloat($('.directionAdrress__item').find('li.active').data('lng')), src = $Selectors.dirSrc.val(); dst = lat + ',' + lng; directionsRender(src, dst)
      }
    })
  }// fetchAddress Ends
  function invokeEvents() {
    $('.directionAdrress__item li').click(function (e) { e.preventDefault(); var lat = parseFloat($(this).data('lat')), lng = parseFloat($(this).data('lng')), elm = $(this).text(); selectedContent = $(this).data('content'); $('#dirDestinationText').text(elm); $('#dirDestination').val(lat + ',' + lng); map.setCenter({ lat: lat, lng: lng }); map.setZoom(12) }); $('.directionAdrress__item li').on('click', function (e) {
      e.preventDefault(); $('.directionAdrress__item li').removeClass('active'); $(this).addClass('active'); var src = $Selectors.dirSrc.val(), dst = $Selectors.dirDst.val();//alert(dst);
      directionsRender(src, dst)
    });// $Selectors.dirSrc.change(function(){
    //     var src=$Selectors.dirSrc.val();
    //     var lat = parseFloat($('.directionAdrress__item').find('li.active').data("lat")),
    //         lng = parseFloat($('.directionAdrress__item').find('li.active').data("lng"));
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             var _r = results[0];
    //             $Selectors.dirSrc.val(_r.formatted_address);
    //         }
    //     console.log(place.formatted_address);
    //     console.log('lng:'+lng,'lat:' + lat)
    // });
    // Reset Btn
    // $Selectors.paneResetBtn.on('click', function(e) {
    //     $Selectors.dirSteps.html('');
    //     $Selectors.dirSrc.val('');
    //     $Selectors.dirDst.val('');
    //     if (pinA) pinA.setMap(null);
    //     if (pinB) pinB.setMap(null);
    //     directionsDisplay.setMap(null);
    // });
    $Selectors.paneToggle.on('click', function (e) { $(this).toggleClass('active'); $Selectors.dirPanel.toggleClass('active') })
  }//invokeEvents Ends 
  $Selectors.useGPSBtn.on('click', function (e) { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(function (position) { fetchAddress(position) }) } });// initialize();
  function showAdd() {
    var el = $('.txt-city'); el.each(function () {
      $(this).on('click', function (e) {
        e.preventDefault(); var elParent = $(this).parents('.cityName');// $('.cityName').find('.wardName').slideUp();
        // $('.cityName').removeClass('active');
        if (elParent.hasClass('active')) { elParent.removeClass('active'); elParent.find('.wardName').stop().slideUp() } else { elParent.addClass('active'); elParent.find('.wardName').stop().slideDown() }
      })
    }); var elCity = $('.txt-ward'); elCity.each(function (e) {
      $(this).click(function (e) {
        var elP = $(this).parents('.wardName'); e.preventDefault();// $('.wardName').removeClass('active');
        // $('.directionAdrress__item').stop().slideUp();
        if (elP.hasClass('active')) { elP.removeClass('active'); $(this).next().stop().slideUp() } else { $(this).parents('.wardName').addClass('active'); $(this).next().stop().slideDown() }
      })
    })
  } mapSetup(); invokeEvents(); showAdd()
};
