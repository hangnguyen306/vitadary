//array
var locations = [{
  'city': 'ho chi minh',
  'child': [{
      'ward': 'Qu\u1EADn 1',
      'child': [{
          'name': 'Cửa hàng 1',
          'lat': '10.782482',
          'long': '106.660054',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'

      }, {
          'name': 'Cửa hàng 2',
          'lat': '21.031070',
          'long': '105.840742',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
         
      }, {
          'name': 'Cửa hàng 3',
          'lat': '10.741276',
          'long': '106.702030',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
         
      }, {
          'name': 'Cửa hàng 4',
          'lat': '10.751829',
          'long': '106.604918',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
         
      }]
  }, {
      'ward': 'Qu\u1EADn T\xE2n B\xECnh',
      'child': [{
          'name': 'Cửa hàng 5',
          'lat': '10.782482',
          'long': '106.660054',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
         
      }, {
          'name': 'Cửa hàng 6',
          'lat': '21.031070',
          'long': '105.840742',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
         
      }, {
          'name': 'Cửa hàng 7',
          'lat': '10.741276',
          'long': '106.702030',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
        
      }, {
          'name': 'Cửa hàng 8',
          'lat': '10.751829',
          'long': '106.604918',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
        
      }, {
          'name': 'Cửa hàng 9',
          'lat': '10.736210',
          'long': '106.680779',
          'add': '126 Nơ Trang Long, phường 13, quận Bình Thạnh, HCM',
          'phone': '650-658-3246',
          'email' : 'Email: info@collector.com'
        
      }]
  }]
}];
var selectedContent = '';
var zm = 5;
var initMap = function() {
  var map,
      $Selectors = {
          mapCanvas: jQuery('#mapCanvas')[0],
          dirPanel: jQuery('#panel'),
          dirInputs: jQuery('.directionInputs'),
          dirSrc: jQuery('#dirSource'),
          dirDst: jQuery('#dirDestination'),
          getDirBtn: jQuery('#getDirections'),
          dirSteps: jQuery('#directionSteps'),
          paneToggle: jQuery('#paneToggle'),
          useGPSBtn: jQuery('#useGPS'),
          paneResetBtn: jQuery('#paneReset')
      }; //set up defaul
  function setMarkers(map, locations) {
      var marker, i, j; //change icon
      var companyImage = new google.maps.MarkerImage('images/pin.png', new google.maps.Size(22, 30), new google.maps.Point(0, 0));
      $.each(locations, function(index, city) {
          var cityName = '<div class="cityName" data-city=parent' + index + '></div>';
          $('.directionAdrress').append(cityName); // var index = ''
          $.each(city['child'], function(k, ward) {
              var wardName = '<div class="wardName" data-ward =parent' + index + '_parentWard' + k + '><ul class="directionAdrress__item"></ul></div>';
              $('.cityName[data-city=parent' + index + ']').append(wardName);
              $.each(ward['child'], function(kloc, loc) { // console.log("--------------------------" );
                  var name = loc['name'];
                  var lat = loc['lat'];
                  var long = loc['long'];
                  var add = loc['add'];
                  var phone = loc['phone'];
                  var email = loc['email'];
                  latlngset = new google.maps.LatLng(lat, long);
                  var marker = new google.maps.Marker({
                      map: map,
                      title: name,
                      position: latlngset,
                      icon: companyImage
                  });
                  //map.setCenter(marker.getPosition());
                  var content = '<div class=\'contentMap\'><h3 class=\'m-name\'>' + name + '</h3>' + '<div class=\'add\'><span class=\'ic-add\'></span>' + add + '</div><div class=\'add\'><span class=\'ic-phone\'></span>' + phone + '</div><div class=\'add\'><span class=\'ic-mail\'></span>' + email + '</div></div>';
                  var infowindow = new google.maps.InfoWindow;
                  google.maps.event.addListener(marker, 'click', function(marker, content, infowindow) {
                      return function() {
                          infowindow.setContent(content);
                          infowindow.open(map, marker);
                          infowindow.setOptions({maxWidth:250}); 
                      }
                  }(marker, content, infowindow));
                  var item = '<li data-lat="' + lat + '" data-lng="' + long + '" data-content="' + content + '"><h3>' + name + '</h3><p class="txt-name"><span class="ic-add"></span>' + add + '</p><p class="txt-name"><span class="ic-phone"></span>' + phone + '</p><p class="txt-name"><span class="ic-mail"></span>' + email + '</p></li>';
                  $('.wardName[data-ward=parent' + index + '_parentWard' + k + '] ul').append(item);
                  var count = $('.cityName[data-city=parent' + index + '] li').length;
                  $('.cityName[data-city=parent' + index + ']').find('.sumCount').text('(' + count + ')')
              })
          })
      })
  }

  function mapSetup() {
      map = new google.maps.Map($Selectors.mapCanvas, {
          zoom: zm,
          center: new google.maps.LatLng(10.741276, 106.702030),
          //disableDefaultUI: true,
          mapTypeControl: false,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DEFAULT,
              position: google.maps.ControlPosition.TOP_RIGHT
          },
          panControl: false,
          zoomControl: true,
          zoomControlOptions:false,
          scaleControl: true,
          streetViewControl: true,
          overviewMapControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      setMarkers(map, locations); // }
      //trafficSetup();
  } // mapSetup Ends 
 
  function invokeEvents() {
      $('.directionAdrress__item li').click(function(e) {
          $('.directionAdrress__item li').removeClass('active');
          e.preventDefault();
          var lat = parseFloat($(this).data('lat')),
              lng = parseFloat($(this).data('lng')),
              elm = $(this).text();
              $(this).addClass('active');
          selectedContent = $(this).data('content');
          map.setCenter({
              lat: lat,
              lng: lng
          });
          map.setZoom(16);
      });
  } //invokeEvents Ends 
 // initialize();
  function showAdd() {
      var el = $('.txt-city');
      el.each(function() {
          $(this).on('click', function(e) {
              e.preventDefault();
              var elParent = $(this).parents('.cityName'); // $('.cityName').find('.wardName').slideUp();
              // $('.cityName').removeClass('active');
              if (elParent.hasClass('active')) {
                  elParent.removeClass('active');
                  elParent.find('.wardName').stop().slideUp()
              } else {
                  elParent.addClass('active');
                  elParent.find('.wardName').stop().slideDown()
              }
          })
      });
      // var elCity = $('.txt-ward');
      // elCity.each(function(e) {
      //     $(this).click(function(e) {
      //         var elP = $(this).parents('.wardName');
      //         e.preventDefault(); // $('.wardName').removeClass('active');
      //         // $('.directionAdrress__item').stop().slideUp();
      //         if (elP.hasClass('active')) {
      //             elP.removeClass('active');
      //             $(this).next().stop().slideUp()
      //         } else {
      //             $(this).parents('.wardName').addClass('active');
      //             $(this).next().stop().slideDown()
      //         }
      //     })
      // })
  }
  mapSetup();
  invokeEvents();
  showAdd()
};