<template>
    <div>
        <input class="input-item" :type="type" :placeholder="placeholder" @input="handleInput" ref="input" :value="value" tabindex="-1">
        <span v-if="icon" class="icon" :style="{'backgroundImage': `url(${icon})`}" v-tap="{methods: handleIconClick}"></span>
    </div>
</template>

<script>
    export default {
        name: 'inputDark',
        data () {
            return {
            }
        },
        props: {
            type: {
                type: String,
                default () {
                    return 'text'
                }
            },
            value: [String, Number],
            placeholder: String,
            icon: String
        },
        methods: {
            handleInput () {
                this.$emit('input', this.$refs.input.value)
            },
            handleIconClick () {
                this.$emit('icon-click')
            }
        }
    }
</script>

<style scoped>
    div{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: start;
        align-items: center;
        height: 1.43rem;
        width: 8.29rem;
        margin-top: 0.37rem;
        margin-left: 1.26rem;
        border-radius: 0.2rem;
        border: none;
        background-color: #FFF;
    }
    .input-item{
        flex-grow: 1;
        border: none;
        background-color: transparent;
        color: #374452;
        font-size: 0.42rem;
        margin-left: 0.53rem;
        margin-right: 0.53rem;
    }
    .icon{
        width: 0.58rem;
        height: 0.58rem;
        margin-right: 0.48rem;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    ::-webkit-input-placeholder{
        color: #A6AFBA;
        font-size: 0.42rem;
    }
</style>