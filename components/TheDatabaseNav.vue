<template>
    <div class="mb-6 max-w-2xl mx-auto">
        <div class="md:flex items-center w-full">
            <label for="toogleA" class="flex items-center justify-center md:justify-start cursor-pointer mb-8 md:mb-0">
                <div class="mr-3 text-gray-700 font-medium transition duration-200 ease-in-out" :class="[schemaMode ? 'opacity-25' : '']">
                    Content
                </div>
                <div class="relative">                
                    <input id="toogleA" type="checkbox" class="hidden" v-bind:checked="schemaMode" v-on:change="toggleSchemaMode" />
                    <div class="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>                
                    <div class="toggle__dot transition duration-200 ease-in-out absolute w-6 h-6 bg-blue-700 rounded-full shadow inset-y-0 left-0"></div>
                </div>                
                <div class="ml-3 text-gray-700 font-medium transition duration-200 ease-in-out" :class="[!schemaMode ? 'opacity-25' : '']">
                    Structure
                </div>
            </label>            
            <div class="text-center md:text-right flex-grow relative">
                <a :href="jsonUrl" class="text-blue-600 font-bold button link-rotate inline-block" target="_blank">Get JSON URL</a>


                <span class="ml-5">
                    <span class="text-gray-800 hover:text-blue-700 cursor-pointer" @click="subnavVisible = !subnavVisible"><v-icon name="bars" scale="1.2" /></span>
                </span>

                <div class="absolute right-0 top-0 mt-8 -mr-5 text-gray-600 bg-white py-4 px-5 rounded-md inline-block" v-if="subnavVisible">
                    <upgrade />
                    <a href="mailto:mister@patgriffith.com" class="ml-5 hover:underline cursor-pointer">Help</a>
                    <span @click="logout" class="ml-5 hover:underline cursor-pointer">Logout</span>
                </div>
            </div>
        </div>                    
    </div>
</template>
<script>
export default {
    data() {
        return {
            subnavVisible: false
        }
    },
    computed: {
        schemaMode() {
            return this.$store.getters.schemaMode
        },
        jsonUrl() {
            return process.env.API_URL + '/db/' + this.$auth.user.id + '/' + this.$auth.user.dbname
        },
    },
    methods: {
        toggleSchemaMode(){
            this.$store.dispatch('updateSchemaMode')
        },
        async logout() {
            await this.$auth.logout();
        }    
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