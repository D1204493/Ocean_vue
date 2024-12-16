<!-- ProgramsSchedule.vue -->
<template>
  <div class="programs-container">
    <h2 class="text-center mb-4">節目表</h2>
    
    <div class="date-selector mb-4">
      <input type="date" v-model="selectedDate" @change="fetchPrograms">
    </div>

    <div class="programs-grid">
      <div v-for="program in programs" :key="program.id" class="program-card">
        <img :src="program.imgUrl" :alt="program.title" class="program-image">
        <div class="program-info">
          <h3>{{ program.title }}</h3>
          <p class="time">{{ formatTime(program.startTime) }} - {{ formatTime(program.endTime) }}</p>
          <p class="location">地點：{{ program.locationId }}</p>
          <p class="description">{{ program.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramsSchedule',
  data() {
    return {
      selectedDate: new Date().toISOString().split('T')[0],
      programs: []
    }
  },
  methods: {
    fetchPrograms() {
      // 這裡可以之後加入獲取資料的邏輯
    },
    formatTime(time) {
      return time ? time.substring(0, 5) : ''
    }
  },
  mounted() {
    this.fetchPrograms()
  }
}
</script>

<style scoped>
.programs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.program-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.program-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.program-info {
  padding: 15px;
}

.time, .location {
  color: #666;
  font-size: 0.9em;
}

.description {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .program-card {
    margin: 10px;
  }
}
</style>