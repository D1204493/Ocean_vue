<script  >
import SideBarComponent from "@/RearPage/SideBar.vue";

export default{
  name: "SideBar",
  components: {
    SideBarComponent,
  },
  data(){
    return{
      options:[
        {option:"展館資訊",isClicked: false},
        {option: "Q&A管理",isClicked: false},
        {option: "圖片管理",isClicked: false}
      ]
    }
  },
  methods:{
    toggleBtn(index){
      this.options.forEach((option, i) => {
        option.isClicked = i === index;
      });
    }
  }
}
</script>

<template>
  <div class="container-fluid d-flex">
    <div class="col-4">
      <SideBarComponent/>
    </div>
    <div class="museum-management-body d-flex flex-column col-8  ">
      <div class="title-group mt-5">
        <div class="title d-flex align-items-center  ">
          <font-awesome-icon icon="landmark" style="font-size: 55px" />
          <h1 class="title-text ms-3">展場管理</h1>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>
.title-group{
  color: #2c3e50;
}
.title-text{
  font-weight: bolder;
}
</style>