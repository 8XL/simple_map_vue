export default {
  getCoords(state) {
    console.log('getter about all coords');
    return state.coords;
  },

  getLastCoords(state) {
    console.log('getter about a last coords');
    return state.coords[state.coords.length - 1]?.coords;
  },
};
