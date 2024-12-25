<script  >
import SideBarComponent from "@/RearPage/SideBar.vue";

export default {
  data(){
    return{
      searchName: "",
      productOrders:[]
    }
  },
  computed:{
    mergedOrders(){
      return this.productOrders.map(order => {
        const totalAmount = order.orderProducts.reduce(
            (sum, product) => sum + parseFloat(product.total || 0),
            0
        );
        const productTitles = order.orderProducts.map(product => product.title).join("   ,   ");

        return {
          product_order_id: order.product_order_id,
          email: order.email,
          id_number: order.id_number,
          name: order.name,
          phone: order.phone,
          order_time: order.order_time,
          totalAmount,
          productTitles
        };
      });

    },
    filteredOrders() {
      if (!this.searchName) {
        return this.mergedOrders; // 如果沒有輸入單號，顯示所有訂單
      }
      return this.mergedOrders.filter(order =>
          order.name.includes(this.searchName)
      );
    }

  },
  components: {
    SideBarComponent,
  },
  methods:{
    filterOrders() {
      // 按下按鈕時觸發，更新篩選條件（實際上綁定了 v-model，所以不一定需要這個方法）
      this.searchId = this.searchId.trim();
    }
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
        this.productOrders = body;
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
    <div class="ticket-management-body d-flex flex-column col-8  ">
      <!--標題-->
      <div class="title-group mt-5">
        <div class="title d-flex align-items-center  ">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" style="font-size: 55px" />
          <h1 class="title-text ms-3">商品管理</h1>
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
            <input type="text" class="form-control" v-model="searchName" placeholder="請輸入姓名篩選" aria-label="Recipient's username" aria-describedby="button-addon2">

          </div>
        </div>
      </div>
            <table class="table table-striped ">
              <thead class="table-dark">
              <tr>
                <th scope="col" class="text-center">訂單編號</th>
                <th scope="col" class="text-center">姓名</th>
                <th scope="col" class="text-center">email</th>
                <th scope="col" class="text-center">手機</th>
                <th scope="col" class="text-center">訂貨時間</th>
                <th scope="col" class="text-center">商品名稱</th>
                <th scope="col" class="text-center">應支付金額</th>
              </tr>
              </thead>
              <tbody>
              <tr   v-for="(order, index) in filteredOrders" :key="index">
                <td>{{ order.product_order_id }}</td>
                <td>{{ order.name }}</td>
                <td>{{ order.email }}</td>
                <td>{{ order.phone }}</td>
                <td>{{ order.order_time }}</td>
                <td>{{ order.productTitles }}</td>
                <td>{{ order.totalAmount }}</td>
              </tr>
              </tbody>
            </table>

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