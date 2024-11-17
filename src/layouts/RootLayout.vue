<template>
  <div :class="['container', { 'dark-theme': isDarkTheme }]">
    <SidebarElement :isDarkTheme="isDarkTheme" :toggleTheme="toggleTheme" />
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SidebarElement from "@/components/sidebar/SidebarElement.vue";

export default Vue.extend({
  name: "RootLayout",
  components: {
    SidebarElement,
  },
  data() {
    return {
      isDarkTheme: false,
    };
  },
  created() {
    const LOCAL_STORAGE_KEY = "darkTheme";
    this.isDarkTheme = !!localStorage.getItem(LOCAL_STORAGE_KEY);
  },
  methods: {
    toggleTheme(newValue: boolean) {
      this.isDarkTheme = newValue;
      localStorage.setItem("darkTheme", newValue ? "true" : "");
    },
  },
});
</script>
