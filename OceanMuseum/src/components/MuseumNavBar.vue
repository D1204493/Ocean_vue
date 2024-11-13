<!-- MuseumNavBar.vue -->
<template>
    <nav class="nav-bar">
        <div class="nav-container">
            <a v-for="(item, index) in navItems" 
               :key="index" 
               href="#" 
               class="nav-item"
               :class="{ 'first-item': index === 0 }">
                <div class="nav-icon">
                    <img :src="item.icon" :alt="item.text" class="icon-image">
                </div>
                <span class="nav-text">{{ item.text }}</span>
            </a>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MuseumNavBar',
    data() {
        return {
            navItems: [
                { text: '最新動態', icon: '/src/components/icons/messages.png' },
                { text: '館場導覽', icon: '/src/components/icons/museum.png' },
                { text: '認識海洋生物', icon: '/src/components/icons/blowfish.png' },
                { text: '節目表', icon: '/src/components/icons/seal.png' },
                { text: '購票', icon: '/src/components/icons/tickets.png' },
                { text: '文創', icon: '/src/components/icons/puzzle.png' },
                { text: '服務功能介紹', icon: '/src/components/icons/personQA.png' }
            ]
        }
    }
}
</script>

<style scoped>
.nav-bar {
    width: 100%;
    background-color: white;
    padding: 10px 16px;
    border-radius: 5px;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.3s;
    position: relative; /* 為偽元素定位 */
}

/* 使用偽元素添加分隔線 */
.nav-item:not(.first-item)::before {
    content: '';
    position: absolute;
    left: -4px; /* 調整分隔線位置 */
    top: 50%;
    transform: translateY(-50%);
    height: 60%; /* 調整分隔線高度 */
    width: 1px;
    background-color: #ddd;
    transition: opacity 0.3s;
}

/* hover 時隱藏相鄰的分隔線 */
.nav-item:hover::before,
.nav-item:hover + .nav-item::before {
    opacity: 0;
}

.nav-item:hover {
    background-color: #6dc1ea;
    transform: translateY(-2px);
}

.nav-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
}

.icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.nav-text {
    font-size: 14px;
    text-align: center;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .nav-container {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }

    .nav-item {
        width: calc(25% - 12px);
        /* 每行4個項目，考慮間距 */
        flex: none;
    }

    /* 在移動端調整分隔線 */
    .nav-item::before {
        display: none; /* 移除分隔線 */
    }
}

@media (max-width: 480px) {
    .nav-item {
        width: calc(33.33% - 12px);
        /* 每行3個項目 */
    }
}
</style>