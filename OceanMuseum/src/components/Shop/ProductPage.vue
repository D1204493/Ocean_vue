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
                        @click="proceedToCheckout">
                        付款
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        關閉
                    </button>
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
            selectedProduct: {},
            quantity: 1,
            cartItemCount: 0,
            cartItems: [],
            cartTotalAmount: 0,  // 新增購物車總金額
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
                image: this.selectedProduct.image
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

        proceedToCheckout() {
            // TODO: 實現結帳功能
            alert('進入結帳流程');
        },
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