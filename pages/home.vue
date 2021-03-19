<template>
    <div class="">
        <logo />

        <div class="grid grid-cols-12 gap-5 prose">
            <div class="col-span-3">
                <h3>Key</h3>
            </div>
            <div class="col-span-9">
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
        
        <span class="button text-lg" @click="saveJson">Save</span>  <a :href="jsonUrl" class="text-lg button ml-5" target="_blank">Open JSON URL</a>
        <br/><br/><br/><br/>
        <span @click="logout" class="link">Logout</span>
        <br/><br/><br/><br/>



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
                pairs: objArray
            }
        } catch(e) {
            $catchError(e)
        }
    },
    computed: {
        jsonUrl() {
            return process.env.API_URL + '/db/' + this.$auth.user.id + '/' + this.$auth.user.dbname
        }
    },
    methods: {   
        remove(index) {
            this.pairs.splice(index, 1)
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