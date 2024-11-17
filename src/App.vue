<template>
  <div :class="['container', { 'dark-theme': isDarkTheme }]">
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
        <button class="theme-btn" @click="toggleTheme">
          <component :is="isDarkTheme ? 'LightElement' : 'DarkElement'" />
        </button>
        <button ref="togglebtnRef" class="toggle-btn" @click="toggleSidebar">
          <ReductionIcon />
        </button>
      </div>
    </aside>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LogoIcon from "@/components/sidebar/icons/LogoIcon.vue";
import LightElement from "@/components/sidebar/icons/LightElement.vue";
import DarkElement from "@/components/sidebar/icons/DarkElement.vue";
import HomeIcon from "@/components/sidebar/icons/HomeIcon.vue";
import ViewIcon from "@/components/sidebar/icons/ViewIcon.vue";
import ReductionIcon from "@/components/sidebar/icons/ReductionIcon.vue";

export default Vue.extend({
  components: {
    LogoIcon,
    DarkElement,
    LightElement,
    HomeIcon,
    ViewIcon,
    ReductionIcon,
  },
  data() {
    return {
      isDarkTheme: false,
    };
  },
  methods: {
    toggleTheme(): void {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem("darkTheme", this.isDarkTheme ? "true" : "");
    },
    toggleSidebar() {
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
    if (localStorage.getItem("darkTheme")) this.isDarkTheme = true;
  },
});
</script>
