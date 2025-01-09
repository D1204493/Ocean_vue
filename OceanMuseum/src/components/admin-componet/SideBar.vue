<template>
  <div class="sidebar">
    <!-- 用戶區塊 -->
    <div class="user-section text-center py-3 mt-4">
      <img src="/img/ocean-logo.png" class="rounded-circle mb-2" alt="User Avatar">
      <p class="text-white mb-0">admin</p>
    </div>

    <!-- 選單項目 -->
    <ul class="nav flex-column mt-4">
<!--      <li class="nav-item">-->
<!--        <router-link to="/admin/home" class="nav-link text-white">-->
<!--          <i class="bi bi-cart me-2"></i> 銷售報表-->
<!--        </router-link>-->
<!--      </li>-->
      <li class="nav-item">
        <!-- 父項目，點擊展開/收起 -->
        <div class="nav-link text-white d-flex align-items-center" @click="toggleExpand">
          <i class="bi bi-house-door me-2"></i> 展場管理
          <i :class="expandIcon" class="ms-auto"></i>
        </div>

        <!-- 子選項（展開/收起控制） -->
        <ul v-if="isExpanded" class="sub-menu ps-4">
          <li>
            <router-link to="/admin-component/QA" class="nav-link text-white">
              Q&A 管理
            </router-link>
          </li>
          <li>
            <router-link to="/admin-component/img" class="nav-link text-white">
              圖片管理
            </router-link>
          </li>
        </ul>
      </li>
      <!-- -->
      <li class="nav-item">
        <router-link to="/admin-component/ticket" class="nav-link text-white">
          <i class="bi bi-ticket me-2"></i> 票務管理
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin-component/product" class="nav-link text-white">
          <i class="bi bi-cart me-2"></i> 商品管理
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isExpanded: false,
    }
  },
  computed:{
    expandIcon() {
      return this.isExpanded ? 'bi bi-chevron-down' : 'bi bi-chevron-right';
    }
  },
  methods:{
    toggleExpand() {
      this.isExpanded = !this.isExpanded; // 切換展開/收起狀態
    }
  }
};
</script>

<style scoped>
/* Sidebar 基本樣式 */
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #fff;
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

/* 用戶區塊 */
.user-section img {
  width: 70px;
  height: 70px;
}

/* 選單樣式 */
.nav {
  width: 100%; /* 確保選單寬度填滿 */
}

.nav-item {
  width: 100%; /* 每個項目寬度填滿 */
}

.nav-link {
  color: #adb5bd;
  padding: 15px 20px; /* 增加上下間距 */
  text-decoration: none;
  width: 100%; /* 填滿 sidebar */
  display: flex;
  align-items: center;
  justify-content: start; /* 左對齊內容 */
  transition: background-color 0.3s;
  font-size: 24px;
}

.nav-link:hover {
  background-color: #3c4d63;
  color: #fff;
}

.nav-link.active {
  background-color: #1f2a38;
  color: #fff;
}
.sub-menu {
  list-style-type: none;
  padding: 0;
}
.sub-menu li {
  margin-top: 5px;
}
.nav-link.text-white {
  color: #adb5bd;
}
</style>
