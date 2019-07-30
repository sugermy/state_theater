<template>
  <div id="app">
    <router-view />
    <div class="back-home" @click="goList"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routerPath: 'OrderList'
    }
  },
  created () {
    this.$ajax.get('getwxuser', {}).then(res => {
      this.$store.dispatch('setUser', res.Data)
    })
  },
  methods: {
    //查看列表
    goList () {
      this.$router.push({
        path: this.routerPath
      })
    }
  },
  watch: {
    //监听路由变化  如果当前是列表页  我的 悬浮返回首页  否则为默认列表页
    $route (v) {
      if (v.name == 'OrderList') {
        this.routerPath = '/Home'
      } else {
        this.routerPath = 'OrderList'
      }
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
