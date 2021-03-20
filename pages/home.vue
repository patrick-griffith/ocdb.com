<template>
    <div class="">
        <div class="my-10 mx-auto max-w-lg text-center">      
            <div>
                <nuxt-link to="/">
                <img src="/img/logo.png" alt="One Click DB logo" width="50" class="inline" />
                </nuxt-link>
            </div>
            
            <div class="text-gray-600 bg-blue-100 inline-block  py-2 px-5 rounded-md mt-5"> 
                <a :href="jsonUrl" class="text-blue-600 font-bold hover:underline" target="_blank">Open JSON URL</a>
                <a href="mailto:mister@patgriffith.com" class="ml-5 hover:underline cursor-pointer">Help</a>
                <span @click="logout" class="ml-5 hover:underline cursor-pointer">Logout</span>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-5 mb-2 mt-20">
            <div class="col-span-3 prose">
                <h3>Key</h3>
            </div>
            <div class="col-span-9 prose">
                <h3>Value</h3>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-5 mb-5 items-center" v-for="(pair, index) in pairs" :key="index">
            <div class="col-span-3"><input type="text" class="input w-full" v-model="pair.key" /></div>
            <div class="col-span-8"><input type="text" class="input w-full" v-model="pair.value" /></div>
            <div class="col-span-1">
                <span class="cursor-pointer opacity-25 hover:opacity-100" @click="remove(index)"><v-icon name="trash" /></span>
            </div>
        </div>

        <span class="cursor-pointer opacity-25 hover:opacity-100" @click="addNewPair"><v-icon name="plus" /></span><br/><br/><br/><br/><br/><br/>
        
        <div v-if="dataChanged">
            <span class="button text-lg" @click="saveJson">Save Changes</span>
            <span class="button text-lg ml-5" @click="revertJson">Discard Changes</span>
        </div>

    </div>
</template>
<script>
export default {
    middleware: ['auth', 'emailConfirmed'],    
    data() {
        return {
            json: '',
        }
    },
    async asyncData({ $auth, $catchError }) {
        try {
            let storedJson = JSON.parse($auth.user.json)
            let objArray = []
            for (const [key, value] of Object.entries(storedJson)) {
                objArray.push({
                    "key": key,
                    "value": value
                })
            }

            return {
                pairs: objArray,
                initialPairs: JSON.parse(JSON.stringify(objArray))
            }
        } catch(e) {
            $catchError(e)
        }
    },
    computed: {
        jsonUrl() {
            return process.env.API_URL + '/db/' + this.$auth.user.id + '/' + this.$auth.user.dbname
        },
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
    },
    methods: {
        warnUserOnExit() {
            if(this.dataChanged) {
                return true
            }
        },
        remove(index) {
            this.pairs.splice(index, 1)
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
                    this.json[element.key] = element.value
                }
            })
            await this.$axios.patch('/user/setDB', {
                json: this.json
            })
            this.initialPairs = JSON.parse(JSON.stringify(this.pairs))
            this.$toast.success('Saved!')
        },
        async addNewPair() {
            this.pairs.push({
                key: '',
                value: ''
            })
        },
        async logout() {
            await this.$auth.logout();
        }
    },
}
</script>