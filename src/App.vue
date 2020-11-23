<template>
  <div class="container">
    <YaMap/>
    <HistoryList />
  </div>
</template>

<script >
import YaMap from '@/components/YaMap.vue';
import HistoryList from '@/components/HistoryList.vue';

export default ({
  components: {
    YaMap,
    HistoryList,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

.container {
  width: 100vw;
  height: 100vh;
}
</style>
