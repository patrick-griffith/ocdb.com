<template>
    <div>
        
        <the-app-nav />

        <div class="container">

            <div class="mt-10 mx-auto max-w-3xl mb-20">                
                
                <the-database-nav />
                
                
                <div v-if="schemaMode" class="bg-gray-900 p-8 rounded-md">
                    <edit-object-schema :passedPairs="pairs" :level="1" />
                </div>
                <div v-else class="bg-blue-50 p-4 md:p-8 rounded-md">
                    <edit-object-content :passedPairs="pairs" :level="1" />                                
                </div>                
                

                <div class="prose mt-20" v-if="false">
                    <code>
                        <pre>{{ pairs }}</pre>
                    </code>
                </div>
                
            </div>
        </div>

    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    middleware: ['auth', 'emailConfirmed'],    
    head() {
        return {      
            title: 'One Click DB',
            htmlAttrs: {
                class: 'bg-blue-100'
            }
        };
    },
    async asyncData({ $auth, $catchError, store }) {
        try {
            store.dispatch('createPairs');                        
        } catch(e) {
            $catchError(e)
        }
    },
    computed: {  
        ...mapGetters(["schemaMode", "pairs", "initPairs"]),
        dataChanged() {
            if(JSON.stringify(this.pairs) != JSON.stringify(this.initPairs)) {
                return true
            } else {
                return false
            }
        }
    },
    mounted() {
        window.onbeforeunload = this.warnUserOnExit
        if(this.$route.query.upgrade) {
            if(this.$route.query.upgrade == 'booyah' && this.$auth.user.pro == 0) {
                this.setPro()                
            }
        }
        setTimeout(this.saveJson, 1000)
    },
    methods: {
        async setPro() {
            await this.$axios.patch('/user/setPro')
            
            //update the auth user record
            const updatedUser = {...this.$auth.user}
            updatedUser.pro = 1;
            this.$auth.setUser(updatedUser)

            this.$confetti.start();
            setTimeout(this.stopConfetti, 4000);
        },
        stopConfetti() {
            this.$confetti.stop()
        },
        warnUserOnExit() {
            if(this.dataChanged) {
                return true
            }
        }, 
        async saveJson() {
            if(this.dataChanged) {
                this.$store.dispatch('saveJson')
            }
            setTimeout(this.saveJson, 1000)
        },              
    },    
}
</script>