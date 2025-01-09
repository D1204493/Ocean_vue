<script >
export default {
  name: 'NavBar',

  props: {
    title: {
      type: String,
      default: '票務管理中心'
    },
    menuItems: {
      type: Array,
      default: () => [
        { icon: 'fas fa-user-circle', text: '個人資料', link: '#' },
        { icon: 'fas fa-cog', text: '設定', link: '#' },
        { icon: 'fas fa-sign-out-alt', text: '登出', link: '#', divider: true }
      ]
    }
  },

  data() {
    return {
      searchQuery: ''
    }
  },

  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<template>
<!--  <nav class="navbar navbar-expand-lg navbar-light">-->
<!--    <div class="container-fluid px-4">-->
<!--      <a class="navbar-brand fw-bold text-primary" href="#">-->
<!--        <h1 class="navbar-title-group  ">-->
<!--          <font-awesome-icon icon="ticket-alt" style="font-size: 55px" />-->
<!--          <span class="fw-bold ms-3">{{ title }}</span>-->
<!--        </h1>-->
<!--      </a>-->
<!--      <div class="d-flex align-items-center">-->
<!--        <div class="search-box me-3">-->
<!--          <i class="fas fa-search text-muted me-2"></i>-->
<!--          <input-->
<!--              type="text"-->
<!--              class="border-0 outline-none"-->
<!--              placeholder="搜尋..."-->
<!--              v-model="searchQuery"-->
<!--              @input="handleSearch"-->
<!--          >-->
<!--        </div>-->
<!--        <div class="dropdown">-->
<!--          <button class="btn btn-light rounded-circle p-2" data-bs-toggle="dropdown">-->
<!--            <i class="fas fa-user"></i>-->
<!--          </button>-->
<!--          <ul class="dropdown-menu dropdown-menu-end">-->
<!--            <li v-for="item in menuItems" :key="item.text">-->
<!--              <a class="dropdown-item" :href="item.link">-->
<!--                <i :class="item.icon + ' me-2'"></i>{{ item.text }}-->
<!--              </a>-->
<!--              <hr class="dropdown-divider" v-if="item.divider">-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </nav>-->
</template>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  height: 60px;
}
.navbar-title-group{
  color: #2c3e50;
}

.search-box {
  background: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.search-box input {
  outline: none;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}
</style>