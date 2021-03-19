<template>
    <div class="container">   
        <h1 class="pt-4 max-w-3xl mx-auto text-center mb-10 font-display leading-tight text-blue-800 text-3xl lg:text-4xl">Reset Your Password</h1>
        <form id="login-form" @submit.prevent="go">

            <div v-show="step === 0" class="mx-auto max-w-sm">
                <label class="label">Email Address</label>                    
                <div><input class="input w-full" ref="email" type="email" v-validate="'required|email|max:191'" name="email" placeholder="name@email.com" v-model="email" /></div>
                <div class="validate-error" v-if="errors.first('email')">{{ errors.first('email') }}</div>
                <button class="button b2 ml-2 mt-10" native-type="submit"><span class="load"></span>Send Reset Code</button>
            </div>

            <div v-if="step === 1">
                <EmailAuthCode @verified="verify" :email="email" />
            </div>

            <div v-show="step === 2" class="mx-auto max-w-sm">
                <label class="label">Password</label>
                <div><input class="input w-full" type="password" v-validate="'required|min:6|max:191'" name="password" ref="password" placeholder="********" v-model="password" /></div>
                <div class="validate-error" v-if="errors.first('password')">{{ errors.first('password') }}</div>

                <label class="label">Confirm Password</label>
                <div><input class="input w-full" type="password" v-validate="'required|confirmed:password|min:6|max:191'" name="password_confirmation" placeholder="********" v-model="password_confirmation" /></div>
                <div class="validate-error" v-if="errors.first('password_confirmation')">{{ errors.first('password_confirmation') }}</div>

                <button class="button b2 ml-2 mt-10" native-type="submit"><span class="load"></span>Set Password</button>
            </div>
            

        </form>
    </div>
</template>
<script>
/* 
    TODO
    Fix user error in usercontroller
    Display a pretty "processcing" overlay or something so it doesn't look like it's just doing nothing.
    Figure out what that didn't just throw a frontend error
*/

import EmailAuthCode from '~/components/EmailAuthCode.vue'
export default {
    layout: 'auth',
    middleware: 'auth',
    auth: 'guest',
    components: {
        EmailAuthCode
    },
    head() {
        return {      
            title: 'Reset your password.'
        };
    },
    data() {
        return {
            email: '',
            password: '',
            password_confirmation: '',
            step: 0,
            code: '',
        }
    },
    methods: {
        async updatePassword() {
            try {
                this.$store.dispatch('startLoading')
                let userResponse = await this.$axios.patch('/user/resetPassword', {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    code: this.code
                })
                this.$toast.success('Great success! Password updated!')
                await this.$auth.loginWith('laravelJWT', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                this.$store.dispatch('stopLoading') 
            } catch(e) {
                this.$catchError(e)
            }            
        },
        async verify(code) {
            this.$store.dispatch('stopLoading')
            this.code = code
            this.step = 2
        },
        async sendResetCode() {
            try {
                this.$store.dispatch('startLoading')
                await this.$axios.post('/user/setAndSendCode', {
                    email: this.email
                })
                this.$store.dispatch('stopLoading')
                this.step = 1
            } catch (e) {
                this.$catchError(e)
            }
        },
        go() {
            if(!this.$store.state.isLoading) {
                if(this.step === 0) {
                    this.$validator.validate('email').then((result) => {
                        if (result) {
                            this.sendResetCode()
                        }
                    })
                } else if(this.step == 2) {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            this.updatePassword()
                        }
                    })
                }
            }
        }
    },
    async mounted() {
        this.$refs.email.focus()   
    }
}
</script>
<style lang="scss" scoped>

</style>