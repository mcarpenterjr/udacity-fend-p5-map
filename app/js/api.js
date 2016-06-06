function api() {
  var self = this;
  // FourSquare Client ID
  var FSCLIENT_ID = 'SCCAY03SWJPAHUTNJNEDCXXHHQC0MNPZFJGZCLIPXGRUVCLC';
  // FourSquare Client Secret
  var FSCLIENT_SECRET = '020SLKZRVCSZK3BWLXUNHMB0DF5DA21XQQSHWH1DSN5D5QYQ';
  // Yelp Client ID
  var YELP_KEY = 'ixsrLHmS2onJnu5VryA0ew';
  // Yelp Client Secret
  var YELP_SECRET = 'fPMdtRwcJrdDMe4OQN5hfEuEWa4';

  self.fourSquare = function(input) {
    var url = "https://api.foursquare.com/v2/venues/" +
      "?client_id=" + FSCLIENT_ID +
      "&client_secret=" + FSCLIENT_SECRET +
      "&v=20151220";
  }

  self.yelp = function(input) {

  }

}

var api = new api();


infoWindowHTML =   '<div class="card"><div class="card-image waves-effect waves-block waves-light">' +
      '<img class="activator" src="'data.response.venue.photos.groups[0].items[0].prefix + "80x80" + data.response.venue.photos.groups[0].items[0].suffix'"></div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4"><a href="' + data.response.venue.canonicalUrl + '">' + data.response.venue.name + '</a><i class="material-icons right">more_vert</i></span><p>'+ data.response.venue.hereNow.count +'  people checked-in now</p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'Card Title'<i class="material-icons right">close</i></span><p>' + data.response.venue.location.address + '</p><span class="place-rating"><strong>' + data.response.venue.rating + '</strong><sup> / 10</sup></span><span class="place-category">' + data.response.venue.categories[0].name + '</p></div></div>'
