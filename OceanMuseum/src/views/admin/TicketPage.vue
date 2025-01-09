<script  >
 import {fetchTickets, deleteOrder, submitEdit} from "@/scripts/ticketMethods.js";
 import { useStore } from "vuex";
 import store from "@/scripts/store.js";
 import sideBar from "@/components/admin-componet/SideBar.vue";
 export default {
    name: 'TicketManageBoard',
   components:{
     sideBar
   },
    data() {
      return {
        statistics: [
          {
            title: '本月訂單',
            value:    0,
            icon: 'fas fa-shopping-cart',
            iconBg: 'bg-primary bg-opacity-10',
            textColor: 'text-primary',
            trend: {
              value: '12.5%',
              icon: 'fa-arrow-up',
              color: 'text-success'
            }
          },
          {
            title: '本月營收',
            value:  0 ,
            icon: 'fas fa-dollar-sign',
            iconBg: 'bg-success bg-opacity-10',
            textColor: 'text-success',
            trend: {
              value: '8.3%',
              icon: 'fa-arrow-up',
              color: 'text-success'
            }
          },
          {
            title: '活躍會員',
            value: '1,234',
            icon: 'fas fa-users',
            iconBg: 'bg-warning bg-opacity-10',
            textColor: 'text-warning',
            trend: {
              value: '5.2%',
              icon: 'fa-arrow-up',
              color: 'text-success'
            }
          },
          {
            title: '退票率',
            value: '2.4%',
            icon: 'fas fa-undo',
            iconBg: 'bg-danger bg-opacity-10',
            textColor: 'text-danger',
            trend: {
              value: '0.3%',
              icon: 'fa-arrow-up',
              color: 'text-danger'
            }
          }
        ],
        tableHeaders: ['訂單編號', '會員資料', '票種/數量', '金額', '造訪日期', '認證碼', "操作"],
        ticketOrders:null,
        isEditModalVisible:false,
        selectedOrder:null
      }
    },
    methods: {
      getTicketTypeName(type) {
        // 方法1：使用 if else
        if (type === 'full') return '全票'
        if (type === 'half') return '半票'
        if (type === 'child') return '優待票'
        return type
      },
      //開啟修改訂單介面
      editOrder(order) {
        this.isEditModalVisible = true;
        this.selectedOrder = order;
      },
      //提交修改
       async submit() {
        if(!this.isCorrectFormat()) {
          this.$toast.error("請填寫完整資訊");
          return;
        }
         const status = await submitEdit(this.selectedOrder);
         if(status === "修改訂單成功") {
           this.getOrders();
           this.isEditModalVisible = false;
           this.$toast.success(status);
         } else {
           this.isEditModalVisible = false;
           this.$toast.error(status);
         }
         this.selectedOrder = null;
       },
      //刪除訂單
      async deleteOrder(order_id) {
        const status = await deleteOrder(order_id);
        if(status === "刪除訂單成功") {
          this.getOrders();
          this.$toast.success(status);
        } else {
          this.$toast.error(status);
        }
      },
      //用於如果vuex檔案更新, 則再獲取一次
      getOrders() {
        this.ticketOrders = store.getters.getTicketOrder;
      },
      //關閉修改訂單的modal
      closeEditModal() {
        this.isEditModalVisible = false;
        this.selectedOrder = null;
      },
      //檢查修改訂單資訊
      isCorrectFormat() {
        if(!this.selectedOrder.name.trim() || !this.selectedOrder.email.trim()
            || !this.selectedOrder.phone.trim()|| !this.selectedOrder.id_number.trim()
            || !this.selectedOrder.visit_time.trim()) {
          return false;
        }
        return true;
      },


    },
    async created(){
        await fetchTickets(store, false);
        this.ticketOrders = store.getters.getTicketOrder
        console.log(this.ticketOrders);
    },
   setup(){
     const store = useStore();
   },
   computed:{
     monthlyStats() {
       const now = new Date();
       const yearMonth = now.toISOString().slice(0, 7);

       // 篩選本月訂單
       const currentMonthOrders = this.ticketOrders?.filter(order =>
           order.visit_time.startsWith(yearMonth)
       ) || []

       // 計算本月總營收
       let totalRevenue = 0
       for(let order of currentMonthOrders) {
         for(let ticket of order.orderTickets) {
           totalRevenue += ticket.price * ticket.quantity
         }
       }
       this.statistics[0].value = currentMonthOrders.length
       this.statistics[1].value = '$' + totalRevenue.toLocaleString()
       return this.statistics
     } ,
   }
}
</script>

<template>
  <div class="container-fluid d-flex g-0">
      <div class="p-0">
        <side-bar/>
      </div>
      <div class=" flex-grow-1">
        <div class="p-4 ms-2">
          <!------------------------------------------- 頁面NavBar ---------------------------------------------->
          <div class="d-flex justify-content-between align-items-center mb-4 title-group">
            <h4 class="fw-bold mb-0 "  style="font-size: 55px"><font-awesome-icon icon="ticket-alt" class="me-2"/>訂票管理</h4>
          </div>

          <div class="row g-4 mb-4">
            <div class="col-md-3" v-for="stat in monthlyStats" :key="stat.title">
              <div class="stat-card">
                <div :class="['stat-icon', stat.iconBg, stat.textColor]">
                  <i :class="stat.icon"></i>
                </div>
                <p class="text-muted mb-1">{{ stat.title }}</p>
                <h3 class="fw-bold mb-1">{{ stat.value }}</h3>
                <small :class="stat.trend.color">
                  <i :class="['fas', stat.trend.icon, 'me-1']"></i>
                  {{ stat.trend.value }}
                </small>
              </div>
            </div>
          </div>

          <!--------------------------------------------訂單一覽表---------------------------------------------->
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold mb-0">近期訂單</h5>
                <div class="d-flex gap-2">
                </div>
              </div>

              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                  <tr>
                    <th v-for="header in tableHeaders" :key="header" >{{ header }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="order in ticketOrders" :key="order.ticket_order_id">
                    <td class="fw-bold">{{ order.ticket_order_id }}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                          <i class="fas fa-user text-primary"></i>
                        </div>
                        <div>
                          <div class="fw-semibold">{{ order.name }}</div>
                          <div><small class="text-muted">電話：{{ order.phone }}</small></div>
                          <div><small class="text-muted">Email：{{ order.email }}</small></div>
                        </div>
                      </div>
                    </td >
                    <td class="fw-semibold">
                      {{ order.orderTickets
                        .map(ticket => `${getTicketTypeName(ticket.type)}(${ticket.quantity}張)`)
                        .join(', ')
                      }}
                    </td>
                    <td class="fw-semibold">
                      NT$ {{ order.orderTickets.reduce((sum, ticket) =>
                        sum + (ticket.quantity * ticket.price), 0) }}
                    </td>
                    <td class="fw-semibold">
                      {{order.visit_time}}
                    </td>
                    <td class="fw-semibold">
                      {{order.verifyCode}}
                    </td>
                    <td>
                      <button class="btn btn-action btn-light me-1" @click="editOrder(order)">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-action btn-light text-danger " @click="deleteOrder(order.ticket_order_id)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

  <!--------------------------------------------編輯訂單---------------------------------------------->
  <div v-if="isEditModalVisible" class="modal d-block" style="background-color: rgba(0,0,0,0.5)">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">編輯訂單</h5>
          <button type="button" class="btn-close" @click="closeEditModal"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">姓名<span style="color: red">*</span></label>
              <input type="text" class="form-control" v-model="selectedOrder.name">
            </div>
            <div class="mb-3">
              <label class="form-label">身分證字號<span style="color: red">*</span></label>
              <input type="text" class="form-control" v-model="selectedOrder.id_number">
            </div>
            <div class="mb-3">
              <label class="form-label">電話<span style="color: red">*</span></label>
              <input type="tel" class="form-control" v-model="selectedOrder.phone">
            </div>
            <div class="mb-3">
              <label class="form-label">Email<span style="color: red">*</span></label>
              <input type="email" class="form-control" v-model="selectedOrder.email">
            </div>
            <div class="mb-3">
              <label class="form-label">日期<span style="color: red">*</span></label>
              <input type="date" class="form-control" v-model="selectedOrder.visit_time">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="close-edit-btn" @click="closeEditModal">取消</button>
          <button type="button" class="btn btn-primary "  @click="submit">儲存</button>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>

.title-group{
  color: #2c3e50;
}






.search-bar-btn{
  background: darkorange;
  color: white;
}
</style>