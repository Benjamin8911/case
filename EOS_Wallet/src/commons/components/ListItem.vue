<template>
    <div class="list" :style="{'background': bg}">
        <span v-if="icon" class="item-icon" :style="{'backgroundImage': `url(${icon})`}"></span>
        <span class="item-title" :style="titleStyle" v-text="title"></span>
        <span v-show="!isEdit" v-if="rightContent" class="item-right-content" :style="rightContentStyle" v-text="rightContent" v-tap="{ methods: editRightContent }"></span>
        <input v-if="edit" v-show="isEdit" class="edit-right-content" type="text" ref="input" v-model="rightContentText" @focus="beforeEditRightContent" @blur="editedRightContent">
        <span v-if="showArrow" class="right-arrow"></span>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    export default {
        name: 'ListItem',
        data () {
            return {
                isEdit: false,
                rightContentText: ''
            }
        },
        props: {
            icon: String,
            title: String,
            titleStyle: {
                type: Object,
                default () {
                    return {
                        color: '#374452'
                    }
                }
            },
            rightContent: String,
            rightContentStyle: {
                type: Object,
                default () {
                    return {
                        color: '#ffffff'
                    }
                }
            },
            bg: String,
            showArrow: {
                type: Boolean,
                default () {
                    return false
                }
            },
            edit: Boolean
        },
        methods: {
            editRightContent () {
                if (this.edit) {
                    this.isEdit = true
                    this.rightContentText = this.rightContent
                    setTimeout(() => {
                        this.$refs.input.focus()
                    }, 10);
                }
            },
            beforeEditRightContent () {
                this.$refs.input.select()
            },
            editedRightContent () {
                if (this.rightContentText) {
                    this.isEdit = false
                    this.$emit('input', this.rightContentText)
                } else {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.walletEmpty'))
                    setTimeout(() => {
                        this.rightContentText = this.rightContent
                        this.$refs.input.focus()
                        this.$refs.input.select()
                    }, 10);
                }
                
            }
        }
    }
</script>

<style scoped>
    .list{
        height: 1.5rem;
        padding-left: 0.42rem;
        padding-right: 0.5rem;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .item-icon{
        width: 0.56rem;
        height: 0.56rem;
        margin-right: 0.34rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .item-title{
        flex-grow: 1;
        font-size: 0.42rem;
        font-family: PingFangSC-Light;
    }
    .item-right-content{
        font-size: 0.36rem;
        font-family: PingFangSC-Light;
    }
    .right-arrow{
        width: 0.17rem;
        height: 0.3rem;
        margin-left: 0.2rem;
        background: url(../../../static/images/right-arrow.png) no-repeat 100% 100%;
        background-position: center;
        background-size: contain;
    }
    .edit-right-content {
        font-size: 0.36rem;
        border: 0;
        color: rgb(121, 121, 133);
        text-align: right;
        background-color: transparent;
    }
</style>
