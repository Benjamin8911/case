<template>
    <div class="page">
        <header-item :title="$t('m.contacts')" back-icon="light" :right-icon="rightIcon" color="#374452" @right-click="jump"></header-item>
        <ul class="swipe-wrapper">
            <!-- <div class="margin-for-top"></div> -->
            <left-delete v-for="(item, i) in contactsList" 
                         :key="item.username"
                         :isDisabled="isDisabledSwipe" 
                         @remove-handler="deleteContact(i)" 
                         @start-slider="closeOtherSlider(i)"
                         @click-handler="clickHandler(item.address)"
                         ref="leftDelete">
                <div class="slot-wrapper">
                    <img :src="item.icon">
                    <div>
                        <p class="username hidden-content" v-text="item.username"></p>
                        <p class="label hidden-content" v-text="item.address"></p>
                    </div>
                </div>
            </left-delete>
            <!-- <div class="margin-for-bottom"></div> -->
        </ul>
        <ul class="footer">
            <li><button v-tap="{ methods: backup }">{{$t('m.backUp')}}</button></li>
            <li><button v-tap="{ methods: regain }">{{$t('m.recovery')}}</button></li>
        </ul>
        <mt-popup v-model="popupDelContact" popup-transition="popup-fade" :closeOnClickModal="false" style="border-radius: .1rem;">
            <div class="delete-confirm">
                <p class="title">{{$t('m.deleteContact')}}</p>
                <p class="content">{{$t('m.isDeleteContact')}}</p>
                <div class="btn-groud">
                    <button class="btn-cancel" v-tap="{ methods: delContact, param: 'cancel' }">{{$t('m.cancel')}}</button>
                    <button class="btn-del" v-tap="{ methods: delContact, param: 'delete' }">{{$t('m.delete')}}</button>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import LeftDelete from '../../../commons/components/LeftDelete.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import { getList, updateList } from '../../../lib/js/storage'
    import { MessageBox } from 'mint-ui'
    import remote from '../../../lib/js/remote'

    export default {
        name: '',
        components: {
            LeftDelete,
            HeaderItem
        },
        data () {
            return {
                rightIcon: require('../../../../static/images/addFriend.png'),
                contactsIcons: {
                    icon1: require('../../../../static/images/icon/1.png'),
                    icon2: require('../../../../static/images/icon/2.png'),
                    icon3: require('../../../../static/images/icon/3.png'),
                    icon4: require('../../../../static/images/icon/4.png'),
                    icon5: require('../../../../static/images/icon/5.png'),
                    icon6: require('../../../../static/images/icon/6.png'),
                    icon7: require('../../../../static/images/icon/7.png')
                },
                contactsList: [],
                isDisabledSwipe: false,
                popupDelContact: false,
                deleteIndex: -1
            }
        },
        computed: {
            deleteStyleObj () {
                return {
                    color: '#ffffff',
                    backgroundColor: '#FF6D6E',
                    fontSize: '0.48rem'
                }
            }
        },
        mounted () {
            let contactsList = getList(this.$store.state.storageContacts)
            contactsList.forEach((item, index) => {
                item.icon = this.contactsIcons[item.icon]
            })
            this.contactsList = contactsList
        },
        beforeRouteEnter (to, from , next) {
            // 进来选择联系人
            // 设置不可滑动删除，并触发点击事件
            if (from.path === '/rollOut') {
                next(vm => {
                    vm.isDisabledSwipe = true
                })
            } else {
                next()
            }
        },
        methods: {
            deleteContact (index) {
                // MessageBox.close()
                this.popupDelContact = true
                this.deleteIndex = index
                
            },
            delContact (params) {
                if (params.param === 'delete') {
                    this.contactsList.splice(this.deleteIndex, 1)
                    let contactsList = getList(this.$store.state.storageContacts)
                    contactsList.splice(this.deleteIndex, 1)
                    updateList(this.$store.state.storageContacts, contactsList)
                }
                this.deleteIndex = -1
                this.popupDelContact = false
                this.closeOtherSlider(-1)
            },
            closeOtherSlider (index) {
                // 关闭其他已打开的slider
                let leftDelete = this.$refs.leftDelete
                for (let i in leftDelete) {
                    if (i !== index && leftDelete[i].flag) {
                        leftDelete[i].closeSlider()
                        break
                    }
                }
            },
            clickHandler (address) {
                this.$store.commit('setAddress', address)
                this.$router.goBack()
            },
            jump () {
                this.$router.push({
                    path: '/createContact'
                })
            },
            backup () {
                MessageBox.confirm('联系人备份仅保存30分钟，请尽快同步').then(action => {
                    let param = {
                        ticket: window.sessionStorage.getItem('token'),
                        json: JSON.stringify(getList(this.$store.state.storageContacts))
                    }
                    remote.save_contacts(param).then(response => {
                        console.log(response.data.data)
                        if (response.data.data === 200) {
                            MessageBox.close()
                            MessageBox(this.$t('m.tips'), '备份成功')
                        } else {
                            MessageBox.close()
                            MessageBox(this.$t('m.tips'), '备份失败')
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }).catch(error => {
                    console.log(error)
                })
            },
            regain () {
                let param = {
                    ticket: window.sessionStorage.getItem('token'),
                }
                remote.get_contacts(param).then(response => {
                    try {
                        let data = JSON.parse(response.data.data).concat(getList(this.$store.state.storageContacts))
                        let tem = {}
                        data.forEach((item, index) => {
                            tem[item.id] = index
                        })
                        let contactsList = []
                        for (let key in tem) {
                            contactsList.push(data[tem[key]])
                        }
                        updateList(this.$store.state.storageContacts, contactsList)
                        contactsList.forEach((item, index) => {
                            item.icon = this.contactsIcons[item.icon]
                        })
                        this.contactsList = contactsList
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), '恢复成功')
                    } catch (e) {
                        console.log(e)
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), '恢复失败')
                    }

                }).catch(error => {
                    console.log(error)
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), '恢复失败')
                })
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100%;
    }
    .margin-for-top{
        height: 1.44rem;
    }
    .margin-for-bottom {
        height: 1.19rem;
    }
    .swipe-wrapper{
        height: 12.72rem;
        height: -webkit-calc(100vh - 3.3rem);
        height: calc(100vh - 3.3rem);
        overflow: scroll;
    }
    .slot-wrapper{
        height: 1.96rem;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .slot-wrapper>img{
        width: 0.94rem;
        height: 0.94rem;
        border-radius: 50%;
        margin-left: 0.45rem;
        margin-right: 0.25rem;
    }
    .slot-wrapper>div{
        width: 8rem;
    }
    .slot-wrapper .username{
        color: #374452;
        font-size: 0.42rem;
    }
    .slot-wrapper .label{
        color: #797985;
        font-size: 0.3rem;
    }
    .hidden-content{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
    }
    .footer button {
        font-size: .42rem;
        display: block;
        width: 5.4rem;
        height: 1.19rem;
        border: none;
        line-height: 1.19rem;
        text-align: center;
        color: white;
        background-color: #29DC54;
        outline: none;
    }
    .delete-confirm {
        width: 9.08rem;
        height: 7rem;
    }
    .title {
        font-size: .48rem;
        padding-top: 1.91rem;
        text-align: center;
        color: #374452;
    }
    .content {
        font-size: .42rem;
        margin-top: .92rem;
        text-align: center;
        color: #374452;
    }
    .btn-groud {
        display: flex;
        justify-content: space-around;
        margin-top: .93rem;
    }
    .btn-cancel {
        font-size: .48rem;
        width: 4.15rem;
        height: 1.49rem;
        border: 0;
        border-radius: .75rem;
        color: #A6AFBA;
        background-color: #FFF;
    }
    .btn-del {
        font-size: .48rem;
        width: 4.15rem;
        height: 1.49rem;
        border: 0;
        border-radius: .75rem;
        color: #FFF;
        background-color: #F43E3A;
    }
</style>