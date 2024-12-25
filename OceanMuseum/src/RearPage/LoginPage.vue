<script  >
export default {
data(){
  return {
    loginInfo:{
      name:null,
     password:null
    }
  }
},
  methods:{
  async login(){
    const requestBody =  JSON.stringify(this.loginInfo);

    try{
      const response = await fetch("http://localhost:8080/admin/login",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:requestBody
      })
      if(response.ok){
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

    </div>
    <div class="input-group d-flex flex-column align-items-center">
      <input class="admin-name rounded-pill" v-model="loginInfo.name">
      <input class="admin-password rounded-pill" v-model="loginInfo.password">

    </div>
    <div class="login-btn-div mt-5">
      <button class="btn  login-btn text-white" @click="login">登錄</button>
    </div>

  </div>
</template>

<style scoped>
.loginBg{
  position: absolute;
  background: rgb(34,60,99);
}
.title{
  margin-top: 100px;
}
.admin-name{
  margin-top: 60px;
  font-size: 30px;
}

.admin-password{
  margin-top: 60px;
  font-size: 30px;
}

.login-btn{
background: orangered;

}

</style>