<template>
    <div>   
        <EmailAuthCode @verified="verify" />
        <div class="text-center py-20">
            <span @click="logout" class="link">Logout --></span>
        </div>
    </div>
</template>
<script>
import EmailAuthCode from '~/components/EmailAuthCode.vue'
export default {
    layout: 'auth',
    middleware: ['auth', 'emailNotConfirmed'],
    components: {
        EmailAuthCode
    },
    head() {
        return {      
            title: 'Confirm your Yaywork account.'
        };
    },
    methods: {
        async verify(code) {
            try {
                let userResponse = await this.$axios.patch('/user/confirm', {
                    code: code
                })
                this.$store.dispatch('stopLoading')
                this.$toast.success('Great success! Welcome welcome!')
                this.$auth.setUser(userResponse.data)
                this.$router.push('/home')
            } catch(e) {
                this.$catchError(e)
            }
        },
        async logout() {
            await this.$auth.logout();
        }
    }
}
</script>
<style lang="scss" scoped>

</style>