<template>
  <div class='mdc-card menu' v-if="getCoords.length > 0">
    <button class="mdc-button mdc-button--raised btn"
      @click.prevent="openMenu = !openMenu"
    >
    <div class="mdc-button__ripple" />
      <i class="material-icons mdc-button__icon" aria-hidden="true">
        bookmark
      </i>
      <span class="mdc-button__label">История маршрутов</span>
    </button>
    <div
      class='mdc-menu'
      :class="{
        'mdc-menu-surface': !openMenu,
        'mdc-menu-surface--open': openMenu
      }"
    >
      <ul class="mdc-list mdc-list--two-line list"
          ref="refOfList"
          role="menu"
          aria-hidden="true"
          aria-orientation="vertical"
          tabindex="-1"
        >
        <transition-group name='list'>
          <li class="mdc-list-item list__item" role="menuitem"
            v-for="item in getCoords" :key="item.coords[0] + item.coords[1]"
            @click.prevent="setRouteOfHistory(item.coords)"
          >
            <span class="material-icons mdc-list--icon-list" aria-hidden="true">
              place
            </span>
            <span class="mdc-list-item__ripple" />
            <span class="mdc-list-item__text al-l">
              <span class="mdc-list-item__primary-text list__item--info"
                :title="item.info"
              >
                {{
                  (item.info.split(',').length === 3)
                  ? item.info.split(',')[item.info.split(',').length - 1]
                  : `${item.info.split(',')[item.info.split(',').length - 2]}, ${
                    item.info.split(',')[item.info.split(',').length - 1]}`
                }}
              </span>
              <span class="mdc-list-item__secondary-text">
                <span class='list__item--coords'>{{
                    Math.floor(item.coords[0] * 1000) / 1000
                  }}
                </span>
                <span class='list__item--coords'>{{
                    Math.floor(item.coords[1] * 1000) / 1000
                  }}
                </span>
              </span>
            </span>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import { onUpdated, ref } from 'vue';
import { mapGetters, useStore } from 'vuex';

// компенсационный компонент. я не разобрался
// как расширить полигон МКАДа, и, в качестве компенсации
// своих недоработок, написал простой лист, отражающий
// историю маршрутов. по клику на итем листа 
// отражается выбранный маршрут на карте.
export default {
  name: 'HistoryList',
  data() {
    return {
      openMenu: true,
    };
  },
  computed: {
    ...mapGetters([
      'getCoords',
    ]),
  },
  setup() {
    const store = useStore();

    const refOfList = ref();
    onUpdated(() => {
      refOfList.value.scrollTo(0, 9999);
    });

    const setRouteOfHistory = (coords) => {
      store.dispatch('setHistoryCoords', coords);
    };

    return {
      refOfList,
      setRouteOfHistory,
    };
  },
};
</script>

<style scoped lang='scss'>
.menu {
  position: absolute;
  top: 180px;
  right: 10px;
};

.btn, .menu {
  max-width: 300px;
  min-width: 200px;
  width: 20vw;
};

.btn {
  animation: visible 1s ease both;
}

@keyframes visible {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.mdc-menu-surface {
  display: inline-block;
  position: relative;
  animation: menu-close 2s ease both;

  &--open {
    animation: menu-open 2s ease both;
  }
}

@keyframes menu-open {
  0% {
    height: 0;
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    height: 32vh;
    opacity: 1;
  }
}

@keyframes menu-close {
  0% {
    height: 32vh;
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    height: 0;
    opacity: 0;
  }
}

.list {
  height: 30vh;
  overflow-y: scroll;

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &__item {
    transition: all 1s ease;

    &--info {
      max-width: 250px;
      min-width: 130px;
      width: 15.4vw;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    };

    &--info{
      line-height: 3;
      font-size: 1em;
    };

    &--coords {
      margin-left: 0.5em;
      font-size: 0.9em;
    };
  };
};

.al-l{
  text-align: start;
};
</style>
