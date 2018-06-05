<template>
    <ul>
        <li v-for="(item, i) in items" :key="item.title" v-tap="{methods: check, index: i}">
            <span class="title" v-text="item.title"></span>
            <span class="check-icon" :style="{'backgroundImage': `url(${item.value === currentValue ? checkedIcon : cancelCheckedIcon})`}"></span>
        </li>
    </ul>
</template>

<script>
    const checkedIcon = require('../../../static/images/confirm-1.png')
    const cancelCheckedIcon = require('../../../static/images/confirm-gray.png')

    export default {
        name: 'radioItem',
        data () {
            return {
                checkedIcon,
                cancelCheckedIcon
            }
        },
        props: {
            items: Array,
            value: String
        },
        computed: {
            currentValue () {
                return this.value
            }
        },
        methods: {
            check (params) {
                this.$emit('checked', this.items[params.index].value)
            }
        }
    }
</script>

<style scoped>
    ul{
        margin-top: 0.24rem;
    }
    li{
        height: 1.49rem;
        margin-bottom: 1px;
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .title{
        flex-grow: 1;
        margin-left: 0.48rem;
        color: #555555;
        font-size: 0.42rem;
    }
    .check-icon{
        width: 0.52rem;
        height: 0.52rem;
        margin-right: 0.48rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>
