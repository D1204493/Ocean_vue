<script  >
import SideBarComponent from "@/RearPage/SideBar.vue";

export default {
  components: {
    SideBarComponent,
  },
  methods:{

  },
  async created() {
    try{
      const response = await fetch("http://localhost:8080/product/getAllOrder",{
        method:"GET",
        headers:{
          "Accept":"application/json"
        }
      });
      if(response.ok) {
        const body = await response.json();
        console.log(body);
      } else {
        console.log("獲取商品訂單資料失敗");
      }
    } catch(error){
        console.log("發送請求失敗, 請檢查網路");
    }
  }
}
</script>

<template>
  <div class="container-fluid d-flex">
    <div class="col-4">
      <SideBarComponent/>
    </div>
  </div>
</template>

<style scoped>

</style>