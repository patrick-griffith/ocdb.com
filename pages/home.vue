<template>
    <div>
        
        <the-app-nav />

        <div class="container">

            <div class="mt-10 mx-auto max-w-2xl mb-20">                
                
                <the-database-nav v-model="schemaMode" />
                
                <div v-if="schemaMode">
                    <edit-object-schema :pairs="pairs" :level="1" />                    
                </div>
                <div v-else>
                    
                    <edit-object-content :pairs="pairs" :level="1" />                    
                                
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

export default {
    middleware: ['auth', 'emailConfirmed'],    
    data() {
        return {
            json: ''
        }
    },
    head() {
        return {      
            title: 'One Click DB',
            htmlAttrs: {
                class: 'bg-blue-50'
            }
        };
    },
    async asyncData({ $auth, $catchError }) {
        try {
            let storedJson = JSON.parse($auth.user.json)
            let objArray = []
            for (const [key, value] of Object.entries(storedJson)) {
                objArray.push({
                    "key": key,
                    "type": value.type,
                    "value": value.value
                })
            }

            return {
                schemaMode: $auth.user.schemaMode,
                pairs: objArray,
                initialPairs: JSON.parse(JSON.stringify(objArray))
            }
        } catch(e) {
            $catchError(e)
        }
    },
    computed: {        
        dataChanged() {
            if(JSON.stringify(this.pairs) != JSON.stringify(this.initialPairs)) {
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
            await this.$axios.patch('/user/setPro', {
                json: this.json
            })
            
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
                this.pairs = JSON.parse(JSON.stringify(this.initialPairs))
                this.$toast.success('Data reset!')
            }
        },
        async saveJson() {
            this.json = new Object()
            this.pairs.forEach(element => {
                if(element.key.length) {
                    this.json[element.key] = {
                        type: element.type,
                        value: element.value
                    }
                }
            })
            await this.$axios.patch('/user/setDB', {
                json: this.json
            })
            this.initialPairs = JSON.parse(JSON.stringify(this.pairs))
            this.$toast.success('Saved!')
        },
        // editSchemaMode(value) {
        //     console.log('schema mode new value is ' + value)
        // }                
    },
    watch: {
        schemaMode: function (val) {
            this.$axios.patch('/user/setSchemaMode/' + (val ? '1' : '0'))
        },
    }
}
</script>