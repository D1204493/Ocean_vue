<template>
    <div class="product-container">
        <div class="shopping-cart" data-bs-toggle="modal" data-bs-target="#ShoppingCarModal">
            <span class="cart-icon">🛒</span>
            <span class="cart-count">{{ cartItemCount }}</span>
        </div>
        <div class="product-grid">
            <div v-for="product in products" :key="product.id" class="product-card" @click="openProductModal(product)">
                <div class="product-image">
                    <img :src="product.image" :alt="product.title">
                </div>
                <div class="product-info">
                    <h3 class="product-title">{{ product.title }}</h3>
                    <p class="product-price">{{ product.price }} 元</p>
                </div>
            </div>
        </div>
      <div class="d-flex justify-content-center  mt-5">
          <button class="btn searchOrder" data-bs-toggle="modal" data-bs-target="#checkMyProductModal">查詢我的訂單</button>
      </div>
    </div>

    <!-- 選擇商品數量的 Modal -->
    <div class="modal fade" id="choseProductModal" tabindex="-1" aria-labelledby="choseProductModal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">商品詳情</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <img :src="selectedProduct.image" :alt="selectedProduct.title"
                                class="img-fluid product-modal-image">
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label fw-bold">商品名稱</label>
                                <p>{{ selectedProduct.title }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">商品描述</label>
                                <p>{{ selectedProduct.description }}</p>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">商品單價</label>
                                <p>{{ selectedProduct.price }} 元</p>
                            </div>
                            <div class="mb-3">
                                <label for="quantity" class="form-label fw-bold">選購數量</label>
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="decreaseQuantity">-</button>
                                    <input type="number" class="form-control text-center" v-model.number="quantity"
                                        min="1">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="increaseQuantity">+</button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">商品總額</label>
                                <p class="fs-4 text-danger">{{ totalPrice }} 元</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="addToCart">加入購物車</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 購物車中的商品 Modal -->
    <div class="modal fade" id="ShoppingCarModal" tabindex="-1" aria-labelledby="ShoppingCarModal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">購物車</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 購物車為空的提示 -->
                    <div v-if="cartItems.length === 0" class="text-center py-5">
                        <h4>購物車是空的</h4>
                        <p class="text-muted">快去選購喜歡的商品吧！</p>
                    </div>

                    <!-- 購物車商品列表 -->
                    <div v-else>
                        <div v-for="item in cartItems" :key="item.id" class="cart-item card mb-3">
                            <div class="row g-0">
                                <div class="col-md-3">
                                    <img :src="item.image" :alt="item.title" class="img-fluid cart-item-image">
                                </div>
                                <div class="col-md-9">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-start">
                                            <h5 class="card-title">{{ item.title }}</h5>
                                            <button class="btn btn-sm btn-outline-danger" @click="removeFromCart(item)">
                                                ×
                                            </button>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-4">
                                                <div class="input-group input-group-sm">
                                                    <button class="btn btn-outline-secondary"
                                                        @click="updateCartItemQuantity(item, -1)">
                                                        -
                                                    </button>
                                                    <input type="number" class="form-control text-center"
                                                        v-model.number="item.quantity" min="1"
                                                        @change="handleQuantityChange(item)">
                                                    <button class="btn btn-outline-secondary"
                                                        @click="updateCartItemQuantity(item, 1)">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <p class="mb-0">單價: {{ item.price }} 元</p>
                                            </div>
                                            <div class="col-md-4">
                                                <p class="mb-0 text-end">小計: {{ item.total }} 元</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 總金額顯示 -->
                        <div class="cart-total card mt-4">
                            <div class="card-body">
                                <h5 class="text-end">
                                    總計金額: <span class="text-danger fs-4">{{ cartTotalAmount }} 元</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" :disabled="cartItems.length === 0"
                            data-bs-toggle="modal" data-bs-target="#payment_modal">
                        付款
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        關閉
                    </button>
                </div>




            </div>
        </div>
    </div>
  <!--payment info modal -->
  <div v-if="currentModal === 'userInfoModal'" class="modal fade " id="payment_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">付款資訊</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitPaymentInfo">
            <div class="mb-3">
              <label for="name" class="form-label">姓名<span class="text-danger">*</span></label>
              <input type="text" id="name" class="form-control" v-model="paymentInfo.name" required>
            </div>
            <div class="mb-3">
              <label for="idNumber" class="form-label">身分證字號<span class="text-danger">*</span></label>
              <input type="text" id="idNumber" class="form-control" v-model="paymentInfo.id_number" required>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">電話<span class="text-danger">*</span></label>
              <input type="tel" id="phone" class="form-control" v-model="paymentInfo.phone" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email(選填)</label>
              <input type="email" id="email" class="form-control" v-model="paymentInfo.email">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"    @click="validateAndProceed">提交</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Payment method modal-->
  <div v-if="currentModal === 'paymentMethodModal'" class="modal fade show"   tabindex="-1" aria-labelledby="paymentMethodLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="paymentMethodLabel">選擇支付方式</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

            <!-- 卡號詳細信息 -->
            <div v-if="selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'paypal'">
              <div class="mb-3">
                <label class="form-label">卡號</label>
                <input type="text" class="form-control" v-model="creditCardDetails.cardNumber" placeholder="例如：1234 5678 9012 3456">
              </div>
              <div class="mb-3">
                <label class="form-label">有效期</label>
                <input type="text" class="form-control" v-model="creditCardDetails.expiryDate" placeholder="MM/YY">
              </div>
              <div class="mb-3">
                <label class="form-label">安全碼 (CVV)</label>
                <input type="text" class="form-control" v-model="creditCardDetails.cvv" placeholder="CVV">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="submitPaymentInfo">確認</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 查商品驗證身份 的 Modal -->
  <div class="modal fade" id="checkMyProductModal" tabindex="-1" aria-labelledby="checkMyProductModal"
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
          <button type="button" class="btn btn-primary"  @click="getUserProductOrder">查詢</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 驗證身份成功後的 商品資訊 Modal -->
  <div  class="modal fade" id="myProductModal" tabindex="-1" aria-labelledby="myTicketModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">我的商品資訊</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label fw-bold">訂單編號</label>
                <p>{{this.userProduct.product_order_id}}</p>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">訂貨人</label>
                <p>{{this.userProduct.name}}</p>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">電子信箱</label>
                <p>{{this.userProduct.email}}</p>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">電話號碼</label>
                <p>{{this.userProduct.phone}}</p>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">訂貨日期</label>
                <p>{{this.userProduct.order_time}}</p>
              </div>

              <div v-for="(order, index) in userProduct.orderProducts" :key="index" class="mb-3">
                <div class="mb-3">
                  <label class="form-label fw-bold">商品名稱</label>
                  <p>{{ order.title }}</p>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">購買數量</label>
                  <p>{{ order.quantity }} 張</p>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">商品價格</label>
                  <p>{{ order.price }} 元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning">退貨</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 失败时显示的 Modal -->
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
    name: 'ProductGrid',
    data() {
        return {
            currentModal: 'userInfoModal',
            selectedPaymentMethod: '', // 選擇的支付方式
            creditCardDetails: {
              cardNumber: '',
              expiryDate: '',
              cvv: ''
            },
            products: [
                {
                    id: 1,
                    title: '今晚我想來點......–《奧秘海洋》122期',
                    image: '/img/Product/product1.png',
                    price: 39,
                    description: '探索海洋奧秘的精彩期刊，帶您了解海洋生態與科學知識。'
                },
                {
                    id: 2,
                    title: '小企鵝裝飾品',
                    image: '/img/Product/product2.png',
                    price: 130,
                    description: '可愛的企鵝造型裝飾品，為您的空間增添趣味。'
                },
                {
                    id: 3,
                    title: '南溟有鯤 破浪前鴕 國立海洋生物博物館紀實暨立體書2000~2024',
                    image: '/img/Product/product3.png',
                    price: 2925,
                    description: '海洋生物博物館25週年特刊，收錄珍貴史料與精美立體圖片。'
                }
            ],
            paymentInfo:{
                name:null,
                id_number:null,
                email:null,
                phone:null
            },
            selectedProduct: {},
            quantity: 1,
            cartItemCount: 0,
            cartItems: [],
            cartTotalAmount: 0,  // 新增購物車總金額
            verifyPhone:"",
            verifyCode:"",
            userProduct: {
              product_order_id:"",
              email:"",
              id_number:"",
              name:"",
              phone:"",
              order_time:"",
              orderProducts:{
                order_product_id:"",
                price:"",
                quantity:"",
                title:"",
                total:""
              }
            }
        }
    },
    computed: {
        totalPrice() {
            return this.selectedProduct.price * this.quantity;
        }
    },
    methods: {
        openProductModal(product) {
            this.selectedProduct = { ...product };
            this.quantity = 1;
            const modal = new bootstrap.Modal(document.getElementById('choseProductModal'));
            modal.show();
        },
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        addToCart() {
            const cartItem = {
                id: this.selectedProduct.id,
                title: this.selectedProduct.title,
                price: this.selectedProduct.price,
                quantity: this.quantity,
                total: this.totalPrice,
                image: this.selectedProduct.image,
            };

            // 檢查商品是否已在購物車中
            const existingItem = this.cartItems.find(item => item.id === cartItem.id);
            if (existingItem) {
                existingItem.quantity += this.quantity;
                existingItem.total = existingItem.price * existingItem.quantity;
            } else {
                this.cartItems.push(cartItem);
            }

            this.cartItemCount += this.quantity;
            this.updateCartTotal();

            // 關閉 modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('choseProductModal'));
            modal.hide();

            // 重置數量
            this.quantity = 1;
        },
        updateCartItemQuantity(item, change) {
            const newQuantity = item.quantity + change;
            if (newQuantity >= 1) {
                // 更新購物車 icon 的計數
                this.cartItemCount = this.cartItemCount - item.quantity + newQuantity;
                // 更新商品數量和總額
                item.quantity = newQuantity;
                item.total = item.price * newQuantity;
                this.updateCartTotal();
            }
        },

        handleQuantityChange(item) {
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            // 重新計算整個購物車的商品總數
            this.cartItemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
            item.total = item.price * item.quantity;
            this.updateCartTotal();
        },

        removeFromCart(item) {
            const index = this.cartItems.indexOf(item);
            if (index > -1) {
                this.cartItemCount -= item.quantity;
                this.cartItems.splice(index, 1);
                this.updateCartTotal();
            }
        },

        updateCartTotal() {
            this.cartTotalAmount = this.cartItems.reduce((sum, item) => sum + item.total, 0);
        },
        validateAndProceed() {
          const { name, id_number, phone } = this.paymentInfo;
          if (!name || !id_number || !phone) {
            alert('請完整填寫必填資訊！');
            return;
          }
          this.currentModal = 'paymentMethodModal';
          console.log("test")
        },

      //送出訂單的方法,送出前移除id與image屬性
       async submitPaymentInfo () {

         const requestBody = {
           paymentInfo: {
             name: this.paymentInfo.name,
             id_number: this.paymentInfo.id_number,
             phone: this.paymentInfo.phone,
             email: this.paymentInfo.email
           },
           cartItems: this.cartItems.map(item => ({
             title: item.title,
             price: item.price,
             quantity: item.quantity,
             total: item.total
           })),
           paymentMethod: this.selectedPaymentMethod
         };


           if (!this.creditCardDetails.cardNumber || !this.creditCardDetails.cvv || !this.creditCardDetails.expiryDate) {
             alert('請完整填寫信用卡資訊！');
             return;
           }
           requestBody.cardInfo = {
             cardNumber: this.creditCardDetails.cardNumber,
             cvv: this.creditCardDetails.cvv,
             expiryDate: this.creditCardDetails.expiryDate
           };

          console.log(requestBody);
        try {
          const response = await fetch("http://localhost:8080/product/createOrder",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(requestBody)
          });
           if(response.ok) {
             const message = await response.text();
             alert("送出訂單成功");
             console.log("Server message:",message);
           } else {
             const message = await response.text();
             alert("送出訂單失敗");
             console.log("Server message:",message);
           }
        } catch(error) {
          console.log("Failed to send request:",error.message);
        }
       },

      async getUserProductOrder() {
        const phone = this.verifyPhone;
        const verifyCode = this.verifyCode;
        if(!phone || !verifyCode){
          alert("請填妥查詢資訊");
          return;
        }
        try{
          const response = await fetch( `http://localhost:8080/product/getOrder/${phone}` ,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:verifyCode
          });
          if(response.ok) {
            this.userProduct =await response.json();
            console.log(this.userProduct);
            const modal = new bootstrap.Modal(document.getElementById('myProductModal'));
            modal.show();
          }  else {
            const modal = new bootstrap.Modal(document.getElementById('failureModal'));
            modal.show();
            const message = await response.text();
            console.log(message);
          }
        } catch(error) {
          console.log("發送查詢商品請求失敗");
        }
      }
    },
}
</script>

<style scoped>
.product-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
}
.searchOrder{
background: #B4D132;
  color: #ffffff;
  padding: 12px 35px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
.shopping-cart {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #c8d9f6;
    padding: 13px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 1000;
    transition: transform 0.2s;
}

.cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff6b6b;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.product-grid {
    display: grid;
    gap: 20px;
    padding: 20px;
    cursor: pointer;
}

/* 桌面版 - 寬度大於1023px時三列顯示 */
@media (min-width: 1024px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* 平板版 - 介於769px到1023px之間時兩列顯示 */
@media (min-width: 769px) and (max-width: 1023px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* 手機版 - 寬度小於等於768px時單列顯示 */
@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: 1fr;
    }

    .product-card {
        margin: 10px;
    }

    .shopping-cart {
        bottom: 20px;
        right: 20px;
        padding: 12px;
    }
}

.product-card {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.product-info {
    padding: 15px;
}

.product-title {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
    height: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.product-price {
    margin: 0;
    font-size: 18px;
    color: #ff6b6b;
    font-weight: bold;
}

.cart-item-image {
    height: 150px;
    object-fit: contain;
    padding: 1rem;
}

.cart-item .card-body {
    padding: 1rem;
}

.cart-item .input-group {
    width: 120px;
}

.cart-item .input-group input[type="number"] {
    text-align: center;
}

.cart-item .input-group input[type="number"]::-webkit-inner-spin-button,
.cart-item .input-group input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.cart-total {
    background-color: #f8f9fa;
}
</style>