<template>
    <transition name="fade">
        <div v-if="flag">
            <ul class="wizard" :style="wizardStyle" @touchstart.prevent="touchStart" @touchend.prevent="touchEnd" ref="wizard">
                <li></li>
                <li></li>
                <li style="position: relative">
                    <button class="btn" v-tap.stop="{methods: enterApp}">{{$t('m.enter')}}</button>
                </li>
            </ul>
            <div class="circle-navbar">
                <span class="circle-nav" :class="{active: this.index === 0}"></span>
                <span class="circle-nav" :class="{active: this.index === 1}"></span>
                <span class="circle-nav" :class="{active: this.index === 2}"></span>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'wizardSheet',
        data () {
            return {
                flag: false,
                index: 0,
                startX: 0,
                moveX: 0,
                endX: 0
            }
        },
        beforeMount () {
            let isOnceMoreEnter = window.localStorage.getItem('isOnceMoreEnter')
            if (isOnceMoreEnter) {
                this.flag = false
            } else {
                this.flag = true
                window.localStorage.setItem('isOnceMoreEnter', true)
            }
        },
        computed: {
            wizardStyle () {
                return {
                    transform: `translateX(-${this.index * 10.8}rem)`
                }
            }
        },
        methods: {
            touchStart (ev) {
                ev = ev || event
                if (ev.touches.length === 1) {
                    this.startX = ev.touches[0].clientX
                }
            },
            touchEnd (ev) {
                ev = ev || event
                let wd = this.$refs.wizard.offsetWidth / 3
                if (ev.changedTouches.length === 1) {
                    this.endX = ev.changedTouches[0].clientX
                    let disX = this.endX - this.startX
                    // 滑动距离大于1/5屏幕宽度时响应切换
                    if (Math.abs(disX) > wd / 5) {
                        if (disX < 0 && this.index < 2) {
                            // left slide
                            this.index += 1
                        } else if (disX > 0 && this.index > 0) {
                            // right slide
                            this.index -= 1
                        }
                    }
                }
            },
            enterApp () {
                this.flag = false;
            }
        }
    }
</script>

<style scoped>
    .wizard{ 
        overflow: hidden;
        z-index: 1000;
        width: 300vw;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        transition: all 0.3s;
    }
    .wizard>li{
        float: left;
        width: 100vw;
        height: 100%;
        background-size: cover;
        background-position: center center; 
        background-repeat: no-repeat;
    }
    .wizard>li:nth-of-type(1){
        background-image: url('../../../static/images/boot-page1.gif')
    }
    .wizard>li:nth-of-type(2){
        background-image: url('../../../static/images/boot-page2.gif')
    }
    .wizard>li:nth-of-type(3){
        background-image: url('../../../static/images/boot-page3.gif')
    }
    .circle-navbar{
        z-index: 1001;
        position: absolute;
        width: 100vw;
        bottom: 20px;
        height: 20px;
        display: flex;
        display: -webkit-flex;
        flex-grow: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }
    .circle-nav{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #ccc;
        margin: 0 10px;
    }
    .circle-nav.active{
        background-color: #ccc;
    }
    .btn{
        outline: none;
        border: none;
        border-radius: 0.75rem;
        font-family: PingFangSC-Light;
        color: #ffffff;
        background-color: #42BDFE;
        width: 7.63rem;
        height: 1.49rem;
        font-size: 0.48rem;
        position: absolute;
        left: 50%;
        bottom: 50px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .fade-leave-active {
        transition: opacity 0.2s;
    }
    .fade-leave-to{
        opacity: 0;
    }
</style>