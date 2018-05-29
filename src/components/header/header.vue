<template>
    <div class="header">
        <div class="content-wapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-thumb_up"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-thumb_up"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade" mode="out-in">
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                            <span class="icon" :class="classMap[index]"></span>
                            <span class="text">{{item.description}}</span>

                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-remove_circle_outline"></i>
            </div>

        </div>
        </transition>


    </div>
</template>

<script>
import star from '../star/star.vue'
export default {
    props: ['seller'],
    data() {
        return {
            detailShow: false
        }
    },
    methods: {
        showDetail: function () {
            this.detailShow = true;
        },
        hideDetail: function () {
            this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
        star
    }
};
</script>

<style lang="less">
@import "../../commom/less/mixin.less";
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  .content-wapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      font-size: 14px;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          // .bg-image('brand');
          background-image: url("brand@2x.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        font-size: 0;
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            background-image: url("decrease_1@2x.png");
          }
          &.discount {
            background-image: url("discount_1@2x.png");
          }
          &.guarantee {
            background-image: url("guarantee_1@2x.png");
          }
          &.invoice {
            background-image: url("invoice_1@2x.png");
          }
          &.special {
            background-image: url("special_1@2x.png");
          }
        }
        .text {
          display: inline-block;
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      font-size: 0;
      .count {
        font-size: 10px;
        vertical-align: top;
      }
      .icon-thumb_up {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, 0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      background-image: url("bulletin@2x.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      font-size: 10px;
      vertical-align: top;
      font-weight: 200;
      margin: 0 4px;
    }
    .icon-thumb_up {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    transition: all 0.5s;
    -webkit-backdrop-filter: blur(10);
    &.fade-enter-active {
        opacity: 1;
        background-color: rgba(7, 17, 27, 0.8);
    }
    &.fade-enter,
    &.fade-leave-active {
        opacity: 0;
        background-color: rgba(7, 17, 27, 0);
    }
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              font-size: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              &.decrease {
                background-image: url("decrease_2@2x.png");
              }
              &.discount {
                background-image: url("discount_2@2x.png");
              }
              &.guarantee {
                background-image: url("guarantee_2@2x.png");
              }
              &.invoice {
                background-image: url("invoice_2@2x.png");
              }
              &.special {
                background-image: url("special_1@2x.png");
              }
            }
            .text {
                line-height: 16px;
                font-size: 12px;
            }
          }
        }
        .bulletin {
            width: 80%;
            margin: 0 auto;
            .content {
                padding: 0 12px;
                line-height: 24px;
                font-size: 12px;
            }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
      text-align: center;
    }
  }
}
</style>
