<template>
    <div class="range" id="range">
        <input type="hidden" name="value" v-model="value">
        <div class="thumb" :style="{ 'left': thumbLeft + 'px' }" @touchstart="thumbTouchstart" @touchmove="thumbTouchmove" @touchend="thumbTouchend"></div>
        <div class="fill-lower" :style="{ 'width': thumbLeft + 'px' }"></div>
        <div class="fill-upper"></div>
    </div>
</template>

<script>
    export default {
        name: 'Range',
        data () {
            return {
                thumbLeft: 0,
                thumbLeftBack: 0,
                touchLocation: {
                    x: 0,
                    y: 0
                },
                rangeWidth: 0,
                throttle: true
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: Number,
            max: {
                type: Number,
                default:'100'
            },
            min: {
                type: Number,
                default:'0'
            },
            step: {
                type: Number,
                default:'1'
            }
        },
        computed: {
            
        },
        mounted () {
            this.rangeWidth = document.getElementById("range").clientWidth
            this.thumbLeftBack = this.thumbLeft = this.value / (this.max - this.min) * this.rangeWidth
        },
        methods: {
            thumbTouchstart (event) {
                this.touchLocation.x = event.touches[0].pageX
            },
            thumbTouchmove (event) {
                // 事件节流
                if (this.throttle) {
                    this.throttle = false
                    let pageX = event.touches[0].pageX
                    this.thumbMove (pageX)
                    setTimeout(() => {
                        this.throttle = true
                    }, 50)
                }
            },
            thumbTouchend (event) {
                this.thumbLeftBack = this.thumbLeft
            },
            thumbMove (pageX) {
                this.thumbLeft = pageX - this.touchLocation.x + this.thumbLeftBack
                if (this.thumbLeft < 0) {
                    this.thumbLeft = 0
                } else if (this.thumbLeft > this.rangeWidth) {
                    this.thumbLeft = this.rangeWidth
                }
                this.value = Math.floor((this.thumbLeft / this.rangeWidth) * (this.max - this.min))
                this.$emit('change', this.value)
                console.log("thumbMove")
            }
        }
    }
</script>

<style scoped>
    .range {
        position: relative;
        left: -.15rem;
        height: .3rem;
    }
    .thumb {
        position: absolute;
        width: .3rem;
        height: .3rem;
        border-radius: 100%;
        background-color: #4AB1E6;
        z-index: 5;
    }
    .fill-lower, .fill-upper {
        position: absolute;
        top: .09rem;
        left: .15rem;
        height: .12rem;
        border-radius: .6rem;
    }
    .fill-lower {
        background-color: #4AB1E6;
        z-index: 2
    }
    .fill-upper {
        width: 100%;
        background-color: #AAAAAA
    }
</style>
