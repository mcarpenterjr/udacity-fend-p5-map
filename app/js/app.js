function model() {
  var self = this;

  // Hardcoded list of locations
  this.defLocations = [{
    "name": "1900' Burger",
    "lat": 42.967257,
    "lng": -72.894326,
    "icon": "img/glyphs/33/beer.png",
    "venue_id": "4d31dc00ceb62d4367ece961",
    "business_id": ""
  }, {
    "name": "Cuzzin's Bar & Grill",
    "lat": 42.967550,
    "lng": -72.894466,
    "icon": "img/glyphs/33/beer.png",
    "venue_id": "4ad4a2a8f964a52073e820e3",
    "business_id": ""
  }, {
    "name": "The Bullwheel",
    "lat": 42.960147,
    "lng": -72.920316,
    "icon": "img/glyphs/33/beer.png",
    "venue_id": "5298eab7498ea48249ee85cd",
    "business_id": ""
  }, {
    "name": "The Snow Barn",
    "lat": 42.964554,
    "lng": -72.890084,
    "icon": "img/glyphs/33/music-note.png",
    "venue_id": "41e46880f964a520d01e1fe3",
    "business_id": ""
  }, {
    "name": "World Class Ski & Sport",
    "lat": 42.944819,
    "lng": -72.862898,
    "icon": "img/glyphs/33/bag.png",
    "venue_id": "4f48f75ae4b0291e48e4d5ce",
    "business_id": ""
  }, {
    "name": "West Dover Joe's",
    "lat": 42.950167,
    "lng": -72.875721,
    "icon": "img/glyphs/33/fork.png",
    "venue_id": "4d445b4ae198721e3fd4ba8b",
    "business_id": ""
  }, {
    "name": "Valley View Saloon",
    "lat": 42.939566,
    "lng": -72.854099,
    "icon": "img/glyphs/33/beer.png",
    "venue_id": "4b6a4ab6f964a52000d12be3",
    "business_id": ""
  }, {
    "name": "The Lodge at Mount Snow",
    "lat": 42.964807,
    "lng": -72.886772,
    "icon": "img/glyphs/hotel.svg",
    "venue_id": "4bc0d88d4cdfc9b68d989321",
    "business_id": ""
  }, {
    "name": "Snow Lake Lodge",
    "lat": 42.964483,
    "lng": -72.887932,
    "icon": "img/glyphs/hotel.svg",
    "venue_id": "4b5a3af9f964a5200ab628e3",
    "business_id": ""
  }, {
    "name": "Matterhorn Inn",
    "lat": 42.949581,
    "lng": -72.872355,
    "icon": "img/glyphs/campfire.svg",
    "venue_id": "4b8c88e6f964a52087d532e3",
    "business_id": ""
  }, {
    "name": "Sports Odyssey",
    "lat": 42.948423,
    "lng": -72.870308,
    "icon": "img/glyphs/33/bag.png",
    "venue_id": "4cb0985fdb32f04dca06c14d",
    "business_id": ""
  }];

  //Set the home location coordinates to initialize the map here
  self.defLoc = [42.9557093, -72.8923977, 14];

  //Create an empty array to store a list of map markers
  self.markers = [];
  self.infoWindows = [];
}
var model = new model();

//-------------------------------------------------------------------------

function appVM() {
  var self = this;
  // Foursquare ID and Secret Token for the api.
  var FSCLIENT_ID = 'SCCAY03SWJPAHUTNJNEDCXXHHQC0MNPZFJGZCLIPXGRUVCLC';
  var FSCLIENT_SECRET = '020SLKZRVCSZK3BWLXUNHMB0DF5DA21XQQSHWH1DSN5D5QYQ';
  // Map Marker Variable.
  var markerBouncing = null;
  // InfoWindow Variable
  var openInfoWindow = null;
  // Marker and InfoWindow Content Variable and Array.
  var infoWindowHTML = '';
  self.infoWindowHTMLs = [];

  // Search term empty Variable.
  self.searchQuery = ko.observable("");
  self.searchResults = ko.observableArray([]);

  // Converts location data object's name's to an array then pushes to an
  // observable.
  self.dispResults = function(defLocations) {
    self.dispResultsList = [];
    self.searchList = [];
    for (i = 0; i < model.defLocations.length; i++) {
      var item = model.defLocations[i].name;
      self.dispResultsList.push(item);
      // We can Uncomment below for Case Insensitive search, we'll
      // test a little more before we do.
      self.searchList.push(item.toLowerCase());
      console.log('Default Names Have Been Pushed');
    }
    self.results = ko.observableArray(self.dispResultsList.slice(0));
  };
  // Invokes initResults function on our locations.
  self.dispResults(model.defLocations);

  //**********************Search Function***********************//

  self.searchF = function() {
    self.results.removeAll();

    for (var i = 0; i < model.markers.length; i++) {
      model.markers[i].setVisible(false);
    }
    self.searchList.forEach(function(item, index, array) {
      if (item.indexOf(self.searchQuery().toLowerCase()) > -1) {
        self.results.push(self.dispResultsList[index]);

        model.markers[index].setVisible(true);
      }
    });

    //If the filter input is empty, resets all locations to be visible
    if (self.searchQuery() === '') {
      self.results(self.dispResultsList.slice(0));
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
    self.map.panTo(self.homelatlng);
    self.map.setZoom(15);
  };

  //***************************************************************//

  // Begining of our google map functions.
  function dispMap(latlng) {
    var marker;
    var mapDisp = document.getElementById('map');
    var gLatLng = latlng;
    var mapOptions = {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      center: gLatLng,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(mapDisp, mapOptions);
    return map;
  }

  // Default Location Based off the data in the Model(appM).
  self.defLatLng = new google.maps.LatLng(model.defLoc[0], model.defLoc[1]);

  // Fires Up the Map.
  self.map = dispMap(self.defLatLng);

  // Places our Map markers
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
      toggleBounce;
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
    });
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
      toggleBounce;
      map.setZoom(14);
      map.setCenter(self.defLatLng);
      $('.button-collapse').sideNav('show');
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
      var gMapLatLong = new google.maps.LatLng(location.lat, location.lng);
      var windowContent = location.name;
      //creates Marker, Adds to map
      // we need to add this once we find PNG or SVG Icons (location.icon)
      var marker = addMarker(self.map, gMapLatLong, location.name, windowContent, location.icon);
      // Makrers to Data Model
      model.markers.push(marker);
      console.log('Pushed New Markers');
    }
  };

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
        model.defLocations[i].venue_id +
        "?client_id=" + FSCLIENT_ID +
        "&client_secret=" + FSCLIENT_SECRET +
        "&v=20151220";

      $.getJSON(url, function(data) {
        clearTimeout(appVM.mesTimer);
        model.infoWindows.forEach(function(item, index, array) {
          if (item.content == data.response.venue.name) {
            infoWindowHTML = "<p><strong><a class='place-name' href='" + data.response.venue.canonicalUrl + "'>" + data.response.venue.name + "</a></strong></p>" + "<p>" + data.response.venue.location.address +
              "</p><p><span class='place-rating'><strong>" + data.response.venue.rating + "</strong><sup> / 10</sup></span>" + "<span class='place-category'>" + data.response.venue.categories[0].name + "</p><p>" + data.response.venue.hereNow.count + " people checked-in now</p>" + "<img src='" + data.response.venue.photos.groups[0].items[0].prefix + "80x80" + data.response.venue.photos.groups[0].items[0].suffix + "'</img>";
            item.setContent(infoWindowHTML);
            console.log('Info Window Content Good');
          } else {
            console.log('Name MisMatch');
          }
        });
      });
    }
  };
  // This fires off the initMap function, setting the markers from the model.
  self.initMap(model.defLocations);
  // This runs the foursquare API call and appends the data returned to the
  // map markers.
  self.fsApiCall(model.defLocations);


  //**********************************************************************
  //    API Call with ko.mapping plugin.
  //    Doesn't work..? Need More research.
  //
  //
  //
  // self.fsApiKoMap = function(defLocations) {
  //   for (var i = 0; i < model.defLocations.length; i++) {
  //     var url = "https://api.foursquare.com/v2/venues/" +
  //     model.defLocations[i].venue_id +
  //     "?client_id=" + FSCLIENT_ID +
  //     "&client_secret=" + FSCLIENT_SECRET +
  //     "&v=20151220";
  //
  //     $.getJSON(url, function(data) {
  //       clearTimeout(appVM.mesTimer);
  //       model.infoWindows.forEach(function(item, index, array) {
  //         if (item.content == data.response.venue.name) {
  //           ko.mapping.fromJSON(self.fsApiKoMap, koMapping);
  //         }
  //       });
  //     });
  //   }
  // };
  //
  // var koMapping = ko.mapping.fromJSON(self.fsApiKoMap);
  //   self.fsApiKoMap(model.defLocations);
  //
  //
  //
  //
  //**********************************************************************

}

//------------------------------------------------------------------------

// Gets some visuals ready when the app first loads.
var init = function() {
  $(document).ready(function() {

    $('.button-collapse').sideNav({
      menuWidth: 320, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

  });


  $(document)
    .ajaxStart(function() {
      // Stuff for the start of the ajax call Goes Here
    })
    .ajaxStop(function() {
      // Stuff for after the ajax call goes here
    });
  swal({
    title: "Fetching Locations",
    text: '<div class="preloader-wrapper big active">' +
      '<div class="spinner-layer spinner-red-only">' +
      '<div class="circle-clipper left">' +
      '<div class="circle"></div></div>' +
      '<div class="gap-patch"><div class="circle">' +
      '</div></div><div class="circle-clipper right">' +
      '<div class="circle"></div></div></div>',
    showCancelButton: false,
    showConfirmButton: false,
    html: true,
    timer: 3150
  });
};

var appVM = new appVM();
init();
ko.applyBindings(appVM);
