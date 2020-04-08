(function () {
  $("#btn-camera").on("click", function(e){
    $("#camera-section").closest(".content-section").addClass("full-content-section");
    var elmnt = document.getElementById("camera-section");
    elmnt.scrollIntoView();
    window.scrollBy(0, -150);
  });

  $("#btn-temperature").on("click", function(e){
    $("#temperature-section").closest(".content-section").addClass("full-content-section");

    var elmnt = document.getElementById("temperature-section");
    elmnt.scrollIntoView();
    window.scrollBy(0, -150);

  });
}());