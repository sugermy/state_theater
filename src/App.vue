<template>
  <div id="app">
    <router-view />
    <div :class="routerPath=='OrderList'?'go-list':'back-home'" @click="goList"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routerPath: 'OrderList'
    }
  },
  created() {},
  mounted() {
    document.body.addEventListener('focusout', () => {
      // 回到原点  若觉得一瞬间回到底部不够炫酷，那自己可以自定义缓慢回弹效果， 可用css 、贝塞尔曲线、js的 requestAnimationFrame  等等 方法 实现体验性更好的回弹效果
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    })
  },
  methods: {
    //查看列表
    goList() {
      this.$router.push({
        path: this.routerPath
      })
    }
  },
  watch: {
    //监听路由变化  如果当前是列表页  我的 悬浮返回首页  否则为默认列表页
    $route(v) {
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
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}
.go-list {
  position: fixed;
  bottom: 4%;
  right: 0%;
  width: 85px;
  height: 85px;
  background: url('./assets/go_list.png') no-repeat;
  background-size: 100% 100%;
}
.back-home {
  position: fixed;
  bottom: 4%;
  right: 0%;
  width: 85px;
  height: 85px;
  background: url('./assets/back_home.png') no-repeat;
  background-size: 100% 100%;
}
</style>
