<!-- HomePage.vue -->
<template>
  <div class="homepage">
    <!-- Navigation Buttons -->
    <div class="nav-buttons mb-4">
      <button
        v-for="(nav, index) in navItems"
        :key="index"
        @click="currentView = nav.component"
        :class="{ active: currentView === nav.component }"
        class="btn custom-nav-btn"
      >
        {{ nav.name }}
      </button>
    </div>

    <!-- Search Box -->
    <div class="search-box mb-4">
      <input
        type="text"
        class="form-control"
        placeholder="標題/內容搜尋"
        v-model="searchQuery"
      />
    </div>

    <!-- Dynamic View Rendering -->
    <component
      :is="currentView"
      :museumPosts="filteredPosts"
      :searchQuery="searchQuery"
    />
  </div>
</template>

<script>
import News from "./News.vue";
import Reports from "./Reports.vue";
import Activities from "./Activities.vue";

export default {
  name: "HomePage",
  components: { News, Reports, Activities },
  data() {
    return {
      museumPosts: [],
      searchQuery: "",
      currentView: "News",
      navItems: [
        { name: "館方快訊", component: "News" },
        { name: "相關報導", component: "Reports" },
        { name: "科教活動", component: "Activities" },
      ],
    };
  },
  computed: {
    filteredPosts() {
      return this.museumPosts.filter((post) => {
        return (
          post.title.includes(this.searchQuery) ||
          post.summary.includes(this.searchQuery)
        );
      });
    },
  },
  async created() {
    await this.fetchCSVData();
  },
  methods: {
    async fetchCSVData() {
      const response = await fetch("/csv/MuseumPosts.csv");
      const csvText = await response.text();
      this.museumPosts = this.parseCSV(csvText);
    },
    parseCSV(csvText) {
      const rows = csvText.split("\n").map((row) => row.trim());
      const headers = rows.shift().split(",");
      return rows.map((row) => {
        const values = row.split(",");
        const obj = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = values[index]?.trim() || "";
        });
        return obj;
      });
    },
  },
};
</script>

<style scoped>
.homepage {
  padding: 20px;
}
.nav-buttons {
  display: flex;
  justify-content: center;
}
.custom-nav-btn {
  margin: 0 10px;
  border: 1px solid #ddd;
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}
.custom-nav-btn:hover {
    background-color: #e0e0e0;
}
.custom-nav-btn.active {
  background-color: #ffa500;
  color: white;
}
.search-box input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

</style>
