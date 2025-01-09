<script>
import SideBarComponent from "@/components/admin-componet/SideBar.vue";

import { Chart, registerables } from "chart.js";
export default {
  name: "SideBar",
  components: {
    SideBarComponent,
  },
  data() {
    return {
      ticketOrders: [],
      options: [
        { option: "展館資訊", isClicked: false },
        { option: "Q&A管理", isClicked: false },
        { option: "圖片管理", isClicked: false },
      ],
    };
  },
  computed: {

  },
  methods: {
    toggleBtn(index) {
      this.options.forEach((option, i) => {
        option.isClicked = i === index;
      });
    },
  },
  async created() {
    try {
      const response = await fetch("http://localhost:8080/ticket/getAllOrder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const body = await response.json();
        this.ticketOrders = body;
        console.log(body);
        console.log("獲取資料成功");
      } else {
        console.log("獲取資料失敗");
      }
    } catch (error) {
      console.log("發送請求失敗,請檢察網路連接");
    }
  },
};
</script>

<template>
  <div class="container-fluid d-flex">
    <div class="col-4">
      <SideBarComponent />
    </div>
    <div class="museum-management-body d-flex flex-column col-8">
      <div class="title-group mt-5">
        <div class="title d-flex align-items-center">
          <font-awesome-icon icon="landmark" style="font-size: 55px" />
          <h1 class="title-text ms-3">銷售報表</h1>
        </div>
      </div>
      <!-- 圖表 -->
      <div class="chart-container mt-4">

      </div>
    </div>
  </div>
</template>

<style scoped>
.title-group {
  color: #2c3e50;
}
.title-text {
  font-weight: bolder;
}
.chart-container {
  max-width: 600px;
  margin: auto;
}
</style>
