<template>
  <aside ref="sidebarRef" class="sidebar">
    <div class="logo">
      <LogoIcon />
      <span>FractalUp</span>
    </div>
    <nav class="nav-c">
      <ul class="nav-ul">
        <li class="link">
          <router-link to="/"><HomeIcon /><span>Home</span></router-link>
        </li>
        <li class="link">
          <router-link to="/view-one"
            ><ViewIcon /><span>View 1</span></router-link
          >
        </li>
        <li class="link">
          <router-link to="/view-two"
            ><ViewIcon /><span>View 2</span></router-link
          >
        </li>
      </ul>
    </nav>
    <div class="foot">
      <button class="theme-btn" @click="toggleThemeLocal">
        <component :is="isDarkTheme ? 'LightElement' : 'DarkElement'" />
      </button>
      <button ref="togglebtnRef" class="toggle-btn" @click="toggleSidebar">
        <ReductionIcon />
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from "vue";
import LogoIcon from "./icons/LogoIcon.vue";
import LightElement from "./icons/LightElement.vue";
import DarkElement from "./icons/DarkElement.vue";
import HomeIcon from "./icons/HomeIcon.vue";
import ViewIcon from "./icons/ViewIcon.vue";
import ReductionIcon from "./icons/ReductionIcon.vue";

export default Vue.extend({
  components: {
    LogoIcon,
    DarkElement,
    LightElement,
    HomeIcon,
    ViewIcon,
    ReductionIcon,
  },
  props: {
    isDarkTheme: Boolean,
    toggleTheme: Function,
  },
  methods: {
    toggleThemeLocal() {
      this.toggleTheme(!this.isDarkTheme);
    },
    toggleSidebar(): void {
      const sidebar = this.$refs.sidebarRef as HTMLElement;
      const togglebtn = this.$refs.togglebtnRef as HTMLElement;
      const isReduced = sidebar.classList.toggle("reduced");
      togglebtn.classList.toggle("rotate", isReduced);
      localStorage.setItem("sidebarStatus", isReduced ? "reduced" : "");
    },
  },
  mounted() {
    if (localStorage.getItem("sidebarStatus")) {
      const sidebar = this.$refs.sidebarRef as HTMLElement;
      const togglebtn = this.$refs.togglebtnRef as HTMLElement;
      sidebar.classList.add("reduced");
      togglebtn.classList.add("rotate");
    }
    // if (localStorage.getItem("darkTheme")) this.isDarkTheme = true;
  },
});
</script>
