function view() {

}

var init = function() {
  $(document).ready(function() {
    $('.collapsible').collapsible({
      accordion: true
    });
    $('#showFs').click(function() {
      $('#fourSquare').toggle('slow');
      appVM.fsApiCall(model.defLocations);
    });
    $('#showSearch').click(function() {
      $('#searchDisp').toggle('slow');
    });
  });
  $(document)
    .ajaxStart(function() {
      // Stuff Goes Here
    })
    .ajaxStop(function() {
      // Stuff goes here
    });
    swal({
      title: "Finding all the spots...",
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

var view = new view();
init();
