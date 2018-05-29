<template>
  <div id="app">
    <v-header :seller = "seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to = "/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to = "/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to = "/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from '@/components/header/header.vue'
  const ERR_OK = 0

  export default {
    components: {
      'v-header': header
    },
    data() {
      'use strict'
      return {
        seller: {}
      }
    },
    beforeCreate() {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    }

  };
</script>

<style lang="less">
  @import '../static/css/reset.css';
  @import '../src/commom/less/base.less';
  @import '../src/commom/less/icon.css';
  .tab {
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    border-bottom: 1px solid rgba(7, 17, 21, 0.1);
    .tab-item {
      flex:1;
      text-align:center;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active {
          color: rgb(240, 50, 20)
        }
      }
    }
  }

</style>
