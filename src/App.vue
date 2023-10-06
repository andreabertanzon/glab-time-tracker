<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuBar from './components/MenuBar.vue'
import RecapContainer from './components/RecapContainer.vue'
</script>

<template>
  <div class="grid grid-cols-12 gap-4 h-screen">
    <!-- Left Section -->

    <!-- Center Section -->
    <div class="col-span-8">
      <div class="flex flex-row">
        <div class="flex-2 px-4 mr-6 bg-container-blue rounded-r-xl">
          <MenuBar />
        </div>
        <div class="flex-1 h-screen">
          <RouterView />
        </div>
      </div>
    </div>

    <!-- Right Section -->
    <div class="col-span-4">
      <RecapContainer />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
