<script setup>
import { RouterLink, RouterView } from 'vue-router'

import MuseumHeader from './components/MuseumHeader.vue'
import MuseumNavBar from './components/MuseumNavBar.vue'
</script>

<template>

  <div class="museum-app">
    <div class="fixed-header">
      <div class="header-wrapper">
        <MuseumHeader />
        <MuseumNavBar />
      </div>
    </div>
    <div class="content-container">
      <!-- 這裡放置主要內容 -->
      <RouterView />
    </div>
  </div>

  <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

  <RouterView /> -->
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.museum-app {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
}

.header-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px;
  width: 100%;
}

.content-container {
  padding-top: 180px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header 和 NavBar 的基本樣式 */
.museum-header,
.nav-bar {
  width: 100%;
  display: flex;
  justify-content: center;
}

.header-container,
.nav-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.museum-header {
  background-color: #E6EEF9;
  padding: 8px 0;
}

.nav-bar {
  background-color: white;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

/* 響應式設計 */
@media (max-width: 1200px) {
  .header-container,
  .nav-container {
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  .header-wrapper {
    padding: 8px;
  }
  
  .content-container {
    padding-top: 220px;
  }
}
</style>