/* в этот файл добавляет скрипты*/
setSlider();
toggleMenu();
createMap();

function toggleMenu() {
    let navMain = document.querySelector('.main-nav');
    let toggle = document.querySelector('.main-header__toggle');

    navMain.classList.remove('main-nav--nojs');

    toggle.addEventListener('click', function () {
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
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [59.938631, 30.323037],
                zoom: 14,
                controls: []
            }),

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
            .add(myPieChart)
    }
}

function setSlider() {
    var x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        /*get the width and height of the img element*/
        w = img.offsetWidth;
        h = img.offsetHeight;
        /*set the width of the img element to 50%:*/
        img.style.width = (w / 2) + "px";
        /*create slider:*/
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /*insert slider*/
        img.parentElement.insertBefore(slider, img);
        /*position the slider in the middle:*/
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        /*execute a function when the mouse button is pressed:*/
        slider.addEventListener("mousedown", slideReady);
        /*and another function when the mouse button is released:*/
        window.addEventListener("mouseup", slideFinish);
        /*or touched (for touch screens:*/
        slider.addEventListener("touchstart", slideReady);
        /*and released (for touch screens:*/
        window.addEventListener("touchstop", slideFinish);

        function slideReady(e) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*the slider is now clicked and ready to move:*/
            clicked = 1;
            /*execute a function when the slider is moved:*/
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            /*the slider is no longer clicked:*/
            clicked = 0;
        }

        function slideMove(e) {
            var pos;
            /*if the slider is no longer clicked, exit this function:*/
            if (clicked == 0) return false;
            /*get the cursor's x position:*/
            pos = getCursorPos(e)
            /*prevent the slider from being positioned outside the image:*/
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            /*execute a function that will resize the overlay image according to the cursor:*/
            slide(pos);
        }

        function getCursorPos(e) {
            var a, x = 0;
            e = e || window.event;
            /*get the x positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x coordinate, relative to the image:*/
            x = e.pageX - a.left;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            /*resize the image:*/
            img.style.width = x + "px";
            /*position the slider:*/
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}

//
//     setAspectRatio(1)
//     setAspectRatio(2)
//
//     const container = document.querySelector('.container1');
//     const slider = document.querySelector('.slider');
//
//     slider.addEventListener('input', function (e) {
//         container.style.setProperty('--position', e.target.value + '%');
//     });
// }
//
// function setAspectRatio(imageNumber) {
//     const imageElement = document.querySelector(`.image-${imageNumber}`);
//     const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
//     const aspectRatioString = aspectRatio.toString();
//     document.querySelector('.image-container').style.setProperty('--aspect-ratio', aspectRatioString);
// }