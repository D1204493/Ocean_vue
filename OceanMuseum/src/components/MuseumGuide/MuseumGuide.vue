<template>
  <div class="museum-guide">
    <h2 class="title">館場導覽</h2>
    <div class="floor-plan-container">
      <!-- 中間平面圖 -->
      <img src="/img/MuseumGuide/floor_plan.jpg" alt="館場平面圖" class="floor-plan" />
      
      <!-- 左上角：企鵝區 -->
      <div class="zone zone-top-left" @click="openZone('penguin')">
        <img src="/img/MuseumGuide/penguin_zone.webp" alt="企鵝區" class="zone-icon" />
        <span class="zone-label">企鵝區</span>
      </div>
      
      <!-- 左下角：深水區 -->
      <div class="zone zone-bottom-left" @click="openZone('deep')">
        <img src="/img/MuseumGuide/deep_water_zone.webp" alt="深水區" class="zone-icon" />
        <span class="zone-label">深水區</span>
      </div>
      
      <!-- 右上角：舞台區 -->
      <div class="zone zone-top-right" @click="openZone('stage')">
        <img src="/img/MuseumGuide/stage_zone.webp" alt="舞台區" class="zone-icon" />
        <span class="zone-label">舞台區</span>
      </div>
      
      <!-- 右下角：淺水區 -->
      <div class="zone zone-bottom-right" @click="openZone('shallow')">
        <img src="/img/MuseumGuide/shallow_water_zone.webp" alt="淺水區" class="zone-icon" />
        <span class="zone-label">淺水區</span>
      </div>
    </div>

    <!-- 詳細資訊對話框 -->
    <div v-if="selectedZone" class="modal-overlay" @click="closeZone">
      <div class="modal-content" @click.stop>
        <h3>{{ zoneInfo[selectedZone].title }}</h3>
        <img :src="zoneInfo[selectedZone].image" :alt="zoneInfo[selectedZone].title" class="modal-image" />
        <p>{{ zoneInfo[selectedZone].description }}</p>
        <button @click="closeZone" class="close-btn">關閉</button>
      </div>
    </div>
  </div>
</template>

---

### 🚀 **2. JavaScript 邏輯**

```js
<script>
export default {
  name: 'MuseumGuide',
  data() {
    return {
      selectedZone: null,
      zoneInfo: {
        penguin: {
          title: '企鵝區',
          image: '/img/MuseumGuide/penguin_zone.webp',
          description: '企鵝區模擬南極冰原環境，近距離觀察可愛的企鵝家族，體驗牠們的日常生活。'
        },
        deep: {
          title: '深水區',
          image: '/img/MuseumGuide/deep_water_zone.webp',
          description: '深水區展示海洋中壯觀的深海生物，包括鯊魚、鯨魚與珊瑚礁。'
        },
        stage: {
          title: '舞台區',
          image: '/img/MuseumGuide/stage_zone.webp',
          description: '舞台區是海洋劇場，提供精彩的海洋動物表演與教育活動。'
        },
        shallow: {
          title: '淺水區',
          image: '/img/MuseumGuide/shallow_water_zone.webp',
          description: '淺水區展示熱帶魚群與珊瑚礁，適合親子互動與學習。'
        }
      }
    };
  },
  methods: {
    openZone(zone) {
      this.selectedZone = zone;
    },
    closeZone() {
      this.selectedZone = null;
    }
  }
};
</script>

<style scoped>
.museum-guide {
  text-align: center;
  margin: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #ffa500;
  font-weight: 900;
  }

.floor-plan-container {
  position: relative;
  display: inline-block;
}

.floor-plan {
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 標籤位置與樣式 */
.zone {
  position: absolute;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
}

.zone:hover {
  transform: scale(1.1);
}

.zone-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.zone-label {
  display: block;
  margin-top: 5px;
  font-size: 14px;
  color: #ffa500;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 2px 5px;
  font-weight: bold;
}

/* 定位四個區域 */
.zone-top-left {
  top: 5%;
  left: 5%;
}

.zone-bottom-left {
  bottom: 5%;
  left: 5%;
}

.zone-top-right {
  top: 5%;
  right: 5%;
}

.zone-bottom-right {
  bottom: 5%;
  right: 5%;
}

/* 詳細資訊對話框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 80%;
  max-width: 500px;
}

.modal-content h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.modal-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.modal-content p {
  font-size: 14px;
  color: #555;
}

.close-btn {
  margin-top: 10px;
  background: #ffa500;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #ffa500;
  transform: scale(1.05)
}
</style>
