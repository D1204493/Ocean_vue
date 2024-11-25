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
            <div v-for="animal in filteredAnimals" :key="animal.id" class="card" @click="navigateToSpecies(animal.id)">
                <img :src="animal.image" :alt="animal.name" class="card-image" />
                <div class="card-overlay">
                    <h3 class="card-title">{{ animal.name }}</h3>
                    <p class="card-description">{{ animal.description }}</p>
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
            animals: [
                {
                    id: 1,
                    name: '海獺',
                    category: 'mammals',
                    image: '/img/OceanSpecies/海獺.jpg',
                    description: '可愛的海洋哺乳動物',
                    images: ['/img/OceanSpecies/水獺1.jpg', '/img/OceanSpecies/水獺2.jpg'],
                    fullDescription: '海獺（學名：Enhydra lutris）是食肉目動物中最適應海中生活的物種，很少在陸地或冰上覓食，大半的時間都待在水裡，連生產與育幼也都在水中進行。大部分時間裡，海獺不是仰躺著浮在水面上，就是潛入海床覓食。當牠們待在海面時，幾乎一直在整理毛皮，保持它的清潔與防水性。科學家已辨識出三個不同的亞種，分別位於美國加州、阿拉斯加及俄羅斯等地。各地的海獺族群皆以各自的棲地命名[1]:91。屬名Enhyra源自希臘文的En加上hydōr，意為「在水裡面」；種名lutris則源自拉丁文lutra，也是水獺的意思。'
                },
                {
                    id: 2,
                    name: '水母',
                    category: 'deep-sea',
                    image: '/img/OceanSpecies/水母.jpg',
                    description: '深海中的發光生物',
                    images: ['/img/OceanSpecies/水母1.jpg', '/img/OceanSpecies/水母2.jpg'],
                    fullDescription: '水母'
                },
                {
                    id: 3,
                    name: '翻車魚',
                    category: 'deep-sea',
                    image: '/img/OceanSpecies/翻車魚.jpg',
                    description: '深海奇特魚類',
                    images: ['/img/OceanSpecies/翻車魚1.jpg', '/img/OceanSpecies/翻車魚2.png'],
                    fullDescription: '翻車魚'
                },
                {
                    id: 4,
                    name: '小丑魚',
                    category: 'shallow-water',
                    image: '/img/OceanSpecies/小丑魚.jpg',
                    description: '珊瑚礁區的居民',
                    images: ['/img/OceanSpecies/小丑魚1.jpg', '/img/OceanSpecies/小丑魚2.jpg'],
                    fullDescription: '小丑魚'
                },
                {
                    id: 5,
                    name: '海獅',
                    category: 'mammals',
                    image: '/img/OceanSpecies/海獅.jpg',
                    description: '活潑的海洋哺乳動物',
                    images: ['/img/OceanSpecies/海獅1.jpg', '/img/OceanSpecies/海獅2.jpg'],
                    fullDescription: '海獅'
                },
                {
                    id: 6,
                    name: '海豚',
                    category: 'mammals',
                    image: '/img/OceanSpecies/海豚.jpg',
                    description: '智慧的海洋哺乳動物',
                    images: ['/img/OceanSpecies/海豚1.jpg', '/img/OceanSpecies/海豚2.jpg'],
                    fullDescription: '海豚'
                },
                {
                    id: 7,
                    name: '海象',
                    category: 'mammals',
                    image: '/img/OceanSpecies/海象.jpg',
                    description: '北極圈的居民',
                    images: ['/img/OceanSpecies/海象1.jpg', '/img/OceanSpecies/海象2.jpg'],
                    fullDescription: '海象'
                },
                {
                    id: 8,
                    name: '海龜',
                    category: 'shallow-water',
                    image: '/img/OceanSpecies/海龜.jpg',
                    description: '優雅的海洋爬行動物',
                    images: ['/img/OceanSpecies/海龜2.jpg', '/img/OceanSpecies/海龜3.jpg'],
                    fullDescription: '海龜是海洋龜類的總稱，所有龜鱉目動物中唯一生活在海洋的物種，分布範圍十分平均，分布於除北冰洋外的全球海域中。背上有殼，其花紋較一般陸龜或河龜複雜，背甲為扁平流線形，前後鰭為舟漿狀。'
                }
            ]
        }
    },
    computed: {
        filteredAnimals() {
            return this.animals.filter(animal => {
                const matchesCategory = this.selectedCategory === 'all' || animal.category === this.selectedCategory
                const matchesSearch = animal.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                return matchesCategory && matchesSearch
            })
        }
    },
    methods: {
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
        }
    },
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