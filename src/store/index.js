import { createStore } from 'vuex';
import { mapStore } from './map-modules/map-main';

const store = {
  state: {
    version: '1.0',
  },
  modules: {
    mapStore,
  },
};

export default createStore(store);
