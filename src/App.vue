<template>
  <div id="app">
    <router-view />
    <div class="back-home" @click="goList"></div>

  </div>
</template>
<script>
export default {
  created() {
    this.$ajax
      .get('/api/movie/in_theaters', { city: '北京', start: 1, count: 25 })
      .then(res => {
        console.log(res)
      })
  },
  methods: {
    //查看列表
    goList() {
      this.$router.push({
        path: 'OrderList'
      })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.back-home {
  position: fixed;
  bottom: 4%;
  right: 0%;
  width: 85px;
  height: 85px;
  background: url('./assets/go_list.png') no-repeat;
}
</style>
