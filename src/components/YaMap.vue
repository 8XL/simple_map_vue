<template>
  <div id='map'
    @click="setNewCoords"
  />
</template>

<script>
import { mapActions, useStore } from 'vuex';
import { onBeforeMount } from 'vue';

export default {
  name: 'YaMap',
  methods: {
    ...mapActions([
      'setNewCoords',
    ]),
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch('setHistory');
      store.dispatch('initMap', 'map');
    });

    return {
      store,
    };
  },
};
</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
