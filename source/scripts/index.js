/* в этот файл добавляет скрипты*/
toggleMenu();
createMap();
setSlider();

function toggleMenu() {
  const navMain = document.querySelector('.main-nav');
  const toggle = document.querySelector('.main-header__toggle');

  navMain.classList.remove('main-nav--nojs');

  toggle.addEventListener('click', () => {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      toggle.classList.add('main-header__toggle--closed');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      toggle.classList.remove('main-header__toggle--closed');
    }
  });

}

function createMap() {
  // eslint-disable-next-line no-undef
  ymaps.ready(init);

  function init() {
    // eslint-disable-next-line no-undef
    const myMap = new ymaps.Map('map', {
        center: [59.938631, 30.323037],
        zoom: 14,
        controls: []
      }),

      // eslint-disable-next-line no-undef
      myPieChart = new ymaps.Placemark(
        [59.938631, 30.323037],
        {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'images/map-pin@1x.png',
          iconImageSize: [57, 53],
          iconImageOffset: [-5, -38]
        });

    myMap.geoObjects
      .add(myPieChart);
  }
}

function setSlider () {
  const range = document.querySelector('.example-image__range');

  if (range) {
    range.addEventListener('input', (e) => {
      e.target.parentNode.style.setProperty('--value', `${e.target.value}%`);
    });
  }
}
