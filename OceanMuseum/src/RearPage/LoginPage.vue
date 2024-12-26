<script>
export default {
  data() {
    return {
      loginInfo: {
        name: null,
        password: null
      }
    }
  },
  methods: {
    async login() {
      const requestBody = JSON.stringify(this.loginInfo);

      try {
        const response = await fetch("http://localhost:8080/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody
        })
        if (response.ok) {
          console.log("Login successfully");
          this.$router.push("/admin/ticket");
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        alert("請求登錄失敗, 請檢查網路連線");
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <div class="container-fluid h-100 loginBg d-flex flex-column align-items-center">
    <div class="title">
      <h1 class="text-white">海洋生物博物館管理系統</h1>
    </div>
    <div class="loginIcon">
      <img class="login-image" src="/LoginIcon.png" alt="LoginIcon">
    </div>
    <div class="input-group d-flex flex-column align-items-center">
      <input class="admin-name rounded-pill" v-model="loginInfo.name" placeholder="請輸入帳號">
      <input class="admin-password rounded-pill" v-model="loginInfo.password" placeholder="請輸入密碼">

    </div>
    <div class="login-btn-div mt-5">
      <button class="btn login-btn text-white" @click="login">登錄</button>
    </div>

  </div>
</template>

<style scoped>
.loginBg {
  position: absolute;
  background: rgb(34, 60, 99);
}

.title {
  margin-top: 100px;
}

.admin-name,
.admin-password {
  margin-top: 60px;
  font-size: 30px;
  padding: 5px 15px;
}

.admin-name::placeholder,
.admin-password::placeholder {
  font-size: 20px;  /* 將 placeholder 文字大小改小 */
}

.login-btn {
  background: #ffa500;
  width: 100px;  /* 增加按鈕寬度 */
  padding: 5px 0;  /* 適當的內邊距 */
  font-size: 16px;  /* 調整按鈕文字大小 */
}

.loginIcon {
  margin-top: 30px;
}

.login-image {
  width: 150px;
  height: 150px;
  /* 如果想要圖片保持正方形 */
}
</style>