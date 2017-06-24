var $topMenu = $('#main-menu'),
  $showMenuBtn = $('#show-menu');

$showMenuBtn.on('click', function(){
  if ( $topMenu.hasClass('open')){
    $topMenu.removeClass('open');
  }
  else{
    $topMenu.addClass('open');
  }
});

$(window).resize(function(){
  if ($(window).width() > 885){
    $topMenu.removeClass('animation')
            .removeClass('open');


  }else{
    $topMenu.addClass('animation');
  }
});

$topMenu.on('click', 'a', function(){
  $topMenu.removeClass('open');
});



/*инициализация карты*/
function initMap() {
  var map;

  var chernihiv = {lat: 51.493827, lng: 31.302196},

  map = new google.maps.Map(document.getElementById('map'), {
    center: chernihiv,
    zoom: 15,
    zoomControl: false, //Отключить кнопки + и -
    streetViewControl: false, //Отключить человечка
    scrollwheel: false, //Отключить масштабирование на скролл
    mapTypeControl: false, //Убрать элементы выбора типа карты
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  });

 /* infowindow и маркеры */

  var infowindow = new google.maps.InfoWindow({
    content: "Our Beetroot Academy",
  });

  var image = {
    url: 'favicon.png', // if image is bigger then next
    scaledSize : new google.maps.Size(25, 25)
  };

  var marker_che = new google.maps.Marker({
    position: chernihiv,
    map: map,
    icon: image
  });

  marker_che.addListener('click', function() {
    infowindow.open(map, marker_che);
  });

  /* Поставить нужный город по центру */

  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter()
    google.maps.event.trigger(map, "resize")
    map.setCenter(center)
  });

  $('select').on('change', function(){
    var val = $(this).val(); //вал - переменная в которой хранятся координаты
    var pos = eval(val);
    //console.log(pos);
    map.panTo(pos);
  });

  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );
}



$(document).ready(function() {

  initMap(); //вызов функции карты

  /*плавная прокрутка по клику на меню и на кнопку внизу*/
  function clickMenuAndBtn(event) {
    event.preventDefault();
    var link = $(this).attr('href');
    var distance = $(link).offset().top;

    $('html, body').animate({
      scrollTop: distance
    }, 500);
  }

	$('.menu__list').on('click', '.menu__link', clickMenuAndBtn);
	$('#click-down').on('click', clickMenuAndBtn);
  /*end*/

  /*select - masonry*/

  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
      masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: '.grid-item-size',
  	  horizontalOrder: true
      // gutter: 5
    }
  })

  // filter items on button click
  $('.select-btns').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });


  /*slick*/

  $('.slider-team').slick({
    arrows: false,
    dots: true
  });

  $('.slider-testimonials').slick({
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true
  });


}); // конец doc.ready

/* событие скролл */



$(window).scroll(function(){


  /* полупрозрачность фиксированного меню*/

  var dist = $('#portfolio').offset().top;
  //console.log('window ' + $(window).scrollTop() + 'dist ' + dist);
  if ($(window).scrollTop() >= dist){
    $('.header').css('background', 'rgba(0, 0, 0, 0.3)');
  } else {
    $('.header').css('background', 'transparent');
  }

});



