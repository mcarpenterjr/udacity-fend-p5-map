function model() {
  var self = this;

  /**
   * @description Hard Coded locations
   * @param name: string holding the locations name
   * @param loc: Array for location [lattitude, longitude, zoom]
   * @param icon: string holding the icon path typically img/glyphs/*.svg or *.png
   *         ideally the icon would be no more than 50px X 65px
   * @param venue_id: string containing the fourSquare venue ID
   * @param business_id: string containing the Yelp business ID
   */

  self.default = [{
    "name": "1900' Burger",
    "loc": [42.967257, -72.894326, 17],
    "icon": "img/glyphs/gm-beer.svg",
    "venue_id": "4d31dc00ceb62d4367ece961",
    "business_id": ""
  }, {
    "name": "Cuzzin's Bar & Grill",
    "loc": [42.967550, -72.894466, 17],
    "icon": "img/glyphs/gm-beer.svg",
    "venue_id": "4ad4a2a8f964a52073e820e3",
    "business_id": ""
  }, {
    "name": "The Bullwheel",
    "loc": [42.960147, -72.920316, 17],
    "icon": "img/glyphs/gm-beer.svg",
    "venue_id": "5298eab7498ea48249ee85cd",
    "business_id": ""
  }, {
    "name": "The Snow Barn",
    "loc": [42.964554, -72.890084, 17],
    "icon": "img/glyphs/gm-music.svg",
    "venue_id": "41e46880f964a520d01e1fe3",
    "business_id": ""
  }, {
    "name": "World Class Ski & Sport",
    "loc": [42.944819, -72.862898, 17],
    "icon": "img/glyphs/gm-shopping.svg",
    "venue_id": "4f48f75ae4b0291e48e4d5ce",
    "business_id": ""
  }, {
    "name": "West Dover Joe's",
    "loc": [42.950167, -72.875721, 17],
    "icon": "img/glyphs/gm-food.svg",
    "venue_id": "4d445b4ae198721e3fd4ba8b",
    "business_id": ""
  }, {
    "name": "Valley View Saloon",
    "loc": [42.939566, -72.854099, 17],
    "icon": "img/glyphs/gm-beer.svg",
    "venue_id": "4b6a4ab6f964a52000d12be3",
    "business_id": ""
  }, {
    "name": "The Lodge at Mount Snow",
    "loc": [42.964807, -72.886772, 17],
    "icon": "img/glyphs/gm-hotel.svg",
    "venue_id": "4bc0d88d4cdfc9b68d989321",
    "business_id": ""
  }, {
    "name": "Snow Lake Lodge",
    "loc": [42.964483, -72.887932, 17],
    "icon": "img/glyphs/gm-hotel.svg",
    "venue_id": "4b5a3af9f964a5200ab628e3",
    "business_id": ""
  }, {
    "name": "Matterhorn Inn",
    "loc": [42.949581, -72.872355, 17],
    "icon": "img/glyphs/gm-campfire.svg",
    "venue_id": "4b8c88e6f964a52087d532e3",
    "business_id": ""
  }, {
    "name": "Sports Odyssey",
    "loc": [42.948423, -72.870308, 17],
    "icon": "img/glyphs/gm-shopping.svg",
    "venue_id": "4cb0985fdb32f04dca06c14d",
    "business_id": ""
  }];

  // Set the home location coordinates to initialize the map here
  self.defLoc = [42.9557093, -72.8923977, 14];
  // Create an empty array to store a list of map markers
  self.markers = [];
  self.infoWindows = [];
  // Empty Variable for GeoLocation
  self.currentLoc = [];
}
var model = new model();

//***************************************************************//

function appVM() {
  var self = this;
  // Foursquare ID and Secret Token for the api.
  var FSCLIENT_ID = 'SCCAY03SWJPAHUTNJNEDCXXHHQC0MNPZFJGZCLIPXGRUVCLC';
  var FSCLIENT_SECRET = '020SLKZRVCSZK3BWLXUNHMB0DF5DA21XQQSHWH1DSN5D5QYQ';
  // Map Marker Bouncing Variable, Null Stops premature Bouncing.
  var markerBouncing = null;
  // InfoWindow Variable, starts empty.
  var openInfoWindow = null;
  // InfoWindow Content Variable, Starts Empty.
  var infoWindowHTML = '';
  // Default Zoom Level
  self.defZoom = model.defLoc[2];
  // Default View center, converted to Google Maps LatLng.
  self.defCenter = {
    lat: model.defLoc[0],
    lng: model.defLoc[1]
  };

  // Search, Empty Variable.
  self.searchQuery = ko.observable("");


  //***************************************************************//

  /**
   * @description Location List, Loops through Object pushes
   *  the name endpoint to an array, for display, pushes a lowercase version
   * to another array, to become searchable.
   * @param locs: Object-s, holding JS data,
   */

  self.locList = function(locs) {
    self.locListItem = [];
    self.searchables = [];
    for (i = 0; i < locs.length; i++) {
      var item = locs[i].name;
      self.locListItem.push(item);
      self.searchables.push(item.toLowerCase());
      console.log('Default Names Have Been Pushed');
    }
    self.results = ko.observableArray(self.locListItem.slice(0));
  };
  // Invokes initResults function on our locations.
  self.locList(model.default);

  //***************************************************************//
  // Search Function. . .

  self.searchF = function() {
    self.results.removeAll();

    for (var i = 0; i < model.markers.length; i++) {
      model.markers[i].setVisible(false);
    }
    self.searchables.forEach(function(item, index, array) {
      if (item.indexOf(self.searchQuery().toLowerCase()) > -1) {
        self.results.push(self.locListItem[index]);

        model.markers[index].setVisible(true);
      }
    });

    //If the filter input is empty, resets all locations to be visible
    if (self.searchQuery() === '') {
      self.results(self.locListItem.slice(0));
      model.markers.forEach(function(item, index, array) {
        if (!item.getVisible()) {
          item.setVisible(true);
        }
      });
    }
  }.bind(this);

  self.clearSearch = function() {
    self.searchQuery('');
    if (openInfoWindow) openInfoWindow.close();
    if (markerBouncing) markerBouncing.setAnimation(null);
    self.searchF();
    self.map.panTo(self.defCenter);
    self.map.setZoom(self.defZoom);
  };

  //***************************************************************//
  // Map Function

  // Begining of our google map functions. SPAGHETTI CODE. YAYAYAY!
  function dispMap(latlng) {
    var marker;
    var mapDisp = document.getElementById('map');
    var gLatLng = latlng;
    var mapOptions = {
      zoom: self.defZoom,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      center: gLatLng,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(mapDisp, mapOptions);
    return map;
  }
  // Fires Up the Map.
  self.map = dispMap(self.defCenter);

  function addMarker(map, latlng, title, content, icon) {
    var markerOptions = {
      position: latlng,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP,
      clickable: true,
      icon: icon,
    };
    var marker = new google.maps.Marker(markerOptions);
    marker.addListener('click', function() {
      map.setZoom(17);
      map.setCenter(marker.getPosition());
    });
    var infoWindowOptions = {
      content: content,
      position: latlng
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    model.infoWindows.push(infoWindow);
    google.maps.event.addListener(marker, 'click', function() {
      if (openInfoWindow) openInfoWindow.close();
      openInfoWindow = infoWindow;
      infoWindow.open(map, marker);
      toggleBounce();
    });
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
      map.setZoom(self.defZoom);
      map.setCenter(self.defCenter);
      $('.button-collapse').sideNav('show');
      toggleBounce();
    });

    function toggleBounce() {
      if (markerBouncing) {
        markerBouncing.setAnimation(null);
      }
      if (markerBouncing != marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        markerBouncing = marker;
      } else {
        markerBouncing = null;
      }
    }
    return marker;
  }

  self.selectedMarker = function(activeMarker) {
    for (var i = 0; i < model.markers.length; i++) {
      if (activeMarker == model.markers[i].title) {
        toggleInfoWindow(i);
      }
    }
  }.bind(this);

  // InfoWindow Toggle-er
  function toggleInfoWindow(id) {
    google.maps.event.trigger(model.markers[id], 'click');
  }

  // Function to interate through hardcoded Default Locations
  // and get them on the map.
  self.initMap = function(data) {
    for (var i = 0; i < data.length; i++) {
      var location = data[i];
      var gMapLatLong = new google.maps.LatLng(location.loc[0], location.loc[1]);
      // SETS INFO WINDOW CONTENT
      var windowContent = location.name;
      //creates Marker, Adds to map
      var marker = addMarker(self.map, gMapLatLong, location.name, windowContent, location.icon);
      // Makrers to Data Model
      model.markers.push(marker);
      console.log('Pushed New Markers');
    }
  };
  self.initMap(model.default);

  //***************************************************************//
  // API CALL

  // Our Error Message timer... If fourSquare does not return any results
  // WE RIOT... J/K We only riot if they kill Daryl... We'll just throw an error.
  self.mesTimer = setTimeout(function() {
    Materialize.toast("Having trouble connecting, Try again...", 6000);
  }, 6000);
  // Api call to FourSquare, to start pulling Data.
  // If we wanted to get trick, maybe we could put this in a
  // service worker one day.
  self.fsApiCall = function(input) {
    for (var i = 0; i < input.length; i++) {
      var url = "https://api.foursquare.com/v2/venues/" +
        input[i].venue_id +
        "?client_id=" + FSCLIENT_ID +
        "&client_secret=" + FSCLIENT_SECRET +
        "&v=20151220";

      $.getJSON(url, function(data) {
        clearTimeout(self.mesTimer);
        model.infoWindows.forEach(function(item, index, array) {
          if (item.content == data.response.venue.name) {
            infoWindowHTML = "<p><strong><a class='place-name' href='" + data.response.venue.canonicalUrl + "'>" + data.response.venue.name + "</a></strong></p>" + "<p>" + data.response.venue.location.address +
              "</p><p><span class='place-rating'><strong>" + data.response.venue.rating + "</strong><sup> / 10</sup></span>" + "<span class='place-category'>" + data.response.venue.categories[0].name + "</p><p>" + data.response.venue.hereNow.count + " people checked-in now</p>" + "<img src='" + data.response.venue.photos.groups[0].items[0].prefix + "80x80" + data.response.venue.photos.groups[0].items[0].suffix + "'</img>";
            item.setContent(infoWindowHTML);
            console.log('Info Window Content Good', data);
          }
        });
      });
    }
  };
  self.fsApiCall(model.default);

  //***************************************************************//
  // Weather Function

  // Weather API Key
  var WEATHER_KEY = '6dc4f9aa6decdedf1ef5aab972c8471f';
  // Weather Data Layout. . . ooOOH ObServables OOooh
  self.weatherData = {
    'current': {
      'id': ko.observable(''),
      'main': ko.observable(''),
      'description': ko.observable(''),
      'iconCode': '01d',
    },
    'temp': ko.observable(''),
    'clouds': ko.observable(''),
    'wind': ko.observable(''),
    'good': ko.observable(false)
  };
  // Function To Retreive The Weather
  self.weatherReport = function(location) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
      "lat=" + location[0] + "&lon=" + location[1] +
      "&units=imperial&APPID=" + WEATHER_KEY;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      success: function(result) {
        var data = result;
        appVM.weatherData.current.id(result.weather[0].id);
        appVM.weatherData.current.main(result.weather[0].main);
        appVM.weatherData.current.description(result.weather[0].description);
        appVM.weatherData.temp(result.main.temp);
        appVM.weatherData.clouds(result.clouds.all);
        appVM.weatherData.wind(result.wind.speed);
        appVM.weatherData.good(true);
        $.extend(true, appVM.weatherData.current, {
          iconCode: result.weather[0].icon
        });
        console.log('OpenWeather.org Data:', result);
      },
      error: function(result) {
        Materialize.toast("Can't Get Weather. . .", 6000);
      }
    }).done(function() {
      var weatherIcon = 'http://openweathermap.org/img/w/' + self.weatherData.current.iconCode + '.png';
      $('#weatherIcon').attr("src", weatherIcon);
      Materialize.toast("Weather Updated", 6000);
    });
  };
  self.weatherReport(model.defLoc);
}

//***************************************************************//

// Gets some visuals ready when the app first loads.
var initDisp = function() {
  $(document).ready(function() {
    $('.button-collapse').sideNav({
      menuWidth: 280, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
  });
  swal({
    title: "Loading. . .",
    text: '<div class="progress"><div class="indeterminate"></div></div>' +
      '<div class="card blue-grey darken-1">' +
      '<div class="card-content white-text">' +
      '<p>Here are some Awesome places to check out in West Dover, Vermont.' +
      'You will be able to explore some great places to shop, grab a drink, ' +
      'party and stay all near the Mount Snow Ski Resort.</p>' +
      '</br><span>Powered By, FourSquare <i class="fa fa-foursquare fa-fw pink-text text-lighten-1"></i>' +
      ' and Google Maps <i class="fa fa-foursquare fa-map-o pink-text text-lighten-1"></i></span>' +
      '</div>' +
      '</div>' +
      '</div>',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: "Let's Go!",
    confirmButtonColor: "#ffb300",
    html: true,
    timer: 8500,
  });
};
function initApp() {

}
var appVM = new appVM();
ko.applyBindings(appVM);

initDisp();
