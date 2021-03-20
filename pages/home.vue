<template>
    <div>
        
        <the-app-nav />

        <div class="container">

            <div class="mt-10 mx-auto max-w-2xl mb-20">                
                
                <the-database-nav />
                
                <div v-if="schemaMode">
                    <edit-object-schema :passedPairs="pairs" :level="1" />
                </div>
                <div v-else>
                    <edit-object-content :passedPairs="pairs" :level="1" />                                
                </div>

                <div v-if="dataChanged">
                    <span class="button text-lg" @click="saveJson">Save Changes</span>
                    <span class="button text-lg ml-5" @click="revertJson">Discard Changes</span>
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
                class: 'bg-blue-50'
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
        revertJson() {
            if(confirm("Are you sure?")) {
                this.$store.dispatch('revertPairs')                
                this.$toast.success('Data reset!')
            }
        },
        async saveJson() {
            this.$store.dispatch('saveJson')            
            this.$toast.success('Saved!')
        },              
    },    
}
</script>