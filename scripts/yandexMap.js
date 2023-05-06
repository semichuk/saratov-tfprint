ymaps.ready(init);
function init(){
    let myMap = new ymaps.Map("map", {
        center: [51.596290, 46.018815],
        zoom: 17
    });
    let myPlacemark = new ymaps.Placemark([51.596290, 46.018815]);
    myMap.geoObjects.add(myPlacemark)
}