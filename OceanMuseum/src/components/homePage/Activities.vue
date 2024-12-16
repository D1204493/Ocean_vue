<template>
  <div class="announcement-section">
    <div class="section-header mb-4">
      <h3 class="text-center section-title">科教活動</h3>
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
        <tr v-for="activity in activities" :key="activity.id">
          <td>{{ formatDate(activity.date) }}</td>
          <td>{{ activity.title }}</td>
          <td>{{ activity.summary }}</td>
          <td>{{ activity.details }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Activities',
  data() {
    return {
      activities: []
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
  color: #334255;
  margin-bottom: 20px;
  font-weight: 600;
}

.table {
  width: 100%;
  margin-top: 20px;
}

.table th {
  background-color: #f8f9fa;
  color: #334255;
  padding: 12px;
  border-bottom: 2px solid #FFCD50;
}

.table td {
  padding: 12px;
  vertical-align: middle;
  color: #495057;
}

.table tr:hover {
  background-color: #f8f9fa;
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