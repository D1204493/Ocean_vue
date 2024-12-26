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
      searchName: "",
      ticketOrders:[],
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

  },
computed:{
  mergedOrders(){
    return this.ticketOrders.map(order => {
      const totalAmount = order.orderTickets.reduce(
          (sum, ticket) => sum + parseFloat(ticket.price || 0),
          0
      );
      const ticketsTypes = order.orderTickets.map(ticket => ticket.type).join("   ,   ");

      return {
        ticket_order_id: order.ticket_order_id,
        email: order.email,
        id_number: order.id_number,
        name: order.name,
        phone: order.phone,
        visit_time: order.visit_time,
        totalAmount,
        ticketsTypes
      };
    });


  },
  filteredOrders() {
    if (!this.searchName.trim()) {
      return this.mergedOrders; // 如果未輸入姓名，顯示所有訂單
    }

    return this.mergedOrders.filter(order =>
        order.name.toLowerCase().includes(this.searchName.trim().toLowerCase())
    );
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
        this.ticketOrders = body;
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
            <input type="text" class="form-control"  v-model="searchName" placeholder="請輸入姓名篩選" aria-label="Recipient's username" aria-describedby="button-addon2">

          </div>
        </div>
      </div>

      <div class="ticket-mgn-body mt-4">
        <table class="table table-striped">
          <thead class="table-dark">
          <tr>
            <th scope="col" class="text-center">訂單編號</th>
            <th scope="col" class="text-center">姓名</th>
            <th scope="col" class="text-center">email</th>
            <th scope="col" class="text-center">手機</th>
            <th scope="col" class="text-center">參訪時間</th>
            <th scope="col" class="text-center">訂票種類</th>
            <th scope="col" class="text-center">應支付金額</th>
          </tr>
          </thead>
          <tbody>
          <tr   v-for="(order, index) in filteredOrders"  :key="index">
            <td>{{ order.ticket_order_id }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.phone }}</td>
            <td>{{ order.visit_time }}</td>
            <td>{{ order.ticketsTypes }}</td>
            <td>{{ order.totalAmount }}</td>
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




.search-bar-btn{
  background: darkorange;
  color: white;
}
</style>