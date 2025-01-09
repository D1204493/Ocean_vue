import store from "@/scripts/store.js";

export async function fetchTickets(store, refresh) {
      if(!store.getters.getTicketOrder  || refresh) {
        try{
          const response = await fetch("http://localhost:8080/ticket/getAllOrder",{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            }
          });
          if(response.ok){
            const body =await response.json();
            store.commit("setTicketOrder", body);
            console.log("獲取資料成功");
          } else {
            console.log("獲取資料失敗");
          }
        }  catch (error) {
          console.log(error.message);
        }
      } else {
        console.log(store.getters.getTicketOrder)
      }

}
export async function deleteOrder(order_id) {
  try{
    const response = await fetch("http://localhost:8080/ticket/deleteOrder/" + order_id,{
      method:"DELETE"
    })
    if(response.ok) {
      console.log("刪除訂單成功");
      await fetchTickets(store, true)
      return "刪除訂單成功";
    } else {
      console.log("刪除訂單失敗");
      return "刪除訂單失敗：" + response.status ;
    }
  } catch (error) {
    console.log("刪除訂單失敗");
    return "刪除訂單失敗, 請檢查網路連線";
  }
}

export async function  submitEdit(selectedOrder) {
  const ticket_order_id = selectedOrder.ticket_order_id;
  console.log("TEST:",selectedOrder);
  try{
    const response = await fetch("http://localhost:8080/ticket/editOrder/" + ticket_order_id,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(selectedOrder)
    });
    if(response.ok) {
      console.log("Test success");
      return "修改訂單成功"
    } else {
      return "修改訂單失敗:" + response.status
    }
    } catch (error) {
    return "修改訂單失敗, 請檢查網路連線"
  }
}