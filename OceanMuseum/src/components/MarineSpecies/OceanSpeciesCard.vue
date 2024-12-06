<template>
    <div class="page-container">
        <!-- 搜索和分類區域 -->
        <div class="nav-bar">
            <!-- 分類標籤 -->
            <div class="category-buttons">
                <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
                    :class="['category-button', selectedCategory === category.id ? 'active' : '']">
                    {{ category.name }}
                </button>
            </div>

            <!-- 搜索框 -->
            <div class="search-box">
                <input type="text" v-model="searchQuery" placeholder="搜尋海洋生物" class="search-input" />
                <span class="search-icon">🔍</span>
            </div>
        </div>

        <!-- 圖片網格 -->
        <div class="image-grid">
            <div v-for="species in filteredSpecies" :key="species.species_id" class="card" @click="navigateToSpecies(species.species_id)">
                <!-- :src 是動態綁定圖片源。:alt 綁定圖片的替代文字為物種名稱。 -->
                <img :src="getImageUrl(species.image_url)" :alt="species.name" class="card-image" />
                <div class="card-overlay">
                    <h3 class="card-title">{{ species.name }}</h3>
                    <p class="card-description">{{ species.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MarineGallery',
    data() {
        return {
            selectedCategory: 'all',
            searchQuery: '',
            categories: [
                { id: 'all', name: '全部' },
                { id: 'deep-sea', name: '深海生物' },
                { id: 'shallow-water', name: '淺水生物' },
                { id: 'mammals', name: '鳥類與其他' }
            ],
            marineSpecies: []
        }
    },
    computed: {
        filteredSpecies() {
            return this.marineSpecies.filter(species => {
                const matchesCategory = this.selectedCategory === 'all' || species.category === this.selectedCategory
                const matchesSearch = species.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                return matchesCategory && matchesSearch
            })
        }
    },
    methods: {
        async fetchMarineSpecies() {
            try {
                const response = await fetch('http://localhost:8080/MarineSpecies/get');
                const data = await response.json();
                this.marineSpecies = data;
            } catch(error) {
                console.log('Error fetching MarineSpecies: ', error);
            }
        },
        navigateToSpecies(id) {
            try {
                // 使用路由導航到物種詳情頁，並傳遞物種ID
                this.$router.push({
                    name: 'SpeciesAnnotate',
                    params: { id: id.toString() }
                });
            } catch (error) {
                console.error('Navigation error: ', error);
            }
        },
        getImageUrl(imageUrl) {
            // 如果是相對路徑，加上 API 基礎 URL
            return imageUrl.startsWith('http') ? imageUrl : `http://localhost:8080/${imageUrl}`;
        },
    },
    mounted() {
        this.fetchMarineSpecies();
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