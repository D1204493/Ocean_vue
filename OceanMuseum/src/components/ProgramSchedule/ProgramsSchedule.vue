<template>
  <div class="programs-schedule">
    <!-- 日期選擇器 -->
    <div class="date-selector">
      <label for="date-picker">📅日期查詢：</label>
      <select id="date-picker" v-model="selectedDate" @change="updatePrograms">
        <option
          v-for="date in activeDates"
          :key="date.date"
          :value="date.date"
          :disabled="!date.active"
          :class="{ 'disabled-option': !date.active }"
        >
          {{ date.date }}
        </option>
      </select>
    </div>

    <!-- 日期顯示與星期 -->
    <div class="date-display">
      <h2>
        📆 {{ selectedDate }}（{{ getWeekDay(selectedDate) }}）當日活動
      </h2>
    </div>

    <!-- 上午與下午節目展示 -->
    <div class="programs-container">
      <div
        v-if="morningProgram"
        class="program-card"
        @click="showDetails(morningProgram)"
      >
        <div class="card-header morning">上午節目</div> 
        <img :src="morningProgram.img_url" alt="上午節目" class="program-image" />
        <div class="card-content">
          <h3 class="program-title">{{ morningProgram.title }}</h3>
        </div>
      </div>
      
      <div
        v-if="afternoonProgram"
        class="program-card"
        @click="showDetails(afternoonProgram)"
      >
        <div class="card-header afternoon">下午節目</div>
        <img :src="afternoonProgram.img_url" alt="下午節目" class="program-image" />
        <div class="card-content">
          <h3 class="program-title">{{ afternoonProgram.title }}</h3>
        </div>      
      </div>
    </div>

    <!-- 詳細內容 Modal -->
    <div v-if="selectedProgram" class="modal-overlay" @click="closeDetails">
      <div class="modal-content" @click.stop>
        <img :src="selectedProgram.img_url" :alt="selectedProgram.title" class="modal-image" />
        <div class="modal-info">
          <h3>{{ selectedProgram.title }}</h3>
          <p>{{ selectedProgram.description }}</p>
          <p>🕒開始時間：{{ selectedProgram.start_time }}</p>
          <p>🕒結束時間：{{ selectedProgram.end_time }}</p>
          <p>📍 地點：{{ selectedProgram.location }}</p>
          <button class="close-button" @click="closeDetails">關閉</button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: "ProgramsSchedule",
  data() {
    return {
      programs: [], // 所有節目資料
      activeDates: [], // 所有 active 日期
      selectedDate: "", // 當前選擇日期
      morningProgram: null,
      afternoonProgram: null,
      selectedProgram: null,
    };
  },
  async created() {
    await this.fetchPrograms();
    this.setNearestFutureDate();
    this.updatePrograms();
  },
  methods: {
    async fetchPrograms() {
      // 使用 fetch 讀取 CSV 文件
      const response = await fetch("/csv/MuseumPrograms.csv");
      const csvText = await response.text();
      this.programs = this.parseCSV(csvText);
      this.setActiveDates();
    },
    parseCSV(csvText) {
      // 原生方法解析 CSV 字串
      const rows = csvText.split("\n").map((row) => row.trim()).filter(Boolean);
      const headers = rows.shift().split(",");

      return rows.map((row) => {
        const values = row.split(",");
        const entry = {};
        headers.forEach((header, index) => {
          entry[header.trim()] = values[index]?.trim() || "";
        });
        return entry;
      });
    },
    setActiveDates() {
      // 從節目資料中提取所有 status == "active" 的日期
      const dateMap = {};
      this.programs.forEach((p) => {
        if (!dateMap[p.date]) {
          dateMap[p.date] = p.status === "active";
        }
      });
      this.activeDates = Object.keys(dateMap).map((date) => ({
        date,
        active: dateMap[date],
      }));
    },
    setNearestFutureDate() {
      // 設定為最近未來的 active 日期
      const today = new Date();
      const futureDates = this.activeDates
        .filter((d) => d.active && new Date(d.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      this.selectedDate = futureDates.length > 0 ? futureDates[0].date : this.activeDates[0]?.date;
    },
    updatePrograms() {
      // 根據選定日期篩選出上午和下午的節目
      const filteredPrograms = this.programs.filter((p) => p.date === this.selectedDate);
      this.morningProgram = filteredPrograms.find((p) => p.session === "MORNING") || null;
      this.afternoonProgram = filteredPrograms.find((p) => p.session === "AFTERNOON") || null;
    },
    getWeekDay(dateString) {
      // 返回日期的星期幾
      const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      return days[new Date(dateString).getDay()];
    },
    showDetails(program) {
      console.log("Selected Program:", program); // 檢查 program 是否有 location 欄位
      // 顯示詳細內容
      this.selectedProgram = program;
    },
    closeDetails() {
      // 關閉詳細內容
      this.selectedProgram = null;
    },
  },
};
</script>

<style scoped>

.programs-schedule {
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #fafafa;
  max-width: 100%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
}

/* 日期選擇器 */
.date-selector {
  text-align: left;
  margin-bottom: 20px;
}

.date-selector label {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.date-selector select {
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
}

/* 日期顯示 */
.date-display h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
}

/* 卡片設計 */
.programs-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.program-card {
  width: 45%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.program-card:hover {
  transform: translateY(-5px);
}

.card-header {
  text-align: center;
  font-size: 16px;
  padding: 8px 0;
  font-weight: bold;
}

.morning {
  background-color: #ffd580;
}

.afternoon {
  background-color: #ffa07a;
}

.program-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 10px;
  text-align: center;
}

/* Modal 設計 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 600px;
  width: 90%;
}

.modal-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.modal-info h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #007bff;
}

.modal-info p {
  font-size: 14px;
  color: #555;
}


.close-button {
  background-color: #FFCD50; /* 黃色背景 */
  padding: 10px 20px; /* 上下左右內邊距 */
  font-size: 16px; /* 文字大小 */
  font-weight: bold; /* 粗體字 */
  border: none; /* 移除邊框 */
  border-radius: 5px; /* 圓角按鈕 */
  cursor: pointer; /* 滑鼠懸停時顯示點擊手勢 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 按鈕陰影 */
  transition: all 0.3s ease; /* 平滑過渡效果 */
  color: #333; /* 深灰文字顏色 */
  
}

.close-button:hover {
  background-color: #FFA500; /* 橘色背景，滑鼠懸停時變化 */
  color: #fff; /* 白色文字 */
  transform: scale(1.05); /* 放大按鈕 */
}

.close-button:active {
  background-color: #E69500; /* 深橘色背景，按下時 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 陰影變小 */
}
</style>
