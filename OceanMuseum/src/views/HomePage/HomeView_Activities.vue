<script setup>
import MuseumHeader from '../../components/MuseumHeader.vue'
import MuseumNavBar from '../../components/MuseumNavBar.vue'
import HomePage from '../../components/homePage/HomePage.vue'
import News from '../../components/homePage/News.vue';
import Reports from '../../components/homePage/Reports.vue';
import Activities from '../../components/homePage/Activities.vue';
import Footer from '../../components/Footer.vue'

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
      <HomePage>
        <Activities :museumPosts="museumPosts" />
      </HomePage>
    </div>
  </div>
  <Footer />
</template>

<script>

export default {
  name: 'HomeView_Activities',
  components: {
    MuseumHeader,
    MuseumNavBar,
    Activities
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

@media (max-width: 2230px) {
  .content-container {
    padding-top: 200px;
  }
}

@media (max-width: 1200px) {

  .header-container,
  .nav-container {
    padding: 0 16px;
  }

  .content-container {
    padding-top: 200px;
  }
}

@media (max-width: 1023px) {
  .content-container {
    padding-top: 210px;
  }
}

@media (max-width: 811px) {
  .content-container {
    padding-top: 230px;
  }
}

@media (max-width: 768px) {
  .header-wrapper {
    padding: 8px;
  }

  .content-container {
    padding-top: 400px;
  }
}

@media (max-width: 495px) {
  .content-container {
    padding-top: 450px;
  }
}

@media (max-width: 480px) {
  .content-container {
    padding-top: 490px;
  }
}

@media (max-width: 384px) {
  .content-container {
    padding-top: 530px;
  }
}
</style>