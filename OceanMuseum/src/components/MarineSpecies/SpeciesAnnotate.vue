<template>
    <div class="container">
      <!-- 左側圖片區域 -->
      <div class="image-section">
        <div class="carousel">
          <div class="carousel-content">
            <button @click="prevImage" class="carousel-btn prev-btn">
              <span class="chevron">&#10094;</span>
            </button>
            
            <div class="image-container">
              <TransitionGroup name="slide">
                <img
                  v-for="(image, idx) in images"
                  :key="idx"
                  v-show="currentIndex === idx"
                  :src="image.url"
                  :alt="image.alt"
                  class="carousel-image"
                />
              </TransitionGroup>
            </div>

            <button @click="nextImage" class="carousel-btn next-btn">
              <span class="chevron">&#10095;</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 右側說明區域 -->
      <div class="info-section">
        <div class="info-card">
          <div class="card-header">
            <h2 class="species-title">{{ currentSpecies.name }}</h2>
            <button v-if="showCard" @click="closeCard" class="close-btn">×</button>
          </div>
          
          <div class="card-content">
            <div class="description">
              <span class="pin-icon">📍</span>
              <p class="species-description">{{ currentSpecies.description }}</p>
            </div>
          </div>

          <div class="card-footer">
            <button class="location-btn">所在館區</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  
  data() {
    return {
      images: [
        {
          url: 'img/OceanSpecies/海龜2.jpg',
          alt: 'Sea Turtle Swimming'
        },
        {
          url: 'img/OceanSpecies/海龜3.jpg',
          alt: 'Sea Turtle in Coral Reef'
        }
      ],
      currentIndex: 0,
      showCard: true,
      currentSpecies: {
        name: '海龜',
        description: '海龜是海洋龜類的總稱，所有龜鱉目動物中唯一生活在海洋的物種，分布範圍十分平均，分布於除北冰洋外的全球海域中。背上有殼，其花紋較一般陸龜或河龜複雜，背甲為扁平流線形，前後鰭為舟漿狀。'
      }
    }
  },

  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },
    
    prevImage() {
      this.currentIndex = this.currentIndex === 0 
        ? this.images.length - 1 
        : this.currentIndex - 1
    },
    
    closeCard() {
      this.showCard = false
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  background-color: #1e293b;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr; /* 修改這裡：改為 2:1 的比例 */
  gap: 1.5rem;
}

/* 左側圖片區域樣式 */
.image-section {
  width: 100%;
}

.carousel {
  position: relative;
  width: 100%;
  height: 24rem;
}

/* 其餘樣式保持不變... */
.carousel-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* 右側說明區域樣式 */
.info-section {
  width: 100%;
}

.info-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 輪播按鈕樣式 */
.carousel-btn {
  position: absolute;
  z-index: 10;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.prev-btn {
  left: 0.5rem;
}

.next-btn {
  right: 0.5rem;
}

.chevron {
  font-size: 1.5rem;
  line-height: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.species-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.close-btn {
  color: #6b7280;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.close-btn:hover {
  color: #374151;
}

.card-content {
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.description {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.pin-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: #6b7280;
}

.species-description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
}

.card-footer {
  margin-top: auto;
}

.location-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.location-btn:hover {
  background-color: #d97706;
}

/* 輪播動畫 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr; /* 在手機版時改為單列 */
    gap: 1rem;
    padding: 1rem;
  }

  .carousel {
    height: 16rem;
  }

  .info-card {
    padding: 1rem;
  }

  .species-title {
    font-size: 1.25rem;
  }

  .species-description {
    font-size: 0.875rem;
  }
}
</style>