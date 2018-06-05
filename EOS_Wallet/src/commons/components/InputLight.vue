<template>
    <div :style="borderStyle">
        <input class="input-item" :style="inputStyle" :value="value" :placeholder="placeholder" :type="currentType" ref="input" @input="handleInput" @blur="handleBlur" @focus="handleFocus" :maxlength="maxlength" tabindex="-1">
        <span class="icon-show" v-if="showPsd" :style="iconShowStyle" v-tap="{methods: handleShow}"></span>
        <span class="icon-clear" v-show="clear && focusFlag && value" v-tap="{methods: handleClickIcon}"></span>        
        <span class="validate" v-if="verificationCode" v-text="verificationMsg" :style="verificationStyle" v-tap="{methods: handleVCode}"></span>
    </div>
</template>

<script>
    const psdOpen = require('../../../static/images/passwordOpen.png')
    const psdHide = require('../../../static/images/passwordHide.png')

    export default {
        name: 'inputLight',
        data () {
            return {
                currentType: this.type,
                iconShow: psdHide,
                focusFlag: false,
                verificationMsg: this.verificationCode,
                secondCount: 60
            }
        },
        props: {
            type: {
                type: String,
                default () {
                    return 'text'
                }
            },
            placeholder: String,
            value: [String, Number],
            clear: Boolean,
            verificationCode: String,
            verifyDisabled: Boolean,
            maxlength: Number,
            color: String
        },
        computed: {
            showPsd () {
                return this.type === 'password'  
            },
            iconShowStyle () {
                return {
                    backgroundImage: `url(${this.iconShow})`
                }
            },
            borderStyle () {
                if (this.focusFlag) {
                    return {
                        borderBottom: '1px solid rgba(41,220,84,.3)'
                    }
                }
                return {
                    borderBottom: '1px solid #F0F0F0'
                }
            },
            inputStyle () {
                if (this.verificationCode) {
                    return {
                        width: '5.08rem',
                        marginLeft: '0.4045rem'
                    }
                }
                if (this.color) {
                    return {
                        color: this.color
                    }
                }
            },
            verificationStyle () {
                if (!this.verifyDisabled) {
                    return {
                        color: '#29DC54'
                    }
                }
                return {
                    color: '#aaaaaa'
                }
            }
        },
        methods: {
            handleInput (ev) {
                this.$emit('input', this.$refs.input.value)
            },
            handleClickIcon () {
                // this.value = ''
                this.$refs.input.value = ''
                this.$emit('input', '')
            },
            handleShow () {
                if (this.currentType === 'password') {
                    this.currentType = 'text'
                    this.iconShow = psdOpen
                } else {
                    this.currentType = 'password'
                    this.iconShow = psdHide
                }
            },
            handleVCode () {
                if (!this.verifyDisabled) {
                    this.$emit('get-VCode', this)
                }
            },
            handleBlur () {
                this.focusFlag = false
                this.$emit('blur')
            },
            handleFocus () {
                this.focusFlag = true
                this.$emit('focus')                
            },
            setinterval() {
                this.verificationMsg = `${this.secondCount --}秒后重试`
                this.interval = setInterval(() => {
                    this.verificationMsg = `${this.secondCount --}秒后重试`
                    if (this.secondCount === -1) {
                        clearInterval(this.interval)
                        this.interval = 'null'
                        this.secondCount = 60
                        this.verificationMsg = this.verificationCode
                    }
                }, 1000)
            }
        }
    }
</script>

<style scoped>
    div{
        width: 8.09rem;
        height: 1.22rem;
        margin: 0.2rem auto 0 auto;
    }
    .input-item{
        width: 70%;
        height: 100%;
        line-height: 1.22rem;
        margin-left: 5%;
        float: left;
        border: none;
        outline: none;
        background-color: transparent;
        color: #555555;
        font-size: 0.42rem;
        font-family: PingFangSC-Light;
    }
    .icon-clear{
        width: 12.5%;
        height: 100%;
        background-size: 0.48rem 0.48rem;
        background-image: url(../../../static/images/clear.png);
    }
    .icon-show{
        width: 12.5%;
        height: 100%;
        background-size: 0.6rem 0.3rem;
    }
    .icon-clear, .icon-show{
        float: right;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .validate{
        float: right;
        width: 2.2rem;
        height: 100%;
        line-height: 1.22rem;
        color: #42BDFE;
        font-size: 0.4rem;
        font-family: PingFangSC-Light;
        white-space: nowrap;
    }
    ::-webkit-input-placeholder{
        color: #aaaaaa;
        font-size: 0.42rem;
        font-family: PingFangSC-Light;
    }
</style>