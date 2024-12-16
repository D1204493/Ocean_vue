<template>
    <div class="museum-app">
      <div class="fixed-header">
        <div class="header-wrapper">
          <MuseumHeader />
          <MuseumNavBar />
        </div>
      </div>
      <div class="content-container">
        <home-page/>
        <Reports />
      </div>
    </div>
  </template>
  
  <script>
  import MuseumHeader from '../components/MuseumHeader.vue'
  import MuseumNavBar from '../components/MuseumNavBar.vue'
  import Reports from '../components/homePage/Reports.vue'
  
  export default {
    name: 'HomeView_Reports',
    components: {
      MuseumHeader,
      MuseumNavBar,
      Reports
    }
  }
  </script>
  
  <style scoped>
  .museum-app {
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
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
    min-height: calc(100vh - 120px);
    overflow-y: auto;
  }
  
  @media (max-width: 768px) {
    .content-container {
      padding-top: 360px;
    }
  }
  </style>