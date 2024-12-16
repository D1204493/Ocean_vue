<template>
    <div class="announcement-container">
      <div class="content-wrapper p-4">
        <!-- Navigation Links -->
        <div class="nav-buttons mb-4">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="btn custom-nav-btn me-3"
            :class="{ active: $route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </div>
  
        <!-- Search Section -->
        <div class="search-section mb-4">
          <div class="card search-card border-0 shadow-sm">
            <div class="card-body">
              <div class="form-floating">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="標題/內容搜尋"
                  class="form-control search-input"
                  @input="handleSearch"
                />
                <label class="search-label">標題/內容搜尋</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Display Content Dynamically -->
        <slot>
          <router-view :news="filteredNews" :reports="filteredReports" :activities="filteredActivities" />  
        </slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
 
  
  // 控制展開狀態
  const searchQuery = ref('')
  
 
  
  // 導航連結
  const navLinks = ref([
    { name: '館方快訊', path: '/news' },
    { name: '相關報導', path: '/reports' },
    { name: '科教活動', path: '/activities' }
  ])
  
  // computed properties 之後將與後端 API 整合
const filteredNews = computed(() => [])
const filteredReports = computed(() => [])
const filteredActivities = computed(() => [])


  </script>
  
  <style scoped>
  .announcement-container {
    min-height: 100vh;
    background: #f8f9fa;
    overflow-x: hidden;
  }
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Navigation Buttons */
  .custom-nav-btn {
    color: #334255;
    background-color: #fff;
    border: 1px solid #dee2e6;
    padding: 0.5rem 1.5rem;
    transition: all 0.2s ease;
  }
  
  .custom-nav-btn:hover,
  .custom-nav-btn.active {
    color: #0F2540;
    background-color: #FFCD50;
    border-color: #FFCD50;
  }
  
  /* Search Section */
  .search-card {
    background: rgba(255, 255, 255, 0.9);
  }
  
  .search-input {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .search-input:focus {
    border-color: #FFCD50;
    box-shadow: 0 0 0 0.25rem rgba(255, 205, 80, 0.25);
  }
  
  .search-label {
    color: #495057;
  }
  
  /* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }

  .custom-nav-btn {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
}
  </style>