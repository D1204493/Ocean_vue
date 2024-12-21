<!-- News.vue -->
<template>
  <div class="announcement-section">
    <table class="table">
      <thead>
        <tr>
          <th>類型</th>
          <th>日期</th>
          <th>標題</th>
          <th>摘要</th>
          <th>內容</th>
          <th>地點</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredNews"
          :key="item.id"
          @click="showDetails(item)"
          class="table-row"
        >
          <td>{{ item.category }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.summary }}</td>
          <td>{{ shortenDetails(item.details) }}</td>
          <td>{{ item.location }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 詳細內容 Modal -->
    <div v-if="selectedItem" class="modal">
      <div class="modal-content">
        <h3>{{ selectedItem.title }}</h3>
        <p>時間：{{ formatDate(selectedItem.date) }}</p>
        <p>摘要：{{ selectedItem.summary }}</p>
        <p>內容：{{ selectedItem.details }}</p>
        <p>地點：{{ selectedItem.location }}</p>
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
    filteredNews() {
      return this.museumPosts.filter(
        (post) => post.type === "NEWS" && post.status === "active"
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
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 90%;
  max-width: 500px;
}
.close-btn {
  margin-top: 10px;
  background: #0078d7;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #005bb5;
}
</style>
