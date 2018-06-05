<template>
    <ul class="tabbar">
        <li class="tabbar-item" v-for="(item, i) in items" :key="i" v-tap="{methods: change, index: i}">
            <span class="tabbar-item-icon" :style="{'backgroundImage': `url(${selectIndex === i ? item.activeImg : item.defaultImg})`}"></span>
            <span class="tabbar-item-title" :style="{'color': `${selectIndex === i ? '#29DC54' : '#A6AFBA'}`}" v-text="item.title"></span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'Tabbar',
        data() {
            return {
                selectIndex: this.index
            }
        },
        props: {
            index: Number,
            items: Array
        },
        methods: {
            change (params) {
                if (params.index === this.selectIndex) return
                this.selectIndex = params.index
                this.$emit('change-tab', this.selectIndex)
            }
        }
    }
</script>

<style>
    .tabbar{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.62rem;
        background-color: #F8FCFF;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }
    .tabbar-item{
        height: 1.62rem;
        flex-grow: 1;

        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }
    .tabbar-item-icon{
        width: 0.6rem;
        height: 0.6rem;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .tabbar-item-title{
        font-size: 0.3rem;
        margin-top: 0.16rem;
    }
</style>
