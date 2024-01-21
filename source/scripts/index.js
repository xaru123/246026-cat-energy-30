/* в этот файл добавляет скрипты*/
toggleMenu();
createMap();
setSlider();

function toggleMenu() {
  const navMain = document.querySelector('.main-nav');
  const toggle = document.querySelector('.main-nav__toggle');

  if (!navMain) {
    return;
  }

  navMain.classList.remove('main-nav--nojs');

  toggle.addEventListener('click', () => {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      toggle.classList.add('main-nav__toggle--closed');
    } else if (navMain.classList.contains('main-nav--opened')) {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      toggle.classList.remove('main-nav__toggle--closed');
    } else if (
      !navMain.classList.contains('main-nav--closed') && !navMain.classList.contains('main-nav--opened')) {
      navMain.classList.add('main-nav--opened');
      toggle.classList.add('main-nav__toggle--closed');
    }
  });
}

function createMap() {
  // eslint-disable-next-line no-undef
  const yandexMapApi = ymaps;

  yandexMapApi.ready(init);

  function init() {
    if (!document.querySelectorAll('#map').length) {
      return;
    }

    const myMap = new yandexMapApi.Map('map', {
        center:[59.93825104300474,30.325100658889138],
        zoom: 14.5,
        controls: []
      }),

      myPieChart = new yandexMapApi.Placemark(
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

function setSlider() {
  const range = document.querySelector('.example-image__range');

  if (range) {
    range.addEventListener('input', (e) => {
      e.target.parentNode.style.setProperty('--value', `${e.target.value}%`);
    });
  }
}
