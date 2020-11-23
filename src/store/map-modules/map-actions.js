import { setData, getData } from '@/modules/localstorage-modules';
import splicedDataOfLength from '@/modules/modules';
import map from '@/modules/y-map-modules';

export default {
  // иницируем карту, передавая в метод класса карты
  // id dom-элемента
  initMap(ctx, id) {
    console.log('action, which the create a Yandex map');
    map.init(id);
  },

  // забираем дату из локального хранилища если таковая имеется
  // инициируем состояние приложения, добавляя в неё дату
  setHistory(ctx) {
    console.log('action, which the add localStorage data(or [])');
    const data = getData('coords_store') ? getData('coords_store') : [];
    ctx.commit('SET_DATA', splicedDataOfLength(data, 10));
  },

  // при клике по карте обращаемся к методу класса карты
  // за координатами клика и данными обратного геокодирования(адрес)
  // добавляем их в состояние и в локальное хранилище
  async setNewCoords(ctx) {
    console.log('action, which the add picked coords');
    const info = await map.getCoordsInfo();
    if (JSON.stringify(ctx.getters.getLastCoords) !== JSON.stringify(info.coords)) {
      setData('coords_store', info);
      ctx.commit('SET_COORDS', info);
    }
  },

  // вызываем метод класса карты, отрисвывающий маршрут
  // с координатами из истории маршрутов
  setHistoryCoords(ctx, coords) {
    console.log('action, which the add picked coords of history');
    map.createRoute(coords);
  },
};
