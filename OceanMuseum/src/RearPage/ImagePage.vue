<template>
  <div class="image-management container-fluid d-flex">
    <div class="col-4">
      <SideBarComponent/>
    </div>

    <div class="col-8">
        <!-- 頁面標題 -->
        <div class="header d-flex justify-content-between align-items-center mb-4 ">
          <h1><span><font-awesome-icon icon="image" /></span>圖片管理</h1>

        </div>

        <!-- 篩選器 -->
        <div class="filter-bar d-flex align-items-center mb-3 mt-4">
          <input
              type="text"
              v-model="searchKeyword"
              class="form-control me-3"
              placeholder="搜尋圖片名稱..."
          />
          <select class="form-select me-3" v-model="selectedCategory">
            <option value="">所有類別</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- 圖片列表 -->
        <div class="image-list row">
          <div v-for="specie in species" :key="specie.species_id" class="col-3 mb-4 d-flex flex-column align-items-center">
            <div class="image-card">
              <img :src="baseUrl + specie.image_url" :alt="specie.name" class="img-thumbnail" />
            </div>
            <div class="image-name mt-2">{{ specie.name }}</div>

            <div class="d-flex ">
              <button class="btn btn-primary btn-sm mt-2 me-3" @click="editImage( )">
              修改圖片資訊
              </button>
              <button class="btn btn-danger btn-sm mt-2" @click="deleteImage( )">
                刪除
              </button>
            </div>
            <div class="upload-section mt-3">
              <input
                  type="file"
                  class="form-control"
                  :id="'fileInput-' + specie.species_id"
                  @change="handleFileChange($event, specie.species_id)"
              />
              <button
                  class="btn btn-success btn-sm mt-2"
                  @click="uploadImage(specie.species_id)"
              >
                上傳並更新圖片
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import SideBarComponent from "@/RearPage/SideBar.vue";

export default {
  name: "SideBar",
  components: {
    SideBarComponent,
  },
  data() {
    return {
      fileMap: {},
      baseUrl: "http://localhost:8080/",
      species: [],
      categories: ["mammals", "shallow-water", "deep-sea"], // 可用的圖片類別
      searchKeyword: "", // 搜索關鍵字
      selectedCategory: "", // 選中的類別篩選
    };
  },
  computed: {
    filteredImages() {
      return this.species.filter((specie) => {
        return (
            (!this.searchKeyword || specie.name.includes(this.searchKeyword)) &&
            (!this.selectedCategory || specie.category === this.selectedCategory)
        );
      });
  }
  },
  methods: {
    deleteImage(imageId) {
      alert(`圖片 ID: ${imageId} 已刪除（實際刪除功能需後端支持）`);
    },
    editImage(imageId) {
      alert(`修改圖片資訊功能尚未實作，ID: ${imageId}`);
    },
    handleFileChange(event, speciesId) {
      const file = event.target.files[0];
      if (file) {

        this.fileMap[speciesId] = file;
        alert(`已選擇檔案: ${file.name}（物種 ID: ${speciesId}）`);
      }
    },
    //上傳圖片的方法
    async uploadImage(speciesId) {
      const file = this.fileMap[speciesId];
      if (!file) {
        alert("請先選擇檔案！");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const API_BASE_URL = "http://localhost:8080/MarineSpecies";
        const response = await fetch(`${API_BASE_URL}/upload/${speciesId}`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          alert("圖片上傳成功！");
          // 更新圖片列表（假設後端返回新的圖片 URL）
          const updatedMessage = await response.text();
          console.log(updatedMessage);

          this.$delete(this.fileMap, speciesId); // 清除已上傳的檔案
          await this.getMarineSpecies ();
        } else {
          alert("圖片上傳失敗：" + result.message);
        }
      } catch (error) {
        console.error("圖片上傳失敗：", error);
        alert("請檢查後端日誌！");
      }
    },
    //發送獲取海洋生物的代碼,獨立為一個方法以減少重複邏輯
    async getMarineSpecies () {
      const response = await fetch("http://localhost:8080/MarineSpecies/get",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
      this.species = await response.json();
      console.log(this.images);
    }
  },
  //創建時向資料庫發送獲取所有海洋生物的請求
  async created() {
    await this.getMarineSpecies ();
  }

}
</script>

<style scoped>
.image-management {
  padding: 20px;
}

.header {
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.image-list {
  margin-top: 20px;
}

.image-card img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.image-name {
  text-align: center;
  font-size: 14px;
  color: #555;
}

button {
  transition: all 0.3s;
}

button:hover {
  opacity: 0.8;
}
</style>
