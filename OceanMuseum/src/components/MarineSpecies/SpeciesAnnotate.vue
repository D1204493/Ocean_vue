<template>
  <div class="container">
    <!-- 左側圖片區域 -->
    <div class="image-section">
      <div class="carousel">
        <div class="carousel-content">
          <button @click="prevImage" class="carousel-btn prev-btn">
            <span class="chevron">&#10094;</span>
          </button>

          <div class="image-container">
            <TransitionGroup name="slide">
              <img v-for="(image, idx) in currentSpecies.images" :key="idx" v-show="currentIndex === idx" :src="image"
                :alt="currentSpecies.name" class="carousel-image" />
            </TransitionGroup>
          </div>

          <button @click="nextImage" class="carousel-btn next-btn">
            <span class="chevron">&#10095;</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 右側說明區域 -->
    <div class="info-section">
      <div class="info-card">
        <div class="card-header">
          <h2 class="species-title">{{ currentSpecies.name }}</h2>
          <button class="close-btn" @click="$router.push('/MarineSpecies')">
            X
          </button>
        </div>

        <div class="card-content">
          <div class="description">
            <span class="pin-icon">📍</span>
            <div class="scrollable-content">
              <p class="species-description">{{ currentSpecies.fullDescription }}</p>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button class="location-btn">所在館區</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeciesAnnotate',

  data() {
    return {
      currentIndex: 0,
      speciesData: [
        {
          id: 1,
          name: '海龜',
          images: ['/img/OceanSpecies/海龜2.jpg', '/img/OceanSpecies/海龜3.jpg'],
          fullDescription: '海龜是海洋龜類的總稱，所有龜鱉目動物中唯一生活在海洋的物種，分布範圍十分平均，分布於除北冰洋外的全球海域中。背上有殼，其花紋較一般陸龜或河龜複雜，背甲為扁平流線形，前後鰭為舟漿狀。'
        },
        {
          id: 2,
          name: '海獺',
          images: ['/img/OceanSpecies/水獺1.jpg', '/img/OceanSpecies/水獺2.jpg'],
          fullDescription: '海獺（學名：Enhydra lutris）是食肉目動物中最適應海中生活的物種，很少在陸地或冰上覓食，大半的時間都待在水裡，連生產與育幼也都在水中進行。大部分時間裡，海獺不是仰躺著浮在水面上，就是潛入海床覓食。當牠們待在海面時，幾乎一直在整理毛皮，保持它的清潔與防水性。科學家已辨識出三個不同的亞種，分別位於美國加州、阿拉斯加及俄羅斯等地。各地的海獺族群皆以各自的棲地命名[1]:91。屬名Enhyra源自希臘文的En加上hydōr，意為「在水裡面」；種名lutris則源自拉丁文lutra，也是水獺的意思。'
        },
        {
          id: 3,
          name: '水母',
          images: ['/img/OceanSpecies/水母1.jpg', '/img/OceanSpecies/水母2.jpg'],
          fullDescription: '水母（又名白鮓、䖳ㄓㄚˋ[1]）是刺絲胞動物門水母亞門（學名：Medusozoa）一部分能在開放水體自由活動的水生無脊椎動物的通稱。水母分布於全球各地的水域裡，已發現超過兩百種，無論是熱帶﹑溫帶，淺海、深海，甚至是淡水水域都有牠們的蹤影。水母是最早出現的一類真後生動物，至少在前寒武紀的埃迪卡拉紀時就已經存在。水母身體大致可分為兩部分，其主要部分是由中層膠組成的傘狀體（bell），主要器官都位於其內，且依賴其陣發性收縮划水移動；傘狀體下方是拖在身後的眾多觸手，其中帶有刺細胞，可以捕捉獵物或防禦天敵。不同水母的大小各不相同，最大的水母觸手可以延伸約十米遠。 在分類上有些屬於水螅綱，有些屬於缽水母綱，其生活史中，幾乎所有種類都有兩型，即水螅型（polyp）和水母型（medusa），並有兩型在有性生殖與無性生殖之間的世代交現象，而人們常見的水母則是有性的水母型。'
        },
        {
          id: 4,
          name: '翻車魚',
          images: ['/img/OceanSpecies/翻車魚1.jpg', '/img/OceanSpecies/翻車魚2.png'],
          fullDescription: '翻車魚（學名：Mola mola），是屬於魨形目翻車魨科的一種魚，又名翻車魨、曼波魚，該物種原產於世界各地的熱帶和溫帶水域，也見於寒帶海洋，屬於大型大洋性魚類。該物種的模式產地在地中海。[3][4]翻車魚是世界上已知最重的兩種硬骨魚之一，另一種是南方翻車魚（學名：Mola alexandrini）。[5]成年翻車魚的體重一般在247到1000公斤之間。翻車魚形似一個長著尾巴的魚頭，身體扁平。翻車魚的背鰭和臀鰭較長，展開可超過身長。翻車魚的食物來源十分廣泛，主要以小型魚類、魚類幼體、魷魚和甲殼動物為食，曾經被認為是翻車魚主要食物來源的水母和紐鰓樽只佔15%。雌性翻車魚可產下多達3億枚卵，比任何已知的脊椎動物都要多。[6][7]幼年翻車魚類似於四齒魨，有著較大的胸鰭和尾鰭以及成年翻車魚所沒有的刺狀突起。成年翻車魚很少遭到天敵捕食，但海獅、虎鯨和鯊魚以它們為食。翻車魚在部分地區被認為是一種美味，如日本、韓國和臺灣。歐盟法規禁止銷售翻車魚相關產品。[8]翻車魚經常被流刺網所捕獲。翻車魚屬於魨形目。魨形目還包括四齒魨科、二齒魨科和單棘魨科等等，它們有許多共同的特徵。翻車魚是該屬的模式種。'
        },
        {
          id: 5,
          name: '小丑魚',
          images: ['/img/OceanSpecies/小丑魚1.jpg', '/img/OceanSpecies/小丑魚2.jpg'],
          fullDescription: '小丑魚（英語：Clownfish或anemonefish）是對雀鯛科底下的海葵魚亞科（Amphiprioninae）魚類的俗稱，是一種熱帶海水魚。已知有約30種，一種來自棘頰雀鯛屬（Premnas），其餘來自雙鋸魚屬（Amphiprion）。小丑魚大多生活在水質清澈、光線充足、水深50公尺以上之海域 為熱帶性觀賞魚，分佈於太平洋與印度洋，不存在於大西洋。台灣目前記錄有的小丑魚共1屬5種，分別是公子小丑、鞍背小丑、咖啡色小丑、紅小丑、雙帶小丑。 小丑魚與海葵有著密不可分的共生關係，因此又稱海葵魚（Anemonefish）。雖然世界上海葵的種類超過一千多種，但僅約十種會與小丑魚共生。帶有刺絲胞的海葵提供居住和保護，小丑魚則將海葵身上的寄生物、壞死組織及有機、無機廢物清理乾淨，這些東西同時也是小丑魚的食物來源，形成一種互利共生的關係。在性別方面，在一群小丑魚當中體型最大者為雌性，第二大的為雄性，其餘則為未分化性別的小魚，當母魚(體型最大)死去，則原本的公魚(體型第二大)即現在的最大魚將轉變成母魚，而未分化小魚中體型最大者將變成公魚。小丑魚最長可長至18公分，最小僅10公分。'
        },
        {
          id: 6,
          name: '海獅',
          images: ['/img/OceanSpecies/海獅1.jpg', '/img/OceanSpecies/海獅2.jpg'],
          fullDescription: '海獅是屬於海獅科的海洋哺乳類動物，統合為海獅亞科。耳朵小；紡錘狀般的流線身體，可在水中靈活運動，前後肢呈鰭狀、後肢能轉向前方以支持身體，以及能夠利用鰭足在平地上走動；身體被有粗毛；雄性長2.5-3.25米，隨種類而異，雌性較小；有外耳廓（相對於沒有外耳廓的海豹科）。因為有的種類雄性海獅頸部有長毛似獅，故名。'
        },
        {
          id: 7,
          name: '海豚',
          images: ['/img/OceanSpecies/海豚1.jpg', '/img/OceanSpecies/海豚2.jpg'],
          fullDescription: '海豚，中國古稱魚獸[參1]、魚貍[註1]、海狶[註2]（又作海豨）[參2]、海豚魚[參3]，是對部分小型齒鯨的統稱，多指海豚科動物（學名：Delphinidae），廣義上泛指海豚科、鼠海豚科與淡水豚類，以及各類史前小型齒鯨，如肯氏海豚科、劍吻海豚科、懷佩什海豚科等。此外，領航鯨、虎鯨等黑鯨類在生物分類學上被歸入海豚科，本質上也屬於海豚，但在非學術性的日常語境下，牠們因體型較大而被排除在海豚之外。海豚廣泛生活於世界各大洋大陸棚附近的淺海區，在內海及江河入海口附近的鹹淡水中也有分布，個別種類見於內陸河流。通常喜歡群居，捕食魚類、烏賊等。牠們的軀幹呈紡錘形，皮膚光滑無毛，身體矯健而靈活，善於跳躍和潛泳，是在水中行動最迅速的哺乳動物。擁有發達的聲納系統，活動時主要依靠回聲定位功能，在水中和空氣中均有極好的聽力。鼻孔在頭頂上，用於出水換氣。體型從1公尺長、30公斤重（侏海豚）到9.5公尺長、14噸重（虎鯨）不等，形態特徵也各不相同。海豚是智商最高的動物類群之一，部分種類的大腦溝回複雜，記憶力很好，能在人類的訓練下學會許多動作，並有著溫和友善、活潑好動的性格，受到世界各地人民的普遍喜愛。' 
        },
        {
          id: 8,
          name: '海象',
          images: ['/img/OceanSpecies/海象1.jpg', '/img/OceanSpecies/海象2.jpg'],
          fullDescription: '海象（學名：Odobenus rosmarus）是海象屬唯一的物種，屬食肉目海象科，是一種鰭足類。海象科史前有幾個屬，但目前僅存一屬一種。是目前瀕臨滅絕的動物。'
        },
      ],
    }
  },

  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.currentSpecies.images.length
    },

    prevImage() {
      this.currentIndex = this.currentIndex === 0
        ? this.currentSpecies.images.length - 1
        : this.currentIndex - 1
    },
  },

  computed: {
    // 根據路由參數獲取當前物種訊息
    currentSpecies() {
      const speciesId = parseInt(this.$route.params.id)
      return this.speciesData.find(species => species.id === speciesId) || this.speciesData[0]
    }
  },
}
</script>

<style scoped>
.container {
  position: relative;
  width: 95%;
  max-width: 64rem;
  margin: 0 auto;
  background-color: #1e293b;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  /* 修改這裡：改為 2:1 的比例 */
  gap: 1.5rem;
}

/* 左側圖片區域樣式 */
.image-section {
  width: 100%;
}

.carousel {
  position: relative;
  width: 100%;
  height: 24rem;
}

.carousel-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* 右側說明區域樣式 */
.info-section {
  width: 100%;
  height: 24rem;
  /* 與輪播圖高度一致 */
}

.info-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 輪播按鈕樣式 */
.carousel-btn {
  position: absolute;
  z-index: 10;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.prev-btn {
  left: 0.5rem;
}

.next-btn {
  right: 0.5rem;
}

.chevron {
  font-size: 1.5rem;
  line-height: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-shrink: 0;
  /* 防止header被壓縮 */
}

.species-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.close-btn {
  color: #6b7280;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.close-btn:hover {
  color: #374151;
}

.card-content {
  flex: 1;
  margin-bottom: 1.5rem;
  overflow: hidden;
  /* 確保內容不會溢出 */
  min-height: 0; /* 這是關鍵，讓 flex 子元素可以正確滾動 */
}

.description {
  height: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.pin-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: #6b7280;
}

.scrollable-content {
  height: 100%;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* 自定義滾動條樣式 */
.scrollable-content::-webkit-scrollbar {
  width: 4px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.species-description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
}

.card-footer {
  margin-top: auto;
  flex-shrink: 0; /* 防止footer被壓縮 */
}

.location-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.location-btn:hover {
  background-color: #d97706;
}

/* 輪播動畫 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    /* 在手機版時改為單列 */
    gap: 1rem;
    padding: 1rem;
  }

  .carousel {
    height: 16rem;
  }

  .info-card {
    padding: 1rem;
  }

  .species-title {
    font-size: 1.25rem;
  }

  .species-description {
    font-size: 0.875rem;
  }
}
</style>