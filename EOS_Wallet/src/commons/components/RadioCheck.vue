<template>
    <div class="Radio">
        <span class="icon" v-tap="{methods: upgradeValue}" :style="styleObj"></span>
        <div class="message">
            {{ message }}
            <span class="agreement" v-text="agreement" v-tap="{methods: checkAgreement}"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'radioCheck',
        data () {
            return {
                currentValue: this.value,
                checkIcon: require('../../../static/images/confirm-1.png')
            }
        },
        model: {
            event: 'change'
        },
        props: {
            value: Boolean,
            message: {
                type: String,
                default: '我已经仔细阅读并同意'
            },
            agreement: {
                type: String,
                default: '服务及隐私条款'
            }
        },
        computed: {
            styleObj () {
                if (this.currentValue) {
                    return {
                        borderColor: 'transparent',
                        backgroundImage: `url(${this.checkIcon})`
                    }
                }
            }
        },
        methods: {
            upgradeValue () {
                this.currentValue = !this.currentValue
                this.$emit('change', this.currentValue)
            },
            checkAgreement () {
                this.$emit('check-agreement')
            }
        }
    }
</script>

<style scoped>
    .Radio{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .icon{
        width: 0.52rem;
        height: 0.52rem;
        border-radius: 50%;
        border-style: solid;
        border-width: 1px;
        border-color: #aaaaaa;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .message{
        font-size: 0.36rem;
        color: #aaaaaa;
        margin-left: 0.23rem;
    }
    .agreement{
        color: #29DC54;
    }
</style>
