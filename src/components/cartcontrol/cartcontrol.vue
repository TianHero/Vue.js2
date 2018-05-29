<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- 阻止按钮的点击事件向上传播，防止向上触发父组件的点击事件，否则会出现添加商品，然后进入内容页 -->
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-shopping_cart"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-thumb_down" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: ['food'],
  created() {
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        // this.food.count = 1;
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart() {
      if (this.food.count>0) {
        this.food.count--;
      }else{
        return;
      }
    }
  }
}
</script>

<style lang="less">
.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: all 0.4s linear;
    &.move-enter-active,
    &.move-leave-active {
      // opacity: 1;
      transform: translate3d(0, 0, 0);
      .inner {
        transform: rotate(0);
      }
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180);
      }
    }
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
      transform: rotate(0);
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
