<template>
  <div id="app">
    <header>
      <h1>Fakultetski bodovi</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<style>
  
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  font-family: Arial, sans-serif;
}

header {
  margin-bottom: 24px;
}

nav a {
  margin-right: 12px;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
