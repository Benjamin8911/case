<template>
    <div class="page">
        <header-item :title="$t('m.createContact')" back-icon="light"></header-item>
        <hr />
        <input-dark v-model="username" :placeholder="$t('m.contactName')"></input-dark>
        <input-dark v-model="address" :placeholder="$t('m.contactAddress')" :icon="require('../../../../static/images/scan.png')" @icon-click="scanCode"></input-dark>
        <input-dark v-model="remark" :placeholder="$t('m.remark')"></input-dark>
        <button-item class="btn" :title="$t('m.confirmCreate')" color="#FFF" bg="#29DC54" :disabled="btnDisabled" v-tap="{methods: addContact}"></button-item>
    </div>
</template>

<script>
    import InputDark from '../../../commons/components/InputDark.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import { plusReady } from '../../../lib/js/plusReady'
    import { addList } from '../../../lib/js/storage'
    import { MessageBox } from 'mint-ui'
    export default {
        name: '',
        components: {
            InputDark,
            HeaderItem,
            ButtonItem
        },
        data () {
            return {
                username: '',
                address: '',
                remark: ''
            }
        },
        mounted () {
            if (this.$store.state.QRText) {
                let QRContent = JSON.parse(this.$store.state.QRText)
                this.address = QRContent.account
                if (this.address) {
                    this.$store.commit('clearQR')
                }
            }
        },
        activated () {
            if (this.$store.state.QRText) {
                let QRContent = JSON.parse(this.$store.state.QRText)
                this.address = QRContent.account
                if (this.address) {
                    this.$store.commit('clearQR')
                }
            }
        },
        computed: {
            btnDisabled () {
                return !this.username || !this.address
            }
        },
        methods: {
            scanCode () {
                this.$router.push({ path: '/TDCode'})
            },
            addContact () {
                if (!this.username) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.fillIn') + this.$t('m.contactName'))
                    return
                }
                if (!this.address) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.fillIn') + this.$t('m.contactAddress'))
                    return
                }
                let contact = {
                    id: 0,
                    username: this.username,
                    address: this.address,
                    remark: this.remark,
                    icon: ""
                }
                contact.id = new Date().getTime()
                contact.icon = "icon" + Math.floor(Math.random()*7+1)
                addList(this.$store.state.storageContacts, contact)
                // addContacts(contact)
                this.$router.goBack()
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
    }
    .btn{
        position: absolute;
        left: 50%;
        bottom: 1.53rem;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
</style>