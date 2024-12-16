<!-- News.vue -->
<template>
  <div class="announcement-section">
    <div class="section-header mb-4">
      <h3 class="text-center section-title">館方快訊</h3>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>日期</th>
          <th>標題</th>
          <th>摘要</th>
          <th>詳細內容</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ formatDate(post.date) }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.summary }}</td>
          <td>{{ post.details }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      posts: []
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('zh-TW')
    }
  },
  mounted() {
    // 這裡可以之後加入獲取資料的邏輯
  }
}
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
}

.table th {
  background-color: #f8f9fa;
  color: #333;
  padding: 12px;
}

.table td {
  padding: 12px;
  vertical-align: middle;
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