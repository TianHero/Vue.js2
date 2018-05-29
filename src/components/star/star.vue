<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props: ['size','score'],
    computed: {
        starType(){
            return 'star-' + this.size;
        },
        itemClasses() {
            let result = [];
            //4=< x <4.5 是 4 ; 4.5<= x < 5.0 是4.5 ;
            let score = Math.floor(this.score * 2) / 2;
            //判断是否有小数
            let hasDot = score % 1 !== 0;
            //计算整数
            let integer = Math.floor(score);
            //把整数设置成on，放进数组
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            //小数只有一个，设置成半颗星，half,放进数组
            if (hasDot) {
                result.push(CLS_HALF);
            }
            //如果on + half个数不到五个,后面放off空星星
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }

    }
}
</script>

<style lang="less">
    .star{
        font-size: 0;
        .star-item {
            display: inline-block;
            background-repeat: no-repeat;
        }
        &.star-48 {
            .star-item {
                width: 20px;
                height: 20px;
                margin-right: 22px;
                background-size: 100% 100%;
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    background-image: url('star48_on@2x.png');
                }
                &.half {
                    background-image: url('star48_half@2x.png');                    
                }
                &.off {
                    background-image: url('star48_off@2x.png');                    
                }                
            }
        }
        &.star-36 {
            .star-item {
                width: 15px;
                height: 15px;
                margin-right: 16px;
                background-size: 100% 100%;
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    background-image: url('star36_on@2x.png');
                }
                &.half {
                    background-image: url('star36_half@2x.png');                    
                }
                &.off {
                    background-image: url('star36_off@2x.png');                    
                }                
            }
        }
        &.star-24 {
            .star-item {
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 100% 100%;
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    background-image: url('star24_on@2x.png');
                }
                &.half {
                    background-image: url('star24_half@2x.png');                    
                }
                &.off {
                    background-image: url('star24_off@2x.png');                    
                }                
            }
        }

    }
        
</style>
