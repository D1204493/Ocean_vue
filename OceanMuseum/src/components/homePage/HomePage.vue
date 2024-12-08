<template>
    <div class="announcement-container">
      <div class="content-wrapper p-4">
        <!-- Navigation Links -->
        <div class="nav-buttons mb-4">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="btn custom-nav-btn me-3"
            :class="{ active: $route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </div>
  
        <!-- Search Section -->
        <div class="search-section mb-4">
          <div class="card search-card border-0 shadow-sm">
            <div class="card-body">
              <div class="form-floating">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="標題/內容搜尋"
                  class="form-control search-input"
                  @input="handleSearch"
                />
                <label class="search-label">標題/內容搜尋</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Display Content Dynamically -->
        <router-view :news="filteredNews" :reports="filteredReports" :activities="filteredActivities" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
 
  
  // 控制展開狀態
  const searchQuery = ref('')
  
  // 館方快訊資料
  const newsData = ref([
    {
        "id": 1,
        "category": "館方快訊",
        "date": "2024/11/1",
        "title": "世界海洋日活動公告",
        "details": "為慶祝世界海洋日，本館將於本月舉辦一系列活動，包括專題講座、互動展覽及海洋生態影片放映，歡迎踴躍參加！"
    },
    {
        "id": 2,
        "category": "館方快訊",
        "date": "2024/10/28",
        "title": "新海洋生物展區啟用",
        "details": "本館新設的海洋生物展區於今日正式啟用，展出來自深海的珍稀魚類及珊瑚群，適合全家大小一同探索。"
    },
    {
        "id": 3,
        "category": "館方快訊",
        "date": "2024/10/15",
        "title": "博物館修復通知",
        "details": "為改善參觀體驗，本館將於下週進行部分區域的修繕工作，部分展區將暫停開放，不便之處敬請見諒。"
    },
    {
        "id": 4,
        "category": "館方快訊",
        "date": "2024/10/5",
        "title": "中秋節特展圓滿落幕",
        "details": "感謝各位支持中秋節特展！共吸引超過10,000名遊客，透過活動加深對海洋文化的認識。"
    },
    {
        "id": 5,
        "category": "館方快訊",
        "date": "2024/9/30",
        "title": "館方志工招募",
        "details": "本館正在招募志工，主要協助展覽解說及活動籌備，提供多元學習機會並頒發證書。"
    }
  ])
  
  // 相關報導資料
  const reportsData = ref([
    {
        "id": 1,
        "category": "相關報導",
        "date": "2024/10/25",
        "title": "《海洋守護者》榮獲年度最佳展覽報導",
        "details": "《海洋守護者》專題報導深度分析本館展覽對海洋保護的貢獻，並榮獲國內最佳展覽報導大獎。"
    },
    {
        "id": 2,
        "category": "相關報導",
        "date": "2024/10/12",
        "title": "新媒體關注海洋環保",
        "details": "多家新媒體平台報導本館近期環保行動計劃，包括海洋廢棄物清理及保護瀕危物種的努力。"
    },
    {
        "id": 3,
        "category": "相關報導",
        "date": "2024/10/1",
        "title": "博物館與當地漁業合作推動永續發展",
        "details": "本館攜手當地漁民，推廣友善漁業與海洋保育，獲得國際保育組織的肯定。"
    },
    {
        "id": 4,
        "category": "相關報導",
        "date": "2024/9/20",
        "title": "博物館進入國際海洋博物館排名",
        "details": "本館首次入選全球十大最佳海洋博物館之一，感謝大家的支持與努力。"
    },
    {
        "id": 5,
        "category": "相關報導",
        "date": "2024/9/5",
        "title": "國際海洋生物研討會成功舉辦",
        "details": "本館舉辦的國際海洋生物研討會吸引來自30國的專家學者，分享最新的研究成果。"
    }
  ])
  
  // 科教活動資料
  const activitiesData = ref([
    {
        "id": 1,
        "category": "科教活動",
        "date": "2024/11/10",
        "title": "小小海洋保育家工作坊",
        "details": "本工作坊針對5-12歲兒童設計，透過實驗與互動學習如何保護海洋生態，增進對海洋的熱愛。"
    },
    {
        "id": 2,
        "category": "科教活動",
        "date": "2024/11/5",
        "title": "深海奇觀科學講座",
        "details": "科學家將分享深海探險的最新發現，包括珍稀物種及其棲息地的研究，名額有限，快來報名！"
    },
    {
        "id": 3,
        "category": "科教活動",
        "date": "2024/10/22",
        "title": "海洋廢棄物回收挑戰賽",
        "details": "鼓勵家庭參與，了解海洋垃圾對生態的影響，並學習有效的回收方法。"
    },
    {
        "id": 4,
        "category": "科教活動",
        "date": "2024/10/10",
        "title": "海洋科學繪畫比賽開跑",
        "details": "鼓勵學童以創意繪畫表達對海洋的熱愛，優勝者將有機會展出作品於本館。"
    },
    {
        "id": 5,
        "category": "科教活動",
        "date": "2024/9/25",
        "title": "海洋知識大挑戰",
        "details": "結合互動遊戲的知識競賽，挑戰參加者對海洋生物與生態的認識。"
    },
    {
        "id": 6,
        "category": "科教活動",
        "date": "2024/9/18",
        "title": "VR 深海探索體驗",
        "details": "使用最新科技模擬深海環境，讓參觀者仿佛親臨深海世界，活動大受好評。"
    },
    {
        "id": 7,
        "category": "科教活動",
        "date": "2024/9/10",
        "title": "海洋生物標本觀察活動",
        "details": "提供顯微鏡觀察真實的海洋生物標本，適合對生物學感興趣的學童與成人。"
    },
    {
        "id": 8,
        "category": "科教活動",
        "date": "2024/8/30",
        "title": "海洋生態親子夜間導覽",
        "details": "夜間開放的特別導覽，帶領親子探索海洋生物的夜行習性。"
    },
    {
        "id": 9,
        "category": "科教活動",
        "date": "2024/8/20",
        "title": "海洋音樂會",
        "details": "用音樂訴說海洋故事，演奏曲目包括海洋主題的古典與現代作品。"
    },
    {
        "id": 10,
        "category": "科教活動",
        "date": "2024/8/10",
        "title": "海洋保育公益募款日",
        "details": "本館舉行公益活動，籌集資金支持海洋生物保護計劃，所有捐款將公開透明。"
    }
  ])
  
  // 導航連結
  const navLinks = ref([
    { name: '館方快訊', path: '/news' },
    { name: '相關報導', path: '/reports' },
    { name: '科教活動', path: '/activities' }
  ])
  
  // Computed properties to filter data based on search query
const filteredNews = computed(() => {
  return filterData(newsData.value)
})

const filteredReports = computed(() => {
  return filterData(reportsData.value)
})

const filteredActivities = computed(() => {
  return filterData(activitiesData.value)
})
  
// 過濾資料的簡化函數
const filterData = (data) => {
  return data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.details.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}

// 處理搜尋功能
const handleSearch = () => {
  // 清除或更新過濾後的資料
}


  </script>
  
  <style scoped>
  .announcement-container {
    min-height: 100vh;
    background: #f8f9fa;
    overflow-x: hidden;
  }
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Navigation Buttons */
  .custom-nav-btn {
    color: #334255;
    background-color: #fff;
    border: 1px solid #dee2e6;
    padding: 0.5rem 1.5rem;
    transition: all 0.2s ease;
  }
  
  .custom-nav-btn:hover,
  .custom-nav-btn.active {
    color: #0F2540;
    background-color: #FFCD50;
    border-color: #FFCD50;
  }
  
  /* Search Section */
  .search-card {
    background: rgba(255, 255, 255, 0.9);
  }
  
  .search-input {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .search-input:focus {
    border-color: #FFCD50;
    box-shadow: 0 0 0 0.25rem rgba(255, 205, 80, 0.25);
  }
  
  .search-label {
    color: #495057;
  }
  
  /* Section Styling */
  .section-title {
    color: #334255;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .announcement-section {
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
    margin-bottom: 2rem;
    position: relative;
  }
  
  /* Show More Button */
  .btn-link {
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-in-out;
  }
  
  .btn-link:hover {
    transform: translateY(-1px);
    text-decoration: underline;
  }
  
  /* Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .announcement-section {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .announcement-section:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .content-wrapper {
      padding: 1rem;
    }
  
    .custom-nav-btn {
      padding: 0.4rem 1rem;
      font-size: 0.9rem;
    }
  
    .section-title {
      font-size: 1.5rem;
    }
  
    .announcement-section {
      padding: 1rem;
    }
  }
  </style>