<!-- News.vue -->
<template>
  <div class="announcement-section">
    <div class="table-container">
      <table class="styled-table">
      <thead>
        <tr>
          <th>類型</th>
          <th>日期</th>
          <th>標題</th>
          <th>摘要</th>
          <th>內容</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredReports"
          :key="item.id"
          @click="showDetails(item)"
          class="table-row"
        >
          <td>{{ item.category }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.summary }}</td>
          <td>{{ shortenDetails(item.details) }}</td>
          
        </tr>
      </tbody>
    </table>
    </div>

    <!-- 詳細內容 Modal -->
    <div v-if="selectedItem" class="modal">
      <div class="modal-content">
        <h3>{{ selectedItem.title }}</h3>
        <p>時間：{{ formatDate(selectedItem.date) }}</p>
        <p>摘要：{{ selectedItem.summary }}</p>
        <p>內容：{{ selectedItem.details }}</p>
        
        <button @click="selectedItem = null" class="close-btn">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  props: ["museumPosts"],
  data() {
    return {
      selectedItem: null,
    };
  },
  computed: {
    filteredReports() {
      return this.museumPosts.filter(
        (post) => post.type === "REPORT" && post.status === "active"
      );
    },
  },
  methods: {
    shortenDetails(details) {
      return details.length > 20 ? details.slice(0, 20) + "..." : details;
    },
    showDetails(item) {
      this.selectedItem = item;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("zh-TW");
    },
  },
};
</script>

<style scoped>
.announcement-section {
  max-width: 100%;
  overflow-x: auto; /* 水平滾動條（如果需要） */
}

.table-container {
  max-height: 400px; /* 設定表格的最大高度 */
  overflow-y: auto; /* 垂直滾動條 */
  border: 1px solid #ddd; /* 添加邊框 */
  border-radius: 5px; /* 圓角 */
}

/* 表格樣式 */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.styled-table thead th {
  font-weight: 900; /* 表頭字體加粗 */
  background-color: #fff8e1; /* 表頭背景色 */
  color: #d17a22; /* 表頭字體顏色 */
  border-bottom: 2px solid #d17a22; /* 表頭底線 */
  padding: 10px;
}

/* 奇偶行背景色 */
.styled-table tbody tr:nth-of-type(odd) {
  background-color: #fffdf2; /* 奇數行背景色 */
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f5f5f5; /* 偶數行背景色 */
}

.styled-table tbody tr:hover {
  background-color: #ffeeba; /* 滑鼠懸停背景色 */
}

/* 儲存格內邊距 */
.styled-table th {
  padding: 12px 15px;
  text-align: center;
}

.styled-table td {
  padding: 12px 15px;
  text-align: left;
}


/* 滾動條設計 */
.table-container::-webkit-scrollbar {
  width: 8px; /* 滾動條寬度 */
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滾動條軌道顏色 */
}

.table-container::-webkit-scrollbar-thumb {
  background: #d17a22; /* 滾動條顏色 */
  border-radius: 4px; /* 滾動條圓角 */
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #a0522d; /* 滑鼠懸停時的滾動條顏色 */
}

.table-row:hover {
  cursor: pointer;
  background-color: #f8f9fa;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.modal-content p {
  font-size: 14px;
  margin-bottom: 8px;
}

.close-btn {
  margin-top: 10px;
  background: #d17a22;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #d17a22;
  transform: scale(1.05)
}
</style>
