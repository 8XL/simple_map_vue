import splicedDataOfLength from '@/modules/modules';

export default {
  SET_DATA(state, payload) {
    console.log('mutation SET_DATA ', payload);
    state.coords = payload;
  },

  SET_COORDS(state, payload) {
    console.log('mutation SET_COORDS ', payload);
    // ограничиваем длину массива в состоянии, так как полная дата хранится
    // в локальном хранилище, а это сэкономит производительность
    state.coords = [...splicedDataOfLength(state.coords, 9), payload];
  },
};
