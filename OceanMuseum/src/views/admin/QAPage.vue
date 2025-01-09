<script >

import sideBar from "@/components/admin-componet/SideBar.vue";

export default {
  components: {
    sideBar,
  },
  data() {
    return {
      qaData: [

      ],
    };
  },
  computed: {
    filteredData() {

    },
  },
  methods: {

  },
  async mounted() {
    const response = await fetch("http://localhost:8080/FAQ/getAll",{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }}
    );
    if(response.ok){
      this.qaData = await response.json();
      console.log("取得QA檔案成功");
    } else {
      console.log("取得QA失敗");
    }
  }
};
</script>

<template>
  <div class="container-fluid d-flex g-0">
    <div class="p-0">
      <side-bar/>
    </div>
      <div class="qa-management flex-grow-1">
        <div class="p-4 ms-2">
    <!-- 標題 -->
      <div class="header d-flex align-items-center justify-content-between">
        <h1 style="color: #2c3e50;"><span><font-awesome-icon icon="lightbulb" class="me-4" style="color: orange" /></span >Q&A 管理</h1>
      </div>
      <div class="btn-group mt-4 ms-4 d-flex align-items-center ">

        <button class=" btn btn-success rounded-3 ms-auto me-4 " style="font-size:30px; font-weight: bolder; max-width: 60px; height: 60px">+</button>
      </div>

      <!-- Q&A 列表 -->
      <div class="qa-list mt-4">
        <div v-for="item in qaData" :key="item.id" class="qa-item p-3 mb-3 border rounded">
          <h5>{{ item.category }}</h5>
          <p><strong>Q:</strong> {{ item.question }}</p>
          <p><strong>A:</strong> {{ item.answer }}</p>
          <div class="manage-btn-group d-flex ">
            <div></div>
            <div class="d-flex ms-auto ">
              <button class="btn btn-secondary me-2">檢視</button>
              <button class="btn btn-dark me-2">編輯</button>
              <button class="btn btn-danger me-2">刪除</button>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 20px;
  border-bottom: 2px solid #e9ecef;

}


/* 篩選按鈕樣式 */




/* Q&A 列表樣式 */
.qa-list {
  padding: 20px;
}

.qa-item {
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.manage-btn-group{

}
</style>