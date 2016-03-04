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
    return map;
  }
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

  var place = function(input) {
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
    this.url = ko.observable('');
    this.address = ko.observable('');
    this.venueRating = ko.observable('');
    this.categories = ko.observable('');
    this.hereNow = ko.observable('');
    this.photosPrefix = ko.observable('');
    this.photosSuffix = ko.observable('');
    this.newMarker = new google.maps.Marker({
      position: this.coords,
      map: map,
      title: this.name,
      animation: google.maps.Animation.DROP,
      clickable: true,
      icon: this.icon,
    });
    this.infoWindow = new google.maps.InfoWindow({
      content: this.name,
      position: this.coords,
      disableAutoPan: false,
    });

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
        infoWindowHTML = "<p><strong><a class='place-name' href='" + data.response.venue.canonicalUrl + "'>" + data.response.venue.name + "</a></strong></p>" + "<p>" + data.response.venue.location.address +
          "</p><p><span class='place-rating'><strong>" + data.response.venue.rating + "</strong><sup> / 10</sup></span>" + "<span class='place-category'>" + data.response.venue.categories[0].name + "</p><p>" + data.response.venue.hereNow.count + " people checked-in now</p>" + "<img src='" + data.response.venue.photos.groups[0].items[0].prefix + "80x80" + data.response.venue.photos.groups[0].items[0].suffix + "'</img>";
        this.infoWindow.setContent(infoWindowHTML);
        console.log('Info Window Content from NEWMARKER', data);
      },
      error: function(result) {
        Materialize.toast("Can't Reach FourSquare. . .", 6000);
      }
    }).done(function() {

    });

    var marker = this.newMarker;
    var infowindow = this.infoWindow;

    this.newMarker.addListener('click', function() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
        map.setZoom(defZoom);
        map.setCenter(defCenter);
        infowindow.close();
        console.log('close window');
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.open(map, marker);
        console.log('open window');
      }
    });
    this.infoWindow.addListener('closeclick', function() {
      map.setZoom(defZoom);
      map.setCenter(defCenter);
      marker.setAnimation(null);
    });
    self.places.push(this.newMarker);
    self.places.pop();

  };
  self.newPlaces = function(input) {
    for (var i = 0; i < input.length; i++) {
      self.places.push(new place(input[i]));
      self.placesResults.push(self.places[i]);
    }
  };

  //***************************************************************//
  // PLACES PROTOTYPES
  //***************************************************//

  /**
   * @description Console logging function for testing, add
   *  or remove logs as neccesary.
   */

  place.prototype.log = function() {
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

  place.prototype.visible = function() {
    this.newMarker.setVisible(true);
  };
  place.prototype.hidden = function() {
    this.newMarker.setVisible(false);
  };

  place.prototype.open = function() {
    this.infoWindow.open(map, this.newMarker);
    map.setZoom(this.zoom);
    map.setCenter(this.coords);
    this.newMarker.setAnimation(google.maps.Animation.BOUNCE);
  };
  place.prototype.close = function() {
    this.infoWindow.close();
    map.setZoom(defZoom);
    map.setCenter(defCenter);
    this.newMarker.setAnimation(null);
  };


  //***************************************************************//
  // SEARCH FUNCTION
  //***************************************************//

  self.search = function(value) {
    self.placesResults.removeAll();
    console.log('WE ARE SEARCHING!!!!');

    for (var i = 0; i < self.places.length; i++) {
      self.places[i].hidden();
    }
    for (var place in self.places) {
      if (self.places[place].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        self.places[place].visible();
        self.placesResults.push(self.places[place]);
        console.log("WE'RE FILTERING!!!!!!!!!!");
      }
    }

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
        weatherData.temp(result.main.temp);
        weatherData.clouds(result.clouds.all);
        weatherData.wind(result.wind.speed);
        weatherData.good(true);
        $.extend(true, weatherData.current, {
          iconCode: result.weather[0].icon
        });
        console.log('OpenWeather.org Data:', result);
      },
      error: function(result) {
        Materialize.toast("Can't Get Weather. . .", 6000);
      }
    }).done(function() {
      var weatherIcon = 'http://openweathermap.org/img/w/' + weatherData.current.iconCode + '.png';
      $('#weatherIcon').attr("src", weatherIcon);
      Materialize.toast('Weather Updated <img  src="' + weatherIcon + '" alt="Weather Icon"></img>' + weatherData.temp() + ' &#8457', 6000);
    });
  };
  weatherReport(model.defLoc);
}

var app = new app();
app.query.subscribe(function(newValue) {
  app.search(newValue);
});
ko.applyBindings(app);
