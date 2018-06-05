<template>
    <button v-text="title" :style="styleObj"></button>
</template>

<script>
    export default {
        name: 'buttomItem',
        data () {
            return {}
        },
        props: {
            // 内容
            title: String,
            // 前景色
            color: {
                type: String,
                default: '#ffffff'
            },
            // 背景色
            bg: {
                type: String,
                default: '#29DC54'
            },
            // 阴影
            shadow: {
                type: String,
                default: 'none'
            },
            // 宽度
            width: {
                type: String,
                default: '7.63rem'
            },
            // 高度
            height: {
                type: String,
                default: '1.49rem'
            },
            // 字号
            fontSize: {
                type: String,
                default: '0.48rem'
            },
            // 不可用状态
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            styleObj () {
                return {
                    color: this.color,
                    backgroundColor: this.bg,
                    boxShadow: this.shadow,
                    width: this.width,
                    height: this.height,
                    fontSize: this.fontSize,
                    opacity: this.disabled ? '0.5' : 1
                }
            }
        }
    }
</script>

<style scoped>
    button{
        outline: none;
        border: none;
        border-radius: 0.75rem;
        font-family: PingFangSC-Light;
    }
    button:active{
        opacity: 0.5!important;
    }
</style>
