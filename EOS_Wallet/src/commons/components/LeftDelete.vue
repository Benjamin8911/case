<template>
    <transition name="fade">
        <div class="delete">
            <div class="slider">
                <div class="content"
                        @touchstart.prevent="touchStart"
                        @touchmove.prevent="touchMove"
                        @touchend.prevent="touchEnd"
                        v-tap.open="{methods: closeSlider}"
                        :style="deleteSlider">
                    <slot></slot>        
                </div>
                <div class="remove" ref="remove" v-tap="{methods: remove}" v-text="$t('m.delete')"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'leftDelete',
        data () {
            return {
                startX: 0, // 触摸位置
                startY: 0,
                endX: 0, // 结束位置
                moveX: 0, // 滑动时距离
                disX: 0, // 移动距离,
                flag: false, // 能否通过点击滑块关闭删除按钮
                deleteSlider: '', // 滑动时的效果
            }
        },
        props: {
            //禁止滑动
            isDisabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            touchStart (ev) {
                ev = ev || event
                // touches类数组（包含当前正在Touch的全部对象）, 长度为1时表示只有一只手指在触摸屏幕
                if (ev.touches.length === 1) {
                    this.startX = ev.touches[0].clientX
                    this.startY = ev.touches[0].clientY
                }
            },
            touchMove (ev) {
                if (this.isDisabled) return
                ev = ev || event
                let wd = this.$refs.remove.offsetWidth
                // 向左侧滑动打开删除按钮
                if (ev.touches.length === 1 && this.flag === false) {
                    this.$emit('start-slider')
                    this.moveX = ev.touches[0].clientX
                    this.disX = this.startX - this.moveX
                    let disY = this.startY - ev.touches[0].clientY
                    // y方向滑动大于x方向滑动时
                    if (Math.abs(disY) > Math.abs(this.disX)) return
                    // 像右侧滑动时不改变滑块位置
                    if (this.disX <= 0) {
                        this.deleteSlider = 'transform:translateX(0px)'
                    } else {
                        // 滑动距离采用touch偏移 * 2
                        this.deleteSlider = `transform:translateX(-${this.disX * 2}px)`
                        // 限制disX
                        if (this.disX * 2 >= wd) {
                            this.deleteSlider = `transform:translateX(-${wd}px)`
                        }
                    }
                }
            },
            touchEnd (ev) {
                if (this.isDisabled) return
                ev = ev || event
                let wd = this.$refs.remove.offsetWidth
                // changedTouches类数组（包含上一次touch后到此事件中状态发生改变的Touch对象），
                if (ev.changedTouches.length === 1) {
                    let endX = ev.changedTouches[0].clientX
                    this.disX = this.startX - endX
                    let disY = this.startY - ev.changedTouches[0].clientY
                    // y方向滑动大于x方向滑动时
                    if (Math.abs(disY) > Math.abs(this.disX)) return
                    // 结束距离小于删除按钮一半时，回到起点
                    if (this.disX * 2 < wd / 2) {
                        this.deleteSlider = 'transform:translateX(0px)'
                        this.flag = false
                    } else {
                        this.deleteSlider = `transform:translateX(-${wd}px)`
                        this.flag = true
                    }
                }
            },
            closeSlider () {
                if (this.flag === true) {
                    this.deleteSlider = 'transform:translateX(0px)'
                    this.flag = false
                }
                if (this.isDisabled) {
                    this.$emit('click-handler')
                }
            },
            remove () {
                this.$emit('remove-handler')
            }
        }
    }
</script>

<style scoped lang="less">
    .delete{
        margin-top: 0.15rem;
    }
    .slider{
        width: 100%;
        height: 1.96rem;
        position: relative;
        user-select: none;
        .content{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: #F4F7F9;
            z-index: 1;
            transition: 0.3s;
        }
        .remove{
            position: absolute;
            width: 3rem;
            height: 1.95rem;
            background-color: #F43E3A;
            right: 0;
            top: 0;
            color: #ffffff;
            text-align: center;
            font-size: 0.48rem;
            line-height: 1.96rem;
        }
    }
    .fade-enter-active, .fade-leave-active {
        height: 1.96rem;
        transition: opacity 0.3s, height 0.3s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
        height: 0;
    }
</style>