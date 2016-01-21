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
