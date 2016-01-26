function appVM() {
  var self = this;

  //**********************Map Function***********************//

  // Map Marker Variable.
  var markerBouncing = null;
  // InfoWindow Variable
  var openInfoWindow = null;
  // Marker and InfoWindow Content Variable and Array.
  var infoWindowHTML = '';
  self.infoWindowHTMLs = [];
  // Default Location Based off the data in the Model(appM).
  self.defLatLng = new google.maps.LatLng(model.defLoc[0], model.defLoc[1]);

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
      icon: icon
    };
    var marker = new google.maps.Marker(markerOptions);
    marker.addListener('click', toggleBounce);

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
    google.maps.event.addListener(infoWindow, 'closeclick', toggleBounce);

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
  self.setMap = function() {
    for (var i = 0; i < model.defLocations.length; i++) {
      var location = model.defLocations[i];
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

  // This fires off the setMap function, setting the markers from the model.
  self.setMap(model.defLocations);


  //**************************List Display**********************//

  // Converts location data object's name's to an array then pushes to an
  // observable.
  self.dispResults = function() {
    self.dispResultsList = ko.observableArray([]);
    self.searchList = [];
    for (i = 0; i < model.defLocations.length; i++) {
      var item = model.defLocations[i].name;
      self.dispResultsList.push(item);
      // We can Uncomment below for Case Insensitive search, we'll
      // test a little more before we do.
      self.searchList.push(item.toLowerCase());
      console.log('Default Names Have Been Pushed');
    }
    self.results = self.dispResultsList.slice(0);
  };

  // Invokes initResults function on our locations.
  self.dispResults(model.defLocations);


  //**********************API Call Function***********************//

  // Foursquare ID and Secret Token for the api.
  var FSCLIENT_ID = 'SCCAY03SWJPAHUTNJNEDCXXHHQC0MNPZFJGZCLIPXGRUVCLC';
  var FSCLIENT_SECRET = '020SLKZRVCSZK3BWLXUNHMB0DF5DA21XQQSHWH1DSN5D5QYQ';

  // Api call to FourSquare, to start pulling Data.
  // If we wanted to get trick, maybe we could put this in a
  // service worker one day.

  self.fsApiCall = function(input) {
    // Our Error Message timer... If fourSquare does not return any results
    // WE RIOT... J/K We only riot if they kill Daryl... We'll just throw an error.
    var mesTimer = setTimeout(function() {
      Materialize.toast("Having trouble connecting, Try again...", 6000);
    }, 1500);

    for (var i = 0; i < input.length; i++) {
      var url = "https://api.foursquare.com/v2/venues/" +
        model.defLocations[i].venue_id +
        "?client_id=" + FSCLIENT_ID +
        "&client_secret=" + FSCLIENT_SECRET +
        "&v=20151220";

      $.getJSON(url, function(data) {
        clearTimeout(mesTimer);
        model.infoWindows.forEach(function(item, index, array) {
          if (item.content == data.response.venue.name) {
            infoWindowHTML = "<p><strong><a class='place-name' href='" +
              data.response.venue.canonicalUrl + "'>" +
              data.response.venue.name +
              "</a></strong></p>" +
              "<p>" + data.response.venue.location.address +
              "</p><p><span class='place-rating'><strong>" +
              data.response.venue.rating +
              "</strong><sup> / 10</sup></span>" +
              "<span class='place-category'>" +
              data.response.venue.categories[0].name +
              "</p><p>" + data.response.venue.hereNow.count +
              " people checked-in now</p>" +
              "<img src='" + data.response.venue.photos.groups[0].items[0].prefix +
              "80x80" +
              data.response.venue.photos.groups[0].items[0].suffix +
              "'</img>";
            item.setContent(infoWindowHTML);
            console.log('Info Window Content Good');
          } else {
            console.log('Name MisMatch');
          }
        });
      });
      // swal.close();
    }
  };

  // This runs the foursquare API call and appends the data returned to the
  // map markers.
  //self.fsApiCall(model.defLocations);
  //************************************************************//

  //**********************Search Function***********************//



  //************************************************************//

}

var appVM = new appVM();
ko.applyBindings(appVM);
