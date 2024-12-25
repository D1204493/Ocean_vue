<template>
    <div class="booking-form">
        <div class="form-header">
            <h2>購票資訊</h2>
            <!-- <button class="back-btn" @click="$router.push('/TicketInfoView')">返回</button> -->
            <button class="back-btn" @click="$router.push('/TicketInfoView')">
                <img src="/backIcon.png">
            </button>
        </div>
        <p class="required-note">*為必填項目</p>

        <div class="form-container">
            <div class="form-layout">
                <div class="personal-info">
                    <div class="form-group">
                        <label><span class="required">*</span>購票人姓名</label>
                        <input type="text" v-model="formData.name" placeholder="王大名" required>
                    </div>

                    <div class="form-group">
                        <label><span class="required">*</span>身分證字號</label>
                        <input type="text" v-model="formData.id_number" placeholder="D123456789" required>
                    </div>

                    <div class="form-group">
                        <label><span class="required">*</span>連絡電話</label>
                        <input type="tel" v-model="formData.phone" placeholder="0912345678" required>
                    </div>

                    <div class="form-group">
                        <label>電子信箱</label>
                        <input type="email" v-model="formData.email" placeholder="John@gmail.com">
                    </div>

                    <div class="form-group">
                        <label><span class="required">*</span>參觀日期</label>
                        <input type="date" v-model="formData.visitDate" @change="handleDateChange" required>
                    </div>
                    <div v-if="formData.visitDate" class="date-type">
                        {{ isHoliday ? '假日價格' : '平日價格' }}
                    </div>
                </div>

                <div class="summary-section">
                    <div class="summary-card">
                        <div class="total">總價: ${{ totalAmount }} TWD</div>
                        <div class="participants">參與人數: {{ totalParticipants }}</div>
                    </div>
                </div>
            </div>

            <div>
                <div class="ticket-selection">
                    <div class="ticket-type" v-for="ticket in ticketPrices" :key="ticket.ticket_id">
                        <label>
                            {{ getChineseTicketName(ticket.type) }} ${{ getTicketPrice(ticket.type) }}
                            <span class="price-type">{{ getPriceType }}</span>
                        </label>
                        <div class="quantity-control">
                            <button @click="decreaseTicket(ticket.type)"
                                :disabled="formData[ticket.type + 'Tickets'] <= 0">-</button>
                            <input type="number" v-model="formData[ticket.type + 'Tickets']" readonly>
                            <button @click="increaseTicket(ticket.type)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="actions">
            <button class="cancel-btn" @click="resetForm">清空資訊</button>
            <button class="submit-btn" @click="validateAndProceed">確定購票</button>
        </div>
    </div>

    <!--payment info modal -->
    <div v-if="currentModal === 'userInfoModal'" class="modal fade " id="payment_modal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">請確認付款資訊</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">姓名<span class="text-danger">*</span></label>
                            <input type="text" id="name" class="form-control" v-model="formData.name" required>
                        </div>
                        <div class="mb-3">
                            <label for="idNumber" class="form-label">身分證字號<span class="text-danger">*</span></label>
                            <input type="text" id="idNumber" class="form-control" v-model="formData.id_number" required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">電話<span class="text-danger">*</span></label>
                            <input type="tel" id="phone" class="form-control" v-model="formData.phone" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email(選填)</label>
                            <input type="email" id="email" class="form-control" v-model="formData.email">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="validateAndProceed">提交</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Payment method modal-->
    <div class="modal fade" id="payment_modal" tabindex="-1"
        aria-labelledby="paymentMethodLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="paymentMethodLabel">選擇支付方式</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="paymentForm">
                        <!-- 支付方式選擇 -->
                        <div class="mb-3">
                            <label class="form-label">支付方式</label>
                            <select class="form-select" v-model="selectedPaymentMethod">
                                <option value="" selected disabled>請選擇</option>
                                <option value="visa">Visa</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>

                        <!-- 卡號詳細訊息 -->
                        <div v-if="selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'paypal'">
                            <div class="mb-3">
                                <label class="form-label">卡號</label>
                                <input type="text" class="form-control" v-model="formData.creditCardDetails.cardNumber"
                                    placeholder="例如：1234 5678 9012 3456">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">有效期</label>
                                <input type="text" class="form-control" v-model="formData.creditCardDetails.expiryDate"
                                    placeholder="MM/YY">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">安全碼 (CVV)</label>
                                <input type="text" class="form-control" v-model="formData.creditCardDetails.cvv"
                                    placeholder="CVV">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">取消</button>
                    <button type="button" class="btn btn-primary" @click="submitForm">確認</button>
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
            currentModal: 'userInfoModal',
            paymentModal: null,  // 用於存儲 Modal 實例
            selectedPaymentMethod: '', // 選擇的支付方式
            formData: {
                id_number: '',
                name: '',
                phone: '',
                email: '',
                visitDate: '',
                fullTickets: 0,  // 全票數量
                halfTickets: 0,  // 優待票數量
                childTickets: 0,  // 博愛票數量
                tickets: [
                    { type: "full", quantity: 0, price: 0 },
                    { type: "half", quantity: 0, price: 0 },
                    { type: "child", quantity: 0, price: 0 }
                ],
                creditCardDetails: {
                    cardNumber: '',
                    expiryDate: '',
                    cvv: ''
                }
            },
            ticketPrices: { // 票價設定
                full: { ticket_id: "1", type: 'full', weekday: 150, weekend: 200 },
                half: { ticket_id: "2", type: 'half', weekday: 120, weekend: 150 },
                child: { ticket_id: "3", type: 'child', weekday: 75, weekend: 100 },
            },
            // 特定假日清單 (年-月-日 格式)
            holidays: [
                '2024-01-01', // 元旦
                '2024-02-08', // 春節
                '2024-02-09',
                '2024-02-10',
                '2024-02-11',
                '2024-02-12',
                '2024-02-28', // 和平紀念日
                '2024-04-04', // 兒童節
                '2024-04-05', // 清明節
                '2024-09-23', // 中秋節
                '2024-10-10', // 雙十節
            ],
            // 用於存儲價格變動提示
            previousPriceType: null,  // 記錄前一次的價格類型
        }
    },

    computed: {
        isWeekend() {  // 判斷是否為週末
            if (!this.formData.visitDate) return false;
            const date = new Date(this.formData.visitDate);
            const day = date.getDay();
            return day === 0 || day === 6; // 0是週日，6是週六
        },
        isHoliday() {  // 判斷是否為假日（週末或特定假日）
            if (!this.formData.visitDate) return false;
            return this.isWeekend || this.holidays.includes(this.formData.visitDate);
        },
        getPriceType() {  // 取得價格類型標示
            if (!this.formData.visitDate) return '';
            return this.isHoliday ? '(假日價)' : '(平日價)';
        },
        totalAmount() {  // 計算總金額
            return (
                this.formData.fullTickets * this.getTicketPrice('full') +
                this.formData.halfTickets * this.getTicketPrice('half') +
                this.formData.childTickets * this.getTicketPrice('child')
            )
        },
        totalParticipants() {  // 計算總人數
            return (
                this.formData.fullTickets +
                this.formData.halfTickets +
                this.formData.childTickets
            )
        }
    },
    methods: {
        getTicketPrice(type) {  // 取得票價
            if (!this.formData.visitDate) {
                this.formData.tickets[0].price = this.ticketPrices.full.weekday;
                this.formData.tickets[1].price = this.ticketPrices.half.weekday;
                this.formData.tickets[2].price = this.ticketPrices.child.weekday;
                return this.ticketPrices[type].weekday; // 預設顯示平日價格
            }
            this.formData.tickets[0].price = this.ticketPrices.full.weekend;
            this.formData.tickets[1].price = this.ticketPrices.half.weekend;
            this.formData.tickets[2].price = this.ticketPrices.child.weekend;
            return this.isHoliday ? this.ticketPrices[type].weekend : this.ticketPrices[type].weekday;
        },
        handleDateChange() {  // 處理日期變更
            const currentPriceType = this.isHoliday;

            // 如果之前有選擇日期，且價格類型發生變化
            if (this.previousPriceType !== null &&
                this.previousPriceType !== currentPriceType &&
                this.totalParticipants > 0) {
                this.showPriceChangeNotification();
            }
            this.previousPriceType = currentPriceType;
        },
        // 顯示價格變動提示
        showPriceChangeNotification() {
            alert(`因選擇${this.isHoliday ? '假日' : '平日'}，票價已更新`);
        },
        // 增加票數
        increaseTicket(type) {
            const ticketMap = {
                full: 0,
                half: 1,
                child: 2
            };
            const index = ticketMap[type];
            if (index !== undefined) {
                this.formData.tickets[index].quantity++;
                this.formData[`${type}Tickets`]++;
            }
        },
        // 減少票數
        decreaseTicket(type) {
            const ticketMap = {
                full: 0,
                half: 1,
                child: 2
            };
            const index = ticketMap[type];
            if (index !== undefined && this.formData[`${type}Tickets`] > 0) {
                this.formData.tickets[index].quantity--;
                this.formData[`${type}Tickets`]--;
            }
        },
        // 重置表單
        resetForm() {
            this.formData.name = "";
            this.formData.id_number = "";
            this.formData.phone = "";
            this.formData.email = "";
            this.formData.visitDate = "";
            this.formData.fullTickets = 0;
            this.formData.halfTickets = 0;
            this.formData.childTickets = 0;
        },
        getChineseTicketName(englishName) {
            if (englishName === "full") {
                return "全票"
            } else if (englishName === "half") {
                return "半票"
            } else if (englishName === "child") {
                return "優待票"
            }
        },
        validateAndProceed() {
            // 先檢查表單
            if (!this.formData.name) {
                alert("請填寫購票人姓名！");
                return;
            }
            if (!this.formData.id_number) {
                alert("請填寫身分證字號！");
                return;
            }
            if (!this.formData.phone) {
                alert("請填寫連絡電話！");
                return;
            }
            if (!this.formData.visitDate) {
                alert("請選擇參觀日期！");
                return;
            }

            // 檢查是否有選擇票種
            const hasValidTicket = this.formData.tickets.some(ticket => ticket.quantity > 0);
            if (!hasValidTicket) {
                alert("至少必須選擇一種票種！");
                return;
            }

            // 設置 Modal 狀態並顯示
            this.showPaymentMethodModal();
        },
        showPaymentMethodModal() {
            this.currentModal = 'paymentMethodModal';
            // 確保先關閉任何可能開啟的 Modal
            this.closeAllModals();

            // 創建並顯示新的 Modal
            const modal = document.getElementById('payment_modal');
            if (modal) {
                this.paymentModal = new bootstrap.Modal(modal, {
                    backdrop: 'static',  // 防止點擊背景關閉
                    keyboard: false      // 防止按 ESC 關閉
                });
                this.paymentModal.show();
            }
        },
        closeAllModals() {
            // 關閉所有開啟的 Modal
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            });

            // 移除所有背景遮罩
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                backdrop.remove();
            });

            // 重置 body 樣式
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        },

        // 關閉特定 Modal
        closeModal() {
            if (this.paymentModal) {
                this.paymentModal.hide();
                this.paymentModal = null;
            }
            this.closeAllModals();
        },

        // 提交表單給後端處理
        async submitForm() {
            if (!this.formData.creditCardDetails.cardNumber || !this.formData.creditCardDetails.cvv || !this.formData.creditCardDetails.expiryDate) {
                alert('請完整填寫信用卡資訊！');
                return;
            }
            const userOrderInfo = {
                id_number: this.formData.id_number,
                name: this.formData.name,
                phone: this.formData.phone,
                email: this.formData.email,
                date: this.formData.visitDate,
                tickets: this.formData.tickets,
                cardInfo: this.formData.creditCardDetails
            };

            console.log('Form submitted:', userOrderInfo);
            try {
                const response = await fetch("http://localhost:8080/ticket/orderTicket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userOrderInfo)
                });

                if (response.ok) {
                    const message = await response.text();
                    alert(message);
                    // 關閉 modal 並清理相關樣式
                    this.closeModal();
                    // 重置表單數據
                    this.resetFormAfterSubmit();
                } else {
                    console.error(`HTTP error! status: ${response.status}`);
                    alert(`訂單送出失敗，請檢查卡號格式`);
                }
            } catch (error) {
                console.error("Network error:", error.message);
                alert("網絡發生錯誤，請稍後再試");
            }

        },

        // 新增方法：重置表單數據
        resetFormAfterSubmit() {
            this.closeModal();
            // 重置 modal 狀態
            this.currentModal = 'userInfoModal';
            // 重置支付方式
            this.selectedPaymentMethod = '';
            // 重置所有表單資料
            this.formData = {
                id_number: '',
                name: '',
                phone: '',
                email: '',
                visitDate: '',
                fullTickets: 0,
                halfTickets: 0,
                childTickets: 0,
                tickets: [
                    { type: "full", quantity: 0, price: 0 },
                    { type: "half", quantity: 0, price: 0 },
                    { type: "child", quantity: 0, price: 0 }
                ],
                creditCardDetails: {
                    cardNumber: '',
                    expiryDate: '',
                    cvv: ''
                }
            };
            // 重置價格類型提示
            this.previousPriceType = null;
        },

        checkTicketInfo() {
            if (!this.formData.name) {
                alert("請填寫購票人姓名！");
                return false;
            }
            if (!this.formData.id_number) {
                alert("請填寫身分證字號！");
                return false;
            }
            if (!this.formData.phone) {
                alert("請填寫連絡電話！");
                return false;
            }
            if (!this.formData.visitDate) {
                alert("請選擇參觀日期！");
                return false;
            }
            const hasValidTicket = this.formData.tickets.some(ticket => ticket.quantity > 0);
            if (!hasValidTicket) {
                alert("至少必須選擇一種票種！");
                return false;
            }
            return true;
        }
    }
}
</script>
<style scoped>
.booking-form {
    max-width: none;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.back-btn {
    background: #98d2f0;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.back-btn:hover {
    background: #61c5f7;
    transform: translateX(-3px);
}

.back-btn img {
    width: 24px;
    height: 24px;
}

.required-note {
    color: #ff0000;
    font-size: 14px;
    margin-bottom: 20px;
}

.form-container {
    background: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    /* 設定最大寬度 */
    margin: 0 auto;
    /* 置中 */
}

/* 預設為直向佈局 */
.form-layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 1024px 以上改為橫向佈局 */
@media (min-width: 1024px) {
    .booking-form {
        padding: 40px;
    }

    .form-container {
        padding: 40px;
    }

    .form-layout {
        flex-direction: row;
        gap: 60px;
    }

    .personal-info {
        flex: 2;
        padding-right: 0;
        min-width: 350px;
    }

    .summary-section {
        flex: 1;
        min-width: 400px;
        display: flex;
        align-items: center;
    }

    .summary-card {
        background: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 20px;
        width: 100%;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .ticket-selection {
        margin-top: 30px;
        padding-top: 30px;
        display: flex;
        gap: 20px;
    }

    .ticket-type {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 0;
    }

    .ticket-type label {
        text-align: center;
    }

    .quantity-control {
        flex-direction: row;
        justify-content: center;
    }
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.required {
    color: #ff0000;
    margin-right: 4px;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="date"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.ticket-selection {
    margin-top: 20px;
    border-top: 1px solid #ddd;
    padding-top: 20px;
}

.ticket-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.ticket-type label {
    font-size: 20px;
}

.date-type {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
}

.price-type {
    font-size: 14px;
    color: #666;
    margin-left: 5px;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #fff3cd;
    border: 1px solid #ffeeba;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-control button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
}

.quantity-control button:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

.quantity-control input {
    width: 50px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
}

.total {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.participants {
    font-size: 24px;
    text-align: center;
}

.actions {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 15%;
    /* 增加按鈕間距 */
}

.cancel-btn,
.submit-btn {
    width: 140px;
    /* 固定寬度 */
    padding: 12px 35px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    /* 添加過渡效果 */
    text-align: center;
}

.cancel-btn {
    background: #f5f5f5;
    border: 1px solid #ddd;
}

.cancel-btn:hover {
    background: #e0e0e0;
    /* 滑鼠移過時的顏色 */
}

.submit-btn {
    background: #e6a23c;
    color: white;
    border: none;
}

.submit-btn:hover {
    background: #d4941a;
    /* 滑鼠移過時的顏色 */
}
</style>