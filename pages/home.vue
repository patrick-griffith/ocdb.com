<template>
    <div class="">
        <div class="my-5 flex items-center">      
            <div>
                <nuxt-link to="/">
                <img src="/img/logo.png" alt="One Click DB logo" width="50" class="inline" />
                </nuxt-link>
            </div>
            
            <div class="flex-grow text-gray-600 inline-block text-right"> 
                <a :href="jsonUrl" class="text-blue-600 font-bold button" target="_blank">Get DB URL</a>
                <a href="mailto:mister@patgriffith.com" class="ml-5 hover:underline cursor-pointer">Help</a>
                <span @click="logout" class="ml-5 hover:underline cursor-pointer">Logout</span>
            </div>
        </div>

        <div class="mt-20 gap-20 mx-auto max-w-2xl">
            <!-- mode toggler -->
            <div class="flex items-center justify-center w-full mb-24">
                <label for="toogleA" class="flex items-center cursor-pointer">
                    <div class="mr-3 text-gray-700 font-medium transition duration-200 ease-in-out" :class="[schemaMode ? 'opacity-25' : '']">
                        Edit Content
                    </div>
                    <div class="relative">                
                        <input id="toogleA" type="checkbox" class="hidden" v-model="schemaMode" />
                        <div class="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>                
                        <div class="toggle__dot transition duration-200 ease-in-out absolute w-6 h-6 bg-blue-700 rounded-full shadow inset-y-0 left-0"></div>
                    </div>                
                    <div class="ml-3 text-gray-700 font-medium transition duration-200 ease-in-out" :class="[!schemaMode ? 'opacity-25' : '']">
                        Edit Schema
                    </div>
                </label>            
            </div>
            
            <div v-if="schemaMode">
                <div class="grid grid-cols-12 gap-5 mb-2">
                    <div class="col-span-6 prose">
                        <h3>Key</h3>
                    </div>
                    <div class="col-span-6 prose">
                        <h3>Type</h3>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-5 mb-5 items-center" v-for="(pair, index) in pairs" :key="index">
                    <div class="col-span-6"><input type="text" class="input w-full" v-model="pair.key" /></div>
                    <div class="col-span-5">
                        <div class="select">
                            <select v-model="pair.type" class="w-full">
                                <option value="string">String</option>
                                <option value="text">Text</option>
                                <option value="richtext">Rich Text</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <span class="cursor-pointer opacity-25 hover:opacity-100" @click="remove(index)"><v-icon name="trash" /></span>
                    </div>
                </div>
                
                <div class="mt-2">
                    <span class="inline-block">
                        <span class="cursor-pointer underline  hover:bg-blue-100" @click="addNewPair">
                            + Add
                        </span>
                    </span>
                </div>
            </div>
            <div v-else>
                <div v-for="(pair, index) in pairs" :key="index" class="mb-5">
                    <div class="prose pl-3 mb-1">
                        <h4>{{ pair.key }}</h4>
                    </div>
                    <div>
                        <textarea v-if="pair.type == 'text'" class="input w-full" v-model="pair.value"></textarea>
                        <input v-else type="text" class="input w-full" v-model="pair.value" />
                    </div>
                </div>
                               
            </div>

             <div v-if="dataChanged">
                <span class="button text-lg" @click="saveJson">Save Changes</span>
                <span class="button text-lg ml-5" @click="revertJson">Discard Changes</span>
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
        async addNewPair() {
            this.pairs.push({
                key: '',
                type: 'string',
                value: ''
            })
        },
        async logout() {
            await this.$auth.logout();
        }
    },
    watch: {
        schemaMode: function (val) {
            this.$axios.patch('/user/setSchemaMode/' + (val ? '1' : '0'))
        },
    }
}
</script>

<style lang="scss" scoped>
.toggle__dot {
  top: -.25rem;
  left: -.25rem;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
}
</style>