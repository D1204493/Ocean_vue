<template>
    <div class="news-container">
        <div class="news-header">
            <h2>館方快訊</h2>
            <div class="filter-box">
                <input type="text" v-model="searchQuery" placeholder="搜尋快訊" class="search-input" />
                <span class="search-icon">🔍</span>
            </div>
        </div>
        <div class="news-grid">
            <div v-for="news in filteredNews" :key="news.id" class="news-card" @click="navigateToNews(news.id)">
                <div class="news-info">
                    <span class="news-date">{{ formatDate(news.date) }}</span>
                    <span class="news-category">{{ news.category }}</span>
                </div>
                <div class="news-content">
                    <h3 class="news-title">{{ news.title }}</h3>
                    <p class="news-description">{{ news.details }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MuseumNews',
    data() {
        return {
            searchQuery: '',
            news: [
                {
                    id: 1,
                    date: '2024/11/1',
                    category: '館方快訊',
                    title: '世界海洋日活動公告',
                    details: '為慶祝世界海洋日，本館將於本月舉辦一系列活動，包括專題講座、互動展覽及海洋生態影片放映，歡迎踴躍參加！'
                },
                {
                    id: 2,
                    date: '2024/10/28',
                    category: '館方快訊',
                    title: '新海洋生物展區啟用',
                    details: '本館新設的海洋生物展區於今日正式啟用，展出來自深海的珍稀魚類及珊瑚群，適合全家大小一同探索。'
                },
                {
                    id: 3,
                    date: '2024/10/15',
                    category: '館方快訊',
                    title: '博物館修復通知',
                    details: '為改善參觀體驗，本館將於下週進行部分區域的修繕工作，部分展區將暫停開放，不便之處敬請見諒。'
                },
                {
                    id: 4,
                    date: '2024/10/5',
                    category: '館方快訊',
                    title: '中秋節特展圓滿落幕',
                    details: '感謝各位支持中秋節特展！共吸引超過10,000名遊客，透過活動加深對海洋文化的認識。'
                },
                {
                    id: 5,
                    date: '2024/9/30',
                    category: '館方快訊',
                    title: '館方志工招募',
                    details: '本館正在招募志工，主要協助展覽解說及活動籌備，提供多元學習機會並頒發證書。'
                }
            ]
        }
    },
    computed: {
        filteredNews() {
            const query = this.searchQuery.toLowerCase()
            return this.news.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.details.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            )
        }
    },
    methods: {
        navigateToNews(id) {
            this.$router.push({ name: 'NewsDetail', params: { id: id.toString() }})
        },
        formatDate(date) {
            const d = new Date(date)
            return `${d.getFullYear() - 1911}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`
        }
    }
}
</script>

<style scoped>
/* 確保根元素和 body 可以伸展 */
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

/* 基本布局 */
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    /* 確保至少有視窗高度 */
    overflow-y: auto;
    /* 允許垂直滾動 */
}

.nav-bar {
    margin-bottom: 30px;
    padding: 15px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

/* 分類按鈕 */
.category-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.category-button {
    padding: 8px 20px;
    border-radius: 20px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s ease;
}

.category-button:hover {
    background-color: #e0e0e0;
}

.category-button.active {
    background-color: #ffa500;
    color: white;
}

/* 搜索框 */
.search-box {
    position: relative;
    margin-left: auto;
}

.search-input {
    width: 200px;
    padding: 8px 12px 8px 35px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #ffa500;
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.2);
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

/* 圖片網格，確保網格容器可以擴展 */
.image-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    min-height: 0;
    /* 防止網格撐開容器 */
}

/* 卡片樣式 */
.card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    cursor: pointer;
    transform: translateY(-5px);
}

.card-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
}

.card-title {
    font-size: 18px;
    margin-bottom: 5px;
}

.card-description {
    font-size: 14px;
    opacity: 0.9;
}

/* 響應式設計 */
@media screen and (max-width: 1200px) {
    .image-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (max-width: 900px) {
    .image-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .nav-bar {
        flex-direction: column;
        gap: 15px;
    }

    .search-box {
        width: 100%;
        margin: 0;
    }

    .search-input {
        width: 100%;
    }
}

@media screen and (max-width: 600px) {
    .image-grid {
        grid-template-columns: 1fr;
    }

    .category-buttons {
        justify-content: center;
        width: 100%;
    }
}
</style>