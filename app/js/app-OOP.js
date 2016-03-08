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
  // Empty Variable for GeoLocation
  self.currentLoc = [];
}
var model = new model();

//***************************************************************//
// Initialize Map Function
//***************************************************//

// Default Zoom Level
var defZoom = model.defLoc[2];
// Default View center, converted to Google Maps LatLng.
var defCenter = {
  lat: model.defLoc[0],
  lng: model.defLoc[1]
};


var appInit = function() {
  var self = this;

  function dispMap(latlng) {
    var marker;
    var mapDisp = document.getElementById('map');
    var gLatLng = latlng;
    var mapOptions = {
      zoom: defZoom,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      center: gLatLng,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(mapDisp, mapOptions);
    infowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();
    return map;
  }
  google.maps.event.addDomListener(window, "resize", function() {
    google.maps.event.trigger(map, "resize");
    map.fitBounds(bounds);
    console.log('Window Size Change');
  });
  // Fires Up the Map.
  self.map = dispMap(defCenter);
  app.newPlaces(model.default);

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

var loadError = function() {
  swal({
      title: "WHOOPS. . .",
      text: '<div class="progress"><div class="indeterminate"></div></div>' +
        '<div class="card blue-grey darken-1">' +
        '<div class="card-content white-text">' +
        '<p>There seems to be a problem loading our app, we will try again.</p>' +
        '<br><span>Google Maps <i class="fa fa-map-o pink-text text-lighten-1"></i></span>' +
        '</div>' +
        '</div>' +
        '</div>',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "Retry",
      confirmButtonColor: "#ffb300",
      html: true,
      timer: 8500,
    },
    function() {
      document.location.reload(true);
    });
};

//***************************************************************//
// APPLICATION CONSTRUCTOR
//***************************************************//

function app() {
  var self = this;
  self.places = [];
  self.placesResults = ko.observableArray([]);
  self.query = ko.observable('');

  //***************************************************************//
  // PLACES CONSTRUCTOR
  //***************************************************//

  /**
   * @description Creates the places object-s. creates defaults for
   *  each incoming place. Transfers existing information into
   *  newly created place.
   * @param places: Empty array for storing places.
   * @param place: Object function, scaffolds out defaults for a new
   *  place.
   * @param newPlaces: Function, loops over incoming data from the model,
   *  or can be used to loop over incoming data from an api call to make
   *  the app Dynamic. Loops over data, pushes a new place to the array.
   */

  var Place = function(input) {
    this.name = input.name;
    this.lat = input.loc[0];
    this.lng = input.loc[1];
    this.zoom = input.loc[2];
    this.coords = {
      lat: this.lat,
      lng: this.lng
    };
    this.icon = input.icon;
    this.VENUE_ID = input.venue_id;
    this.url = '';
    this.address = '';
    this.venueRating = '';
    this.categories = '';
    this.hereNow = '';
    this.photosPrefix = '';
    this.photosSuffix = '';
    this.newMarker = new google.maps.Marker({
      position: this.coords,
      map: map,
      title: this.name,
      animation: google.maps.Animation.DROP,
      clickable: true,
      icon: this.icon,
    });
    this.boundsPoint = new google.maps.LatLng(this.lat, this.lng);

    var FSCLIENT_ID = 'SCCAY03SWJPAHUTNJNEDCXXHHQC0MNPZFJGZCLIPXGRUVCLC';
    var FSCLIENT_SECRET = '020SLKZRVCSZK3BWLXUNHMB0DF5DA21XQQSHWH1DSN5D5QYQ';
    var url = "https://api.foursquare.com/v2/venues/" +
      this.VENUE_ID +
      "?client_id=" + FSCLIENT_ID +
      "&client_secret=" + FSCLIENT_SECRET +
      "&v=20151220";

    $.ajax({
      url: url,
      type: 'GET',
      context: this,
      dataType: 'JSON',
      success: function(data) {
        this.url = data.response.venue.canonicalUrl;
        this.name = data.response.venue.name;
        this.address = data.response.venue.location.address;
        this.venueRating = data.response.venue.rating;
        this.categories = data.response.venue.categories[0].name;
        this.hereNow = data.response.venue.hereNow.count;
        this.photosPrefix = data.response.venue.photos.groups[0].items[0].prefix;
        this.photosSuffix = data.response.venue.photos.groups[0].items[0].suffix;
        console.log('Info Window Content from NEWMARKER', data);
        // console.log('Info Window Content from NEWMARKER', this);
      },
      error: function(result) {
        Materialize.toast("Can't Reach FourSquare. . .", 6000);
      }
    });
    this.content =
      "<p><strong><a class='place-name' href='" + this.url + "'>" + this.name + "</a></strong></p><p>" + this.address +
      "</p><p><span class='place-rating'><strong>" + this.venueRating + "</strong><sup> / 10</sup></span>" + "<span class='place-category'>" + this.categories + "</p><p>" + this.hereNow + " people checked-in now</p>" + "<img src='" + this.photosPrefix + "80x80" + this.photosSuffix + "'</img>";

    var marker = this.newMarker;
    var content = this.content;
    var zoom = this.zoom;

    marker.addListener('click', function() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
        map.fitBounds(bounds);
        infowindow.close();
        console.log('close window');
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        map.setZoom(zoom);
        map.panTo(marker.getPosition());
        infowindow.close();
        infowindow.setContent(content);
        infowindow.open(map, marker);
        console.log('open window');
      }
    });
    bounds.extend(this.boundsPoint);
    self.places.push(this.newMarker);
    self.places.pop();


  };
  self.newPlaces = function(input) {
    for (var i = 0; i < input.length; i++) {
      self.places.push(new Place(input[i]));
      self.placesResults.push(self.places[i]);
    }
    map.fitBounds(bounds);
  };

  self.window = function(data) {
    var content = data.content;
    var marker = data.newMarker;
  };

  //***************************************************************//
  // CLICK EVENTS
  //***************************************************//



  //***************************************************************//
  // PLACES PROTOTYPES
  //***************************************************//

  /**
   * @description Console logging function for testing, add
   *  or remove logs as neccesary.
   */

  Place.prototype.log = function() {
    console.log(this.name);
    console.log(this.lat);
    console.log(this.lng);
    console.log(this.zoom);
    console.log(this.coords);
    console.log(this.icon);
    console.log(this.VENUE_ID);
    console.log(this.url);
    console.log(this.newMarker);
    console.log(this.infoWindow);
  };
  //places[0].log();

  /**
   * @description Marker Visibility toggle.
   */


  Place.prototype.visible = function() {
    this.newMarker.setVisible(true);
  };
  Place.prototype.hidden = function() {
    this.newMarker.setVisible(false);
  };

  Place.prototype.open = function() {
    map.setZoom(this.zoom);
    map.panTo(this.newMarker.getPosition());
    this.newMarker.setAnimation(google.maps.Animation.BOUNCE);
  };
  Place.prototype.close = function() {
    map.fitBounds(bounds);
    this.newMarker.setAnimation(null);
  };

  //***************************************************************//
  // SEARCH FUNCTION
  //***************************************************//

  self.search = function(value) {
    self.placesResults.removeAll();
    console.log('WE ARE SEARCHING!!!!');
    self.places.forEach(function(place) {
      if (place.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        place.visible();
        self.placesResults.push(place);
        console.log("WE'RE FILTERING!!!!!!!!!!");
      } else {
        place.hidden();
        console.log('PUT THE ' + place.name + ' AWAY!');
      }
    });
  };

  //***************************************************************//
  // LOCAL WEATHER
  //***************************************************//

  // Weather API Key
  var WEATHER_KEY = '6dc4f9aa6decdedf1ef5aab972c8471f';
  // Weather Data Layout. . . ooOOH ObServables OOooh
  weatherData = {
    'current': {
      'id': ko.observable(''),
      'main': ko.observable(''),
      'description': ko.observable(''),
      'icon': ko.observable(''),
      'iconCode': '01d',
    },
    'temp': ko.observable(''),
    'clouds': ko.observable(''),
    'wind': ko.observable(''),
    'good': ko.observable(false)
  };
  // Function To Retreive The Weather
  weatherReport = function(location) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
      "lat=" + location[0] + "&lon=" + location[1] +
      "&units=imperial&APPID=" + WEATHER_KEY;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      success: function(result) {
        var data = result;
        weatherData.current.id(result.weather[0].id);
        weatherData.current.main(result.weather[0].main);
        weatherData.current.description(result.weather[0].description);
        weatherData.current.icon('http://openweathermap.org/img/w/' + result.weather[0].icon + '.png');
        weatherData.temp(result.main.temp);
        weatherData.clouds(result.clouds.all);
        weatherData.wind(result.wind.speed);
        weatherData.good(true);
        console.log('OpenWeather.org Data:', result);
      },
      error: function(result) {
        Materialize.toast("Can't Get Weather. . .", 6000);
      }
    }).done(function() {
      Materialize.toast('Weather Updated <img  src="' + weatherData.current.icon() + '" alt="Weather Icon"></img>' + weatherData.temp() + ' &#8457', 6000);
    });
  };
  weatherReport(model.defLoc);
}

var app = new app();
app.query.subscribe(function(newValue) {
  app.search(newValue);
});
ko.applyBindings(app);
