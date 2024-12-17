<template>
  <div class="programs-schedule">
    <!-- 日期選擇器 -->
    <div class="date-selector">
      <label for="date-picker">日期查詢：</label>
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
      <h2>{{ selectedDate }} 當日活動</h2>
      <div class="week-info">
        <button class="time-btn">時間</button>
        <button class="week-btn">{{ getWeekDay(selectedDate) }}</button>
      </div>
    </div>

    <!-- 上午與下午節目展示 -->
    <div class="programs-container">
      <div
        v-if="morningProgram"
        class="program-card"
        @click="showDetails(morningProgram)"
      >
        <img :src="morningProgram.img_url" alt="上午節目" class="program-image" />
        <h3 class="program-title">{{ morningProgram.title }}</h3>
      </div>
      <div
        v-if="afternoonProgram"
        class="program-card"
        @click="showDetails(afternoonProgram)"
      >
        <img :src="afternoonProgram.img_url" alt="下午節目" class="program-image" />
        <h3 class="program-title">{{ afternoonProgram.title }}</h3>
      </div>
    </div>

    <!-- 詳細內容 -->
    <div v-if="selectedProgram" class="program-details">
      <h3>{{ selectedProgram.title }}</h3>
      <p>{{ selectedProgram.description }}</p>
      <p>開始時間：{{ selectedProgram.start_time }}</p>
      <p>結束時間：{{ selectedProgram.end_time }}</p>
      <p>地點：{{ selectedProgram.location }}</p>
      <button class="close-button" @click="selectedProgram = null">關閉</button>
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
  },
};
</script>

<style scoped>
.programs-schedule {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

.date-selector select {
  padding: 8px;
  margin: 10px;
  font-size: 16px;
}

.disabled-option {
  color: gray;
}

.date-display h2 {
  margin: 20px 0;
  font-size: 24px;
  color: #2c3e50;
}

.week-info button {
  margin: 5px;
  padding: 10px;
  font-size: 14px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.week-info button:hover {
  background-color: #0056b3;
}

.programs-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.program-card {
  width: 350px; /* 調整卡片寬度 */
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.program-card:hover {
  transform: scale(1.05); /* 放大效果 */
}

.program-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.program-title {
  font-size: 18px;
  margin: 15px 0;
  color: #333;
}

.program-details {
  margin: 30px auto;
  padding: 20px;
  max-width: 500px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.program-details h3 {
  margin-bottom: 10px;
  color: #007bff;
}

.program-details p {
  margin-bottom: 8px;
}

.close-button {
  background-color: #FFCD50; /* 黃色背景 */
  color: #333; /* 深灰文字顏色 */
  border: none; /* 移除邊框 */
  border-radius: 20px; /* 圓角按鈕 */
  padding: 8px 20px; /* 上下左右內邊距 */
  font-size: 16px; /* 文字大小 */
  font-weight: bold; /* 粗體字 */
  cursor: pointer; /* 滑鼠懸停時顯示點擊手勢 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 按鈕陰影 */
  transition: all 0.3s ease; /* 平滑過渡效果 */
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
