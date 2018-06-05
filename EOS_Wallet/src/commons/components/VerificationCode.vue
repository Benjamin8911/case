<!--n位验证码输入框组件-->
<template>
    <div class="security-code-wrap">
        <label for="code" v-tap="{ methods: inputFocus }">
            <ul class="security-code-container">
                <li class="field-wrap" v-for="(item, index) in number" :key="index">
                    <i class="char-field"></i>
                </li>
            </ul>
        </label>
        <input ref="input" class="input-code" @input="handleInput" :value="value"
               id="code" name="code" type="number" :maxlength="number"
               autocorrect="off" autocomplete="off" autocapitalize="off">
    </div>
</template>
<script>
    export default {
        name: 'EverificationCode',
        props: {
            number: {
                type: Number,
                default: 6
            },
            placeholder: {
                type: String,
                default: ''
            },
            //定义父子组件共享变量，父组件可以修改子组件值
            value:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                // value: ''
            }
        },
        methods: {
            // 输入完成隐藏键盘
            hideKeyboard () {
                document.activeElement.blur() // ios隐藏键盘
                this.$refs.input.blur() // android隐藏键盘
                this.$emit('commit')
            },
            //将用户输完的验证码传递给父组件
            handleSubmit () {
                this.$emit('input', this.value)
            },
            //监听输入
            handleInput () {
                this.handleSubmit()
                //先赋值再聚焦保证光标定在最后一位
                // this.$refs.input.value = this.value
                this.$emit('input', this.$refs.input.value)
                if (this.$refs.input.value.length >= this.number) {
                    this.hideKeyboard()
                }
            },
            inputFocus () {
                console.log('inputFocus')
                this.$refs.input.focus()
            }
        }
    }
</script>
<style scoped lang="less">
    .security-code-wrap {
        overflow: hidden;
        position:relative;
    }
    label {
        display: flex;
        justify-content: center;
    }
    .security-code-container {
        margin:0;
        padding:0;
        display:flex;
        justify-content: center;
        .field-wrap {
            list-style:none;
            display:block;
            width:1.01rem;
            height:1.01rem;
            line-height:1.01rem;
            font-size:16px;
            background-color:#fff;
            border:1px solid #42BDFE;
            color:#000;
            font-weight:bold;
            text-align:center;
            .char-field {
                font-style:normal;
            }
            &:not(:last-child){
                border-right:none;
            }
        }
    }
    .input-code {
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        right: auto;
        top: 0;
        width: 6.2rem;
        height: 1.05rem;
        line-height: 1.05rem;
        background: transparent;
        border: 0;
        font-size: .5rem;
        letter-spacing: .71rem;
        padding-left: .74rem;
        font-weight: bold;
    }
</style>