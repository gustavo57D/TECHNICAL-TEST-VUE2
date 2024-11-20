<template>
  <search class="search-section">
    <label ref="searchRef" role="search" class="search">
      <div>
        <span>Country</span>
        <input
          class="search-value"
          type="text"
          placeholder="Type the country you want to see"
          @focus="handleFocus"
          @input="handleInputChangue"
        />
      </div>
      <SearchElement />
    </label>
    <div ref="filterShow" class="filter-section hidden">
      <div class="filter-header">
        <span>Filter by continents</span>
        <button class="clean-filter" @click="handleFilterCleaning">
          Clear
        </button>
      </div>
      <div class="filter-main">
        <ContinentCards :handleCheckboxChange="handleCheckboxChange" />
      </div>
    </div>
  </search>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import SearchElement from "./icons/SearchElement.vue";
import ContinentCards from "./ContinentCards.vue";

export default Vue.extend({
  props: {
    handleInputChangue: {
      type: Function as PropType<(e: Event) => void>,
      required: true,
    },
    handleCheckboxChange: {
      type: Function as PropType<(e: Event) => void>,
      required: true,
    },
    handleFilterCleaning: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },

  components: {
    SearchElement,
    ContinentCards,
  },

  methods: {
    handleFocus() {
      const filterShow = this.$refs.filterShow as HTMLElement;
      filterShow.classList.remove("hidden");
    },
    handler(e: Event) {
      const searchRef = this.$refs.searchRef as HTMLElement;
      const filterShow = this.$refs.filterShow as HTMLElement;
      const target = e.target as Node | null;

      if (
        target &&
        !filterShow.contains(target) &&
        !searchRef.contains(target)
      ) {
        filterShow.classList.add("hidden");
      }
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.handler);
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.handler);
  },
});
</script>
