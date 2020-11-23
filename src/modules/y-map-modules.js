import polygon from '@/static-data/moscow.json';

const { ymaps } = window;

class MyYaMap {
  myMap = null

  coords = []

  coordsInfo = ''

  prevRoute = false

  circlePolygonOpts = {
    fillColor: '#0000FF',
    fillOpacity: 0.3,
    strokeColor: '#0000FF',
    strokeWidth: 4,
    interactivityModel: 'default#transparent',
  }

  // метод инициации яндекс карты. Получает
  // id DOM-элемента, в котором и будет находиться карта
  init(id) {
    ymaps.ready(async () => {
      // экземпляр полигона(МКАД)
      const moscowPolygon = new ymaps.Polygon(polygon.coordinates, {}, this.circlePolygonOpts);

      // экземпляр карты
      this.myMap = new ymaps.Map(id, {
        center: [55.7527, 37.6189],
        zoom: 11,
      }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search',
      });
      // вешаем слушатель клика для получения его координат
      this.myMap.events.add('click', async (e) => {
        this.coords = e.get('coords');
        this.createRoute(e.get('coords'));
      });

      // добавляем полигон на карту(область МКАД)
      this.myMap.geoObjects
        .add(moscowPolygon);
    });
  }

  // метод построения маршрутов
  createRoute(startPoint) {
    ymaps.ready(() => {
      // небольшой костыль. я не нашел метода api, который
      // возвращал бы искомый геообъект/ его индекс
      // с методом map.geoObjects.indexOf я не разобрался
      // почему-то при добавлении placemark индекс смещается
      const indexOfGeoObj = this.prevRoute ? 1 : 0;

      // конечная точка маршрута
      const endPoint = this.myMap.geoObjects
        // находим полигон в геообъектах карты
        .get(indexOfGeoObj)
        // получаем его геометрию
        .geometry
        // ищем вхождения стартовых координат
        //(пересечение со МКАДом)
        .getClosest(startPoint)
        // получаем позицию
        .position;

      // создание маршрута
      ymaps.route([startPoint, endPoint])
        .then(async (route) => {
          route.options.set({
            // убираем метки с маршрута, оставляя только путь
            wayPointVisible: false,
            viaPointVisible: false,
            routeOpenBalloonOnClick: false,
          });
          route.getPaths().options.set({
            strokeColor: '#0000FF',
            strokeWidth: 4,
          });
          if (this.prevRoute) {
            // последствия костыля
            // не разобравшись в indexOf не смог адекватно реализовать remove
            // в связи с чем пришлось удалять старый маршрут таким образом
            this.myMap.geoObjects.splice(0, 1);
            this.myMap.geoObjects.splice(1, 2);
          }
          await this.myMap.geoObjects
            // добавляем маршрут
            .add(route)
            // добавляем свою метку
            .add(new ymaps.Placemark(startPoint), {
              preset: 'islands#icon',
              iconColor: '#0095b6',
            })
            // добавляем маршрут по воздуху
            .add(new ymaps.GeoObject({
              geometry: {
                type: 'LineString',
                coordinates: [
                  startPoint,
                  endPoint,
                ],
              },
              properties: {
                hintContent: 'Aвиамаршрут',
              },
            }, {
              strokeColor: '#565959',
              strokeStyle: 'dash',
              strokeWidth: 8,
            }));
          this.prevRoute = true;
        });
    });
  }

  // метод обратного геокодирования для получения
  // адреса точки клика
  async getCoordsInfo() {
    const adress = await ymaps.geocode(this.coords);
    const infos = {
      coords: this.coords,
      info: adress.geoObjects.get(0).getAddressLine(),
    };
    return infos;
  }
}

export default new MyYaMap();
