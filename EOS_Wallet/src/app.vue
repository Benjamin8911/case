<template>
    <transition :name="transitionName">
        <router-view class="Router"></router-view>
    </transition>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                transitionName: 'slide-right'
            }
        },
        watch: {
            '$route' (to, from) {
                let isBack = this.$router.isBack
                if (isBack) {
                    this.transitionName = 'slide-right'
                } else {
                    this.transitionName = 'slide-left'
                }
                this.$router.isBack = false
            }
        }
    }
</script>

<style>
    .Router{
        /*position: absolute;*/
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
        /* top: 40px; */
    }
    .slide-left-enter, .slide-right-leave-active{
        /* opacity: 0; */
        -webkit-transform: translate3d(70%, 0, 0);
        transform: translate3d(70%, 0, 0);
    }
    .slide-left-leave-active, .slide-right-enter{
        /* opacity: 0; */
        -webkit-transform: translate3d(-70%, 0, 0);
        transform: translate3d(-70%, 0, 0);
    }
</style>
