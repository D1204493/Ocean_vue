<script setup>
import MuseumHeader from '../../components/MuseumHeader.vue'
import MuseumNavBar from '../../components/MuseumNavBar.vue'
import QandA from '../../components/FQA/Q&A.vue'
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
            <QandA />
        </div>
    </div>
    <Footer />

</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
}

.museum-app {
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    /* 防止水平滾動 */
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
    width: 100%;
    margin: 0 auto;
    min-height: calc(100vh - 120px);
    overflow-y: auto;
    padding: 20px;
    margin-top: 180px;
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
@media (min-width: 1024px) {
    .content-container {
        padding: 45px;
        max-width: 100%; /* 移除最大寬度限制 */
    }
}

@media (max-width: 860px) {
    .content-container {
        margin-top: 200px;
    }
}

@media (max-width: 768px) {
    .content-container {
        margin-top: 400px;
    }
}


</style>