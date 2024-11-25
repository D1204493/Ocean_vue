<!-- MuseumHeader.vue -->
<template>
  <header class="museum-header">
    <div class="header-container">
      <!-- Logo and Title Section -->
      <div class="logo-section">
        <div class="logo-container">
          <router-link to="/">
            <img src="/img/OceanLogo-removebg.png" alt="WhaleLogo" class="logo-image">
          </router-link>
        </div>
      </div>

      <!-- Search and Text Size Section -->
      <div class="tools-section">
        <!-- Search Bar -->
        <div class="search-container">
          <input v-model="searchQuery" type="search" placeholder="搜尋" class="search-input" />
          <button class="search-button" aria-label="搜尋">
            <svg class="search-icon" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </button>
        </div>

        <!-- Text Size Controls -->
        <div class="text-size-controls">
          <span>字級:</span>
          <div class="size-buttons">
            <button v-for="(size, index) in textSizes" :key="index" @click="changeTextSize(index)"
              :class="['size-button', { active: currentTextSize === index }]">
              <span :style="{ fontSize: `${12 + index * 2}px` }">T</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MuseumHeader',
  data() {
    return {
      searchQuery: '',
      textSizes: ['T', 'T', 'T'],
      currentTextSize: 1
    }
  },
  methods: {
    changeTextSize(index) {
      this.currentTextSize = index;
      // 這裡可以添加改變網站字體大小的邏輯
    }
  }
}
</script>


<style scoped>
.museum-header {
  background-color: #E6EEF9;
  border-radius: 20px;
  padding: 8px 16px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-container a,
.logo-container router-link {
  text-decoration: none;
  display: inline-block;
  line-height: 0;
  /* 消除額外空間 */
  font-size: 0;
  /* 消除文字影響 */
}

.logo-container a:hover {
  background: none;
  opacity: 0.7;
  /* 添加輕微透明效果 */
}

.logo-image {
  width: auto;
  height: 70px;
  object-fit: contain;
}

.title-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title-section h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.2;
}

.title-section p {
  font-size: 14px;
  color: #666;
  margin: 4px 0 0 0;
  line-height: 1.2;
}

.tools-section {
  display: flex;
  align-items: center;
  gap: 24px;
}

.search-container {
  position: relative;
}

.search-input {
  width: 260px;
  padding: 8px 16px;
  padding-right: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.search-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.text-size-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 24px;
  border-left: 1px solid #ccc;
}

.text-size-controls span {
  font-size: 14px;
  color: #666;
}

.size-buttons {
  display: flex;
  gap: 4px;
}

.size-button {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.size-button:hover {
  background-color: #dbe7f6;
}

.size-button.active {
  background-color: #bed4f0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 16px;
    padding: 12px;
  }

  .logo-section {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .title-section {
    align-items: center;
  }

  .tools-section {
    width: 100%;
    flex-direction: column;
    gap: 16px;
  }

  .search-container {
    width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .text-size-controls {
    border-left: none;
    padding-left: 0;
    justify-content: center;
    width: 100%;
  }
}
</style>