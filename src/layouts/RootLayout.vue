<template>
  <div :class="['container', { 'dark-theme': isDarkTheme }]">
    <SidebarElement
      :isDarkTheme="isDarkTheme"
      @update:isDarkTheme="updateTheme"
    />
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
    this.isDarkTheme = !!localStorage.getItem("darkTheme");
  },
  methods: {
    updateTheme(newValue: boolean) {
      this.isDarkTheme = newValue;
      localStorage.setItem("darkTheme", newValue ? "true" : "");
    },
  },
});
</script>
