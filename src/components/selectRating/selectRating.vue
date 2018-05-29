<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':mySelectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':mySelectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':mySelectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':myOnlyContent===true}">
      <span class="icon-keyboard_arrow_right"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
import { eventHub } from '../../commom/js/eventHub.js';
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  data() {
    return {
      // myRatings: this.ratings,
      mySelectType: this.selectType,
      myOnlyContent: this.onlyContent
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      // console.log(this.ratings);
      this.mySelectType = type;
      eventHub.$emit('select-Type', this.mySelectType);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.myOnlyContent = !this.myOnlyContent;
      eventHub.$emit('content-Toggle', this.myOnlyContent);
    }
  }
  // ,
  // created() {
  //   console.log(this.ratings);
  // },
  // beforeMount() {
  //   console.log('beforeMount');
  //   console.log(this.ratings);
  // },
  // mounted() {
  //   console.log('mounted');
  //   console.log(this.ratings);
  // },
  // beforeUpdate() {
  //   console.log('beforeUpdate');
  //   console.log(this.ratings);
  // },
  // updated() {
  //   console.log('updated');
  //   console.log(this.ratings);
  // },
  // beforeDestroy() {
  //   console.log('beforeDestroy');
  //   console.log(this.ratings);
  // },
  // destroyed() {
  //   console.log('destroyed');
  //   console.log(this.ratings);
  // }
}
</script>

<style lang="less">
.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: rgba(7, 17, 27, 0.1);
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      &.active {
        color: #fff;
      }
      .count {
        margin-left: 2px;
        line-height: 16px;
      }

      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.negative {
        background-color: rgba(77, 85, 93, 0.2);
        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
    &.on {
      .icon-keyboard_arrow_right {
        color: #00c850;
      }
    }
    .icon-keyboard_arrow_right {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
    }
    .text {
      font-size: 12px;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
