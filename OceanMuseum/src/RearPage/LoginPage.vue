<script  >
export default {
data(){
  return {
    loginInfo:{
      userName:null,
      userPassword:null
    }
  }
},
  methods:{
  async login(){
    const requestBody = JSON.stringify(this.loginInfo);

    try{
      const response = await fetch("",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:requestBody
      })
      if(response.ok){
        console.log("Login successfully");
        this.$router.push("/");
      } else {
        const errorMessage = await response.text();
        console.log("Error:",errorMessage);
      }
    } catch (error) {
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
      <input class="admin-name rounded-pill" v-model="loginInfo.userName">
      <input class="admin-password rounded-pill" v-model="loginInfo.userPassword">
      <div class="form-check mt-5 ">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
        <label class="form-check-label text-white" for="flexCheckIndeterminate">
          保持登錄狀態
        </label>
      </div>
    </div>
    <div class="login-btn-div">
      <button class="btn  login-btn text-white">登錄</button>
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