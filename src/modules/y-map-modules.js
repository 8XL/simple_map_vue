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

  init(id) {
    ymaps.ready(async () => {
      const moscowPolygon = new ymaps.Polygon(polygon.coordinates, {}, this.circlePolygonOpts);

      this.myMap = new ymaps.Map(id, {
        center: [55.7527, 37.6189],
        zoom: 11,
      }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search',
      });

      this.myMap.events.add(['multitouchstart', 'multitouchmove', 'multitouchend', 'click'], async (e) => {
        this.coords = e.get('coords');
        this.createRoute(e.get('coords'));
      });

      this.myMap.geoObjects
        .add(moscowPolygon);
    });
  }

  createRoute(startPoint) {
    ymaps.ready(() => {
      const indexOfGeoObj = this.prevRoute ? 1 : 0;
      const endPoint = this.myMap.geoObjects
        .get(indexOfGeoObj)
        .geometry
        .getClosest(startPoint)
        .position;

      ymaps.route([startPoint, endPoint])
        .then(async (route) => {
          route.options.set({
            wayPointVisible: false,
            viaPointVisible: false,
            routeOpenBalloonOnClick: false,
          });
          route.getPaths().options.set({
            strokeColor: '#0000FF',
            strokeWidth: 4,
          });
          if (this.prevRoute) {
            this.myMap.geoObjects.splice(0, 1);
            this.myMap.geoObjects.splice(1, 2);
          }
          await this.myMap.geoObjects
            .add(route)
            .add(new ymaps.Placemark(startPoint), {
              preset: 'islands#icon',
              iconColor: '#0095b6',
            })
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
