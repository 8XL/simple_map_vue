import actions from './map-actions';
import mutations from './map-mutations';
import getters from './map-getters';

const state = {
  coords: [],
};

const mapStore = {
  state,
  getters,
  mutations,
  actions,
};

export { state, mapStore };
