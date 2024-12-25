<script  >
import SideBarComponent from "@/RearPage/SideBar.vue";

export default {
  name: "SideBar",
  components: {
    SideBarComponent,
  },
  data(){
    return{
      isClicked:false,
      filterOptions:[
         {option:"所有訂票",isClicked: false} ,
        {option:"已交付",isClicked: false},
        {option:"尚未交付",isClicked: false},
        {option:"已取消",isClicked: false},
        { option:"已退票",isClicked: false}
      ]
    }
  },
  methods:{
    toggleBtn(index){
      this.filterOptions.forEach((option, i) => {
        option.isClicked = i === index;
      });
    }
  },
  async created() {
    try{
      const response = await fetch("http://localhost:8080/ticket/getAllOrder",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
      if(response.ok){
        const body =await response.json();
        console.log(body);
        console.log("獲取資料成功");
      } else {
        console.log("獲取資料失敗");
      }
    }  catch (error) {
      console.log("發送請求失敗,請檢察網路連接");
    }

  }
};

</script>

<template>

  <div class="container-fluid d-flex">
    <div class="col-4">
      <SideBarComponent/>
    </div>
    <div class="ticket-management-body d-flex flex-column col-8  ">
      <!--標題-->
      <div class="title-group mt-5">
        <div class="title d-flex align-items-center  ">
          <font-awesome-icon icon="ticket-alt" style="font-size: 55px" />
          <h1 class="title-text ms-3">票務管理</h1>
        </div>
      </div>
      <!--篩選-->
      <div class="filter-group mt-4 d-flex">
        <div>
          <label for="basic-select">依照狀態篩選：</label>
          <select id="basic-select" name="options">
            <option value="all">全部</option>
            <option value="paid">已付款</option>
            <option value="unpaid">未付款</option>
          </select>
        </div>
        <div class="search-bar ms-auto">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="請輸入單號" aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary search-bar-btn" type="button" id="button-addon2"><span><font-awesome-icon icon="search" /></span></button>
          </div>
        </div>
      </div>

      <div class="ticket-mgn-body mt-4">
        <table class="table table-striped">
          <thead class="table-dark">
          <tr>
            <th scope="col" class="text-center">單號</th>
            <th scope="col" class="text-center">訂票者</th>
            <th scope="col" class="text-center">日期</th>
            <th scope="col" class="text-center">ID</th>
            <th scope="col" class="text-center">應支付金額</th>
            <th scope="col" class="text-center">狀態</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row" class="text-center">t12345678</th>
            <td class="text-center">Mark</td>
            <td class="text-center">2024/12/2</td>
            <td class="text-center">D122713567</td>
            <td class="text-center">$400</td>
            <td class="text-center">未支付</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">t12345678</th>
            <td class="text-center">Mark</td>
            <td class="text-center">2024/12/2</td>
            <td class="text-center">D122713567</td>
            <td class="text-center">$400</td>
            <td class="text-center">未支付</td>
          </tr>



          </tbody>
        </table>
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

.mgn-button{
  background: #adb5bd;
  width: 120px;
  font-weight: bolder;
}
.mgn-button-is-clicked{
  background: darkorange;
  color: white;
}

.mgn-button:active{
  background-color: orange;
}
.search-bar-btn{
  background: darkorange;
  color: white;
}
</style>