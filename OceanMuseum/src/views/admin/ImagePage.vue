<template>
  <div class="image-management container-fluid d-flex g-0">
    <div class="  p-0">
      <SideBarComponent/>
    </div>
    <div class="flex-grow-1 ms-3">
      <div class="p-4 ms-2">
      <div class="d-flex justify-content-between align-items-center mb-4 title-group">
        <h4 class="fw-bold mb-0 "  style="font-size: 55px"><font-awesome-icon icon="image" />圖片管理</h4>
      </div>


      <div class="filter-section card shadow-sm p-4 mb-4">
        <div class="filter-bar d-flex gap-3">
          <div class="flex-grow-1">
            <label class="form-label">搜尋圖片</label>
            <input
                type="text"
                v-model="searchKeyWord"
                class="form-control"
                placeholder="請輸入圖片名稱..."
            />
          </div>
          <div style="width: 200px;">
            <label class="form-label">類別篩選</label>
            <select class="form-select" v-model="selectedCategory">
              <option value="">所有類別</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- 圖片網格 -->
      <div class="row g-4">
        <div v-for="specie in filteredImages" :key="specie.species_id" class="col-md-6 col-lg-4 col-xl-3">
          <div class="image-card card h-100 shadow-sm">
            <div class="card-img-container">
              <img :src="baseUrl + specie.image_url" :alt="specie.name" class="card-img-top">
            </div>
            <div class="card-body">
              <h5 class="card-title text-center mb-3">{{ specie.name }}</h5>

              <div class="d-flex gap-2 mb-3">
                <button class="btn btn-outline-primary flex-grow-1" @click="editImage()">
                  <i class="fas fa-edit me-2"></i>修改資訊
                </button>
                <button class="btn btn-outline-danger flex-grow-1" @click="deleteImage(specie.species_id)">
                  <i class="fas fa-trash me-2"></i>刪除
                </button>
              </div>

              <div class="upload-section">
                <input
                    type="file"
                    class="form-control form-control-sm mb-2"
                    :id="'fileInput-' + specie.species_id"
                    @change="handleFileChange($event, specie.species_id)"
                />
                <button
                    class="btn btn-success w-100 upload-img-btn"
                    @click="uploadImage(specie.species_id)"
                >
                  <i class="fas fa-upload me-2"></i>上傳圖片
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import SideBarComponent from "@/components/admin-componet/SideBar.vue";

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
      searchKeyWord: "", // 搜索關鍵字
      selectedCategory: "", // 選中的類別篩選
    };
  },
  computed: {
    filteredImages() {
      return this.species.filter((specie) => {
        return (
            (!this.searchKeyWord || specie.name.includes(this.searchKeyWord)) &&
            (!this.selectedCategory || specie.category === this.selectedCategory)
        );
      });
  }
  },
  methods: {
    deleteImage(imageId) {
      alert(`禁止刪除圖片`);
    },
    editImage(imageId) {
      alert(`禁止刪除，ID: ${imageId}`);
    },
    handleFileChange(event, speciesId) {
      const file = event.target.files[0];
      if (file) {

        this.fileMap[speciesId] = file;
        alert(`已選擇檔案: ${file.name}（物種 ID: ${speciesId}）`);
      }
    },
    filteredSpecies() {

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
  min-height: 100vh;
  background-color: #f8f9fa;
}


.title-group{
  color: #2c3e50;
}
.card-img-container {
  height: 200px;
  overflow: hidden;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-img-container img:hover {
  transform: scale(1.05);
}

.image-card {
  transition: all 0.3s ease;
  border: none;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card-title {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-outline-primary {
  border-color: #3498db;
  color: #3498db;
}

.btn-outline-primary:hover {
  background-color: #3498db;
  color: white;
}

.btn-outline-danger {
  border-color: #e74c3c;
  color: #e74c3c;
}

.btn-outline-danger:hover {
  background-color: #e74c3c;
  color: white;
}

.btn-success {
  background-color: steelblue;
  border-color: steelblue;
}

.btn-success:hover {
  background-color: #27ae60;
  border-color: #27ae60;
}

.filter-section {
  background-color: white;
  border-radius: 8px;
  border: none;
}

.form-control, .form-select {
  border: 1px solid #ddd;
  border-radius: 6px;
}

.form-control:focus, .form-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
</style>
