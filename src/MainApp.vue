<template>
  <RootLayout>
    <router-view />
  </RootLayout>
</template>

<script lang="ts">
import Vue from "vue";
import RootLayout from "@/layouts/RootLayout.vue";

export default Vue.extend({
  name: "MainApp",
  components: {
    RootLayout,
  },
});
</script>
