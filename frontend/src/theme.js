(function () {
  $('#btn-camera').on('click', (e) => {
    $('#camera-section').closest('.content-section').addClass('full-content-section');
    const elmnt = document.getElementById('camera-section');
    elmnt.scrollIntoView();
    window.scrollBy(0, -150);
  });

  $('#btn-temperature').on('click', (e) => {
    $('#temperature-section').closest('.content-section').addClass('full-content-section');

    const elmnt = document.getElementById('temperature-section');
    elmnt.scrollIntoView();
    window.scrollBy(0, -150);
  });
}());
