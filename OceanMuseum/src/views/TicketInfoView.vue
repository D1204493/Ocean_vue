<script setup>
import MuseumHeader from '../components/MuseumHeader.vue'
import MuseumNavBar from '../components/MuseumNavBar.vue'
import OrderTicketInfo from '../components/Ticket/OrderTicketInfo.vue'

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
            <OrderTicketInfo />
        </div>
    </div>
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
    padding-top: 180px;
    /* 調整這個值以匹配 header 的實際高度 */
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    min-height: calc(100vh - 120px);
    /* 確保內容區域有足夠的高度 */
    overflow-y: auto;
    /* 允許內容區域滾動 */
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
@media (max-width: 2230px) {
    .content-container {
        padding-top: 230px;
    }
}

@media (max-width: 1200px) {

    .header-container,
    .nav-container {
        padding: 0 16px;
    }

    .content-container {
        padding-top: 230px;
    }
}

@media (max-width: 1023px) {
    .content-container {
        padding-top: 190px;
    }
}

@media (max-width: 900px) {
    .content-container {
        padding-top: 200px;
    }
}

@media (max-width: 768px) {
    .header-wrapper {
        padding: 8px;
    }

    .content-container {
        padding-top: 410px;
    }
}
</style>