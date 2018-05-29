<template>
<transition name="move">
  <div class="food" v-show="showFlag">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" width="100%">
        <div class="back" @click="hide">
          <i class="icon-add_circle"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">
              ￥{{food.price}}
          </span><span class="old" v-show="food.oldPrice">
              ￥{{food.oldPrice}}
          </span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count ===0">
          加入购物车
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h2 class="title">商品信息</h2>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h2 class="title">商品评价</h2>
        <ratingselect 
          :select-type="selectType"
          :only-content="onluContent"
          :desc="desc"
          :ratings="food.ratings"
          ></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-arrow_lift':rating.rateType===0,'icon-check_circle':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
          </div>
      </div>

    </div>
  </div>
</transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../selectRating/selectRating.vue'
import { eventHub } from '../../commom/js/eventHub.js';
import { formatDate } from '../../commom/js/date.js';

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: ['food'],
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onluContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      myFood: this.food
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onluContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll('.food', {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      // if (!event._constructed) {
      //   return;
      // }
      Vue.set(this.food, 'count', 1);
    },
    mySelectType(type) {
      this.selectType = type;
      // console.log(this.selectType);
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    myOnlyContent(onlyContent) {
      this.onlyContent = onlyContent;
      // console.log(this.onlyContent);
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  },
  created() {
    eventHub.$on('select-Type', this.mySelectType);
    eventHub.$on('content-Toggle', this.myOnlyContent);
  }
}
</script>

<style lang="less">
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #fff;
  transition: all 0.4s;
  &.move-enter-active,
  &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  // &.move-enter,
  // &.move-leave-to {
  //   transform: translate3d(0, 0, 0);
  // }

  .image-header {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-add_circle {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      height: 10px;
      .sell-count,
      .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      font-weight: 700;
      line-height: 24px;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
  }
  .info {
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
  .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color: #fff;
    background-color: rgb(0, 160, 220);
  }
  .rating {
    padding-top: 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        position: relative;
        padding: 16px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .user {
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 0;
          line-height: 12px;
          .name {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .avatar {
            border-radius: 50%;
          }
        }
        .time {
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          .icon-arrow_lift,
          .icon-check_circle {
            margin-right: 4px;
            line-height: 16px;
            font-size: 12px;
          }
          .icon-arrow_lift {
            color: rgb(0, 160, 220);
          }
          .icon-check_circle {
            color: rgb(147, 153, 159);
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
    }
  }
}
</style>

