<template>
    <div class="container">
        <div class="price-card">
            <table class="price-table">
                <thead>
                    <tr>
                        <th class="ticket-type-header"></th>
                        <th class="table-header">平日</th>
                        <th class="table-header">假日</th>
                        <th class="opening-hours table-header">館場開放時間<br>/應注意事項</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in ticketTypes" :key="index">
                        <td class="ticket-type">{{ item.type }}</td>
                        <td class="price">
                            <span class="currency">$</span>{{ item.weekday }}
                        </td>
                        <td class="price">
                            <span class="currency">$</span>{{ item.weekend }}
                        </td>
                        <td v-if="index === 0" class="notice" rowspan="3">
                            平日:08:00-17:00<br>
                            假日:07:00-18:00<br><br>
                            *優待票：<br>
                            <div class="indent">
                                a. 6歲(含)以上之學童(身高達115公分以上)、大學(含)以上持有效學生證者、持有效榮民證、公教人員退休證之民眾。<br>
                                b. 應屆畢業生請持當年度准考證或當年度入學通知並連同身分證件購買優待票；空中大學請持學生證及該年度之選課卡購買優待票
                            </div>
                            *博愛票:65歲以上長者。<br>
                            *全票:一般民眾。
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="button-group">
            <button class="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#checkmyTicketModal">我的票夾</button>
            <button class="btn btn-secondary1" @click="$router.push('/OrderTicketView')">前往訂票</button>
        </div>
    </div>


    <!-- 查票驗證身份 的 Modal -->
    <div class="modal fade" id="checkmyTicketModal" tabindex="-1" aria-labelledby="checkmyTicketModal"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">驗證身份</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label fw-bold">電話號碼<span class="text-danger">*</span></label>
                                <input v-model="verifyPhone">
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">驗證碼<span class="text-danger">*</span></label>
                                <input v-model="verifyCode">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="getUserTicketOrder">查詢</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 驗證身份成功後的 訂票資訊 Modal -->
    <div class="modal fade" id="myTicketModal" tabindex="-1" aria-labelledby="myTicketModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">我的訂票資訊</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label fw-bold">訂單編號</label>
                                <p>{{ this.userTicketOrder.ticket_order_id }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">訂票人</label>
                                <p>{{ this.userTicketOrder.name }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">電子信箱</label>
                                <p>{{ this.userTicketOrder.email }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">電話號碼</label>
                                <p>{{ this.userTicketOrder.phone }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">訂票日期</label>
                                <p>{{ this.userTicketOrder.visit_time }}</p>
                            </div>

                            <div v-for="(ticket, index) in userTicketOrder.orderTickets" :key="index" class="mb-3">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">訂票種類</label>
                                    <p>{{ ticket.type }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">訂票數量</label>
                                    <p>{{ ticket.quantity }} 張</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">訂票總額</label>
                                    <p>{{ ticket.price }} 元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning">退票</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 失敗時顯示的 Modal -->
    <div class="modal fade" id="failureModal" tabindex="-1" aria-labelledby="failureModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="failureModalLabel">找不到訂單</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>無法找到符合條件的訂單，請檢查您的輸入資訊。</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
export default {
    name: 'TicketPriceTable',
    data() {
        return {
            ticketTypes: [
                { type: '全票', weekday: 150, weekend: 200 },
                { type: '博愛票', weekday: 120, weekend: 150 },
                { type: '優待票', weekday: 75, weekend: 100 }
            ],
            verifyPhone: "",
            verifyCode: "",
            userTicketOrder: {
                ticket_order_id: "",
                name: "",
                phone: "",
                visit_time: "",
                email: "",
                orderTickets: {
                    order_ticket_id: "",
                    price: "",
                    type: "",
                    quantity: ""
                }
            }

        }
    },
    mounted() {
        // 監聽 Modal 隱藏事件
        const myTicketModal = document.getElementById('myTicketModal');
        myTicketModal.addEventListener('hidden.bs.modal', this.handleModalHidden);

        const failureModal = document.getElementById('failureModal');
        failureModal.addEventListener('hidden.bs.modal', this.handleModalHidden);

        // 新增：監聽驗證 Modal 的隱藏事件
        const verifyModal = document.getElementById('checkmyTicketModal');
        verifyModal.addEventListener('hidden.bs.modal', this.handleVerifyModalHidden);
    },
    beforeDestroy() {
        // 移除事件監聽器以避免記憶體洩漏
        const myTicketModal = document.getElementById('myTicketModal');
        myTicketModal.removeEventListener('hidden.bs.modal', this.handleModalHidden);

        const failureModal = document.getElementById('failureModal');
        failureModal.removeEventListener('hidden.bs.modal', this.handleModalHidden);

        // 新增：移除驗證 Modal 的事件監聽器
        const verifyModal = document.getElementById('checkmyTicketModal');
        verifyModal.removeEventListener('hidden.bs.modal', this.handleVerifyModalHidden);
    },
    methods: {
        handleVerifyModalHidden() {
            // 清空驗證表單的輸入欄位
            this.verifyPhone = "";
            this.verifyCode = "";
            
            // 處理背景遮罩
            this.handleModalHidden();
        },
        handleModalHidden() {
            // 確保移除所有 modal-backdrop 元素
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                backdrop.remove();
            });
            // 移除 body 上的 modal-open class
            document.body.classList.remove('modal-open');
            // 重置 body 的 style
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        },
        async getUserTicketOrder() {
            const phone = this.verifyPhone;
            const verifyCode = this.verifyCode;

            if (!phone || !verifyCode) {
                alert("請填妥查詢資訊");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/ticket/getOrder/${phone}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: verifyCode
                })
                if (response.ok) {
                    const ticketInfo = await response.json();
                    console.log(ticketInfo);
                    this.userTicketOrder = ticketInfo;

                    // 關閉驗證身份的 Modal
                    const verifyModal = bootstrap.Modal.getInstance(document.getElementById('checkmyTicketModal'));
                    if (verifyModal) {
                        verifyModal.hide();
                    }
                    // 顯示訂票資訊的 Modal
                    const ticketModal = new bootstrap.Modal(document.getElementById('myTicketModal'));
                    ticketModal.show();
                } else {
                    // 驗證失敗時，只顯示失敗 Modal，保持驗證 Modal 開啟
                    const failureModal = new bootstrap.Modal(document.getElementById('failureModal'));
                    failureModal.show();
                    const message = await response.text();
                    console.log(message);
                }
            } catch (error) {
                console.log("發送請求錯誤,請檢查網路");
            }
        }
    }

}
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
}

.price-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #e0e0e0;
    margin-bottom: 20px;
}

.price-table {
    width: 100%;
    border-collapse: collapse;
}

.table-header {
    padding: 12px;
    text-align: left;
    color: #333;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #ddd;
}

.ticket-type-header {
    width: 100px;
}

.ticket-type {
    font-size: 17px;
    font-weight: 600;
    color: #333;
    padding: 12px;
}

.price-table td {
    padding: 12px;
    border-top: 1px solid #eee;
}

.price {
    font-size: 18px;
    font-weight: bold;
}

.currency {
    font-size: 14px;
    margin-right: 2px;
}

.notice {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    padding: 12px 20px;
}

.indent {
    padding-left: 20px;
    margin: 5px 0;
}

.opening-hours {
    font-size: 18px;
    width: 30%;
}

.button-group {
    display: flex;
    gap: 100px;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 50px;
}

.btn {
    padding: 12px 35px;
    border-radius: 25px;
    border: none;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn:hover {
    opacity: 0.8;
    transform: translateY(-1px);
}

.btn-primary1 {
    background-color: #B4D132;
    color: white;
}

.btn-secondary1 {
    background-color: #E5A853;
    color: white;
}

.modal-content {
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
    border-bottom: 1px solid #eee;
    padding: 20px 30px;
}

.modal-title {
    font-size: 24px;
    color: #333;
    font-weight: 600;
}

.modal-body {
    padding: 30px;
}

.form-label {
    color: #555;
    margin-bottom: 8px;
    font-size: 16px;
}

.modal-body input {
    width: 200%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.modal-body input:focus {
    outline: none;
    border-color: #4a90e2;
}

.modal-footer {
    padding: 20px 30px;
    border-top: 1px solid #eee;
    gap: 15px;
}

.modal-footer .btn {
    min-width: 120px;
}

.btn-close {
    opacity: 0.7;
    transition: opacity 0.2s;
}

.btn-close:hover {
    opacity: 1;
}

/* 響應式設計 */
@media (max-width: 950px) {
    .container {
        max-width: 850px;
    }
}

@media (max-width: 815px) {
    .container {
        max-width: 750px;
    }
}
</style>