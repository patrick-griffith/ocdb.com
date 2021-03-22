<template>
    <div class="text-center">

        <div class="prose mb-10 mx-auto">
            <p>An email has been sent to you with a 6-digit code. <br class="hidden md:block"/>Please enter it here :)</p>
        </div>

        <form @submit.prevent="verify">
            <div id="email-auth-code" class="container max-w-xl grid grid-cols-6 gap-2 md:gap-4">
                <EmailAuthCodeNumber ref="numbers" v-for="(number, index) in numbers" :number="number" :index="index" @update="updateNumber" @go="verify" :key="'email-auth-number-' + index"/>
            </div>
            <button class="button bfancy mt-10 link-rotate inline-block" native-type="submit" :disabled="!code"><span class="load"></span>Verify</button>
        </form>
    </div>
</template>
<script>
import EmailAuthCodeNumber from '~/components/EmailAuthCodeNumber.vue'
export default {
    components: {
        EmailAuthCodeNumber
    },
    props: ['email'],
    data() {
        return {
            numbers: [
                '', '', '', '', '', ''
            ]
        }
    },
    computed: {
        code() {
            let concat = this.numbers.join('')
            if(concat.length == 6) {
                return concat
            } else {
                return false
            }
        }
    },
    methods: {
        async verify() {
            if(!this.$store.state.isLoading) {
                try {
                    this.$store.dispatch('startLoading')
                    await this.$axios.post('/user/verifyCode', {
                        code: this.code,
                        email: this.email
                    })                
                    this.$emit('verified', this.code)                
                } catch (e) { 
                    this.$catchError(e)
                }
            } 
        },
        updateNumber(event, key, index) {
            if(key == 'tab') {
                //allow user to tab through all, going back to beginning at the end
                if(index < 5) {
                    event.target.parentElement.childNodes[index + 1].focus()
                    event.target.parentElement.childNodes[index + 1].select()
                } else {
                    event.target.parentElement.childNodes[0].focus()
                    event.target.parentElement.childNodes[0].select()
                }
            } else if(key == 'delete') {                
                
                //if the current index has a value, delete it. otherwise delete previous value.
                if(index > 0) {                    
                    if(event.target.parentElement.childNodes[index].value) {
                        this.$set(this.numbers, index, '')
                    } else {
                        this.$set(this.numbers, index - 1, '')
                    }
                    event.target.parentElement.childNodes[index - 1].focus()
                    event.target.parentElement.childNodes[index - 1].select()
                } else {
                    //if index is 0, just delete 0
                    this.$set(this.numbers, index, '')
                }
            } else { //this means we have a number
                this.$set(this.numbers, index, key)
                if(index < 5) {
                    event.target.parentElement.childNodes[index + 1].focus()
                    event.target.parentElement.childNodes[index + 1].select()
                }
            }            
        }
    }
}
</script>
<style lang="scss" scoped>

</style>