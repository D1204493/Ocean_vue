<!-- News.vue -->
<template>
  <div class="announcement-section">
    <div class="section-header mb-4">
      <h3 class="text-center section-title">館方快訊</h3>
    </div>

    <!-- 資料表格 -->
    <div v-if="filteredNews.length">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>日期</th>
            <th>標題</th>
            <th>摘要</th>
            <th>詳細內容</th>
            <th>地點</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredNews" :key="item.id" class="table-row">
            <td>{{ formatDate(item.date) }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.summary }}</td>
            <td>{{ item.details }}</td>
            <td>{{ item.locationId ? `地點 ${item.locationId}` : 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 無資料時顯示提示訊息 -->
    <div v-else class="no-data text-center">
      <p class="text-muted">目前沒有館方快訊。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  props: {
    museumPosts: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    // 過濾資料，只顯示 NEWS 且 status 為 active 的項目
    filteredNews() {
      if (!this.museumPosts) return [];
    return this.museumPosts.filter(post => 
      post.type === 'NEWS' && post.status === 'active'
    );
   }
  },
  methods: {
    // 格式化日期為台灣格式 yyyy/MM/dd
    formatDate(date) {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.announcement-section {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-title {
  color: #333;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th {
  background-color: #f8f9fa;
  color: #333;
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #FFCD50;
}

.table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
}

.table-row:hover {
  background-color: rgba(255, 205, 80, 0.1);
}

.no-data {
  margin-top: 20px;
  font-size: 1.1rem;
  color: #777;
}

@media (max-width: 768px) {
  .table {
    font-size: 14px;
  }
  
  .table td, .table th {
    padding: 8px;
  }
}
</style>