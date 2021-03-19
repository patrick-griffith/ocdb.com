<template>
    <div class="container">      
        <form id="signup-form" @submit.prevent="moveAlong">
            
            <div>

                <label class="label">Name</label>
                <div><input class="input w-full" ref="name" type="text" v-validate="'required|max:191'" name="name" placeholder="Full Name" v-model="newUser.name" /></div>
                <div class="validate-error" v-if="errors.first('name')">{{ errors.first('name') }}</div>

                <label class="label">Email Address</label>
                <div><input class="input w-full" ref="email" type="email" v-validate="'required|email|max:191'" name="email" placeholder="name@email.com" v-model="newUser.email" /></div>
                <div class="validate-error" v-if="errors.first('email')">{{ errors.first('email') }}</div>

                <label class="label">Password</label>
                <div><input class="input w-full" type="password" v-validate="'required|min:6|max:191'" name="password" ref="password" placeholder="********" v-model="newUser.password" /></div>
                <div class="validate-error" v-if="errors.first('password')">{{ errors.first('password') }}</div>

                <label class="label">Confirm Password</label>
                <div><input class="input w-full" type="password" v-validate="'required|confirmed:password|min:6|max:191'" name="password_confirmation" placeholder="********" v-model="newUser.password_confirmation" /></div>
                <div class="validate-error" v-if="errors.first('password_confirmation')">{{ errors.first('password_confirmation') }}</div>

                <div class="text-blue-600 text-xs mt-4">
                    <label>
                        <input class="input inline-block align-middle" type="checkbox" name="terms" v-validate="'required: { allowFalse: false }'" /> 
                        <span class="inline-block align-middle">Yes, I agree to the terms of service and privacy policy.</span>                        
                    </label>
                    <div class="validate-error" v-if="errors.first('terms')">{{ errors.first('terms') }}</div>
                </div>

                <div class="mt-10 ml-2">
                    <button class="button" native-type="submit"><span class="load"></span>Create Account --></button>
                </div>
            </div>
            
        </form>
    </div>
</template>
<script>
export default {
    layout: 'auth',
    middleware: 'auth',
    auth: 'guest',
    data() {
        return {
            newUser: {
                name:  '',
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    head() {
        return {      
            title: 'Get an Account',            
        }
    },
    methods: {
        async login() {
            try {
                await this.$auth.loginWith('laravelJWT', {
                  data: {
                    email: this.newUser.email,
                    password: this.newUser.password
                  }
                })
                this.$store.dispatch('stopLoading')
            } catch (e) { 
                this.$catchError(e)
            }
        },
        async signup() {
            try {
                this.$store.dispatch('startLoading')
                let userResponse = await this.$axios.post('/user', this.newUser)
                this.login()
            } catch (e) { 
                this.$catchError(e)
            }   
        },
        async checkUsername() {
            try {
                this.$store.dispatch('startLoading')
                let usernameResponse = await this.$axios.get('/user/checkUsername/' + this.newUser.username)
                this.$store.dispatch('stopLoading')
                if(usernameResponse.data.available) {
                    this.step = 2
                    this.$nextTick(() => {
                        this.$refs.email.focus()
                    })
                } else {
                    this.$toast.error('Sorry, that username is already taken.')
                }
            } catch (e) { 
                this.$catchError(e)
            }   
        },
        moveAlong() {
            if(!this.$store.state.isLoading) {
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        this.signup()
                    }
                })
            }
        },
    },
    async mounted() {
        this.$refs.name.focus()        
    }
}
</script>
<style lang="scss" scoped>
#signup-form {
    h1 {
        @apply pt-4 max-w-3xl mx-auto text-center mb-10 leading-1 text-blue-800 text-3xl;
        @media screen and (min-width: theme('screens.lg')) {
            @apply text-4xl;
        }
        br {
            display: none;
            @media screen and (min-width: theme('screens.md')) {
                display: block;
            }
        }
    }
    > div {
        @apply mx-auto max-w-sm;
    }
}
</style>