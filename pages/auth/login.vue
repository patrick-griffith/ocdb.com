<template>
    <div class="container">   
        <div class="prose text-center mx-auto">
            <h1>Login</h1>
        </div>
        <form id="login-form" @submit.prevent="submitLogin" class="mx-auto max-w-sm">
            <label class="label">Email Address</label>                    
            <div><input class="input w-full" ref="email" type="email" v-validate="'required|email|max:191'" name="email" placeholder="name@email.com" v-model="email" /></div>
            <div class="validate-error" v-if="errors.first('email')">{{ errors.first('email') }}</div>

            <label class="label">Password</label>
            <div><input class="input w-full" type="password" v-validate="'required|min:6|max:191'" name="password" ref="password" placeholder="********" v-model="password" /></div>
            <div class="validate-error" v-if="errors.first('password')">{{ errors.first('password') }}</div>

            <button class="button b2 ml-2 mt-10" native-type="submit"><span class="load"></span>Login</button>

            <p class="mt-10 ml-2 prose">
                Forgot your password? <nuxt-link to="/auth/reset">Reset it.</nuxt-link><br/>
                No account? <nuxt-link to="/auth/start">Sign up.</nuxt-link>
            </p>
        </form>
    </div>
</template>
<script>
export default {
    layout: 'auth',
    middleware: 'auth',
    auth: 'guest',
    head() {
        return {      
            title: 'Login to Yaywork'
        };
    },
    data() {
        return {
            email: '',
            password: '',
            isLoading: false
        }
    },
    methods: {
        submitLogin() {
            if(!this.$store.state.isLoading) {
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        this.login()
                    }
                })
            }
        },
        async login() {
            try {
                this.$store.dispatch('startLoading')
                await this.$auth.loginWith('laravelJWT', {
                  data: {
                    email: this.email,
                    password: this.password
                  }
                })
                this.$store.dispatch('stopLoading')
            } catch (e) { 
                this.$catchError(e)
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