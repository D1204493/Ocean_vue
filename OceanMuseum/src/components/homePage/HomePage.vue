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
        <div v-if="filteredPosts.length">
          <router-view :museumPosts="filteredPosts" />
        </div>
        <div v-else>
          <p class="text-muted">目前沒有資料。</p>
        </div>  
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        museumPosts: [], // 儲存後端返回的文章資料
        searchQuery: '', // 搜尋框輸入內容
        activeType: 'NEWS', // 預設顯示的文章類型
        navLinks: [
          { name: '館方快訊', type: "NEWS" },
          { name: '相關報導', type: "REPORT" },
          { name: '科教活動', type: "ACTIVITY" }
        ]
      };
    },
    computed: {
      // 搜尋功能過濾資料
      filteredPosts() {
        if (!this.museumPosts) return [];
        return this.museumPosts.filter(post => 
          post.details.toLowerCase().includes(this.searchQuery.toLowerCase()) || post.summary.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      // 切換文章類型並調用 API
      async changeType(type) {
        this.activeType = type; // 更新當前類型
        await this.fetchPosts(type); // 調用 API 獲取資料
      },

    // 從後端 API 獲取所有文章資料
    async fetchPosts(type) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/all?type=${type}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.museumPosts = await response.json();
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },

    // 處理搜尋事件
    handleSearch() {
      console.log("Search Query:", this.searchQuery);
    }
  },
  mounted() {
    // 組件掛載時預設加載 "NEWS" 類型的文章
    this.fetchPosts(this.activeType);
  }
};
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