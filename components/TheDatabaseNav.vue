<template>
    <div class="mb-12">
        <div class="flex items-center w-full">
            <label for="toogleA" class="flex items-center cursor-pointer">
                <div class="mr-3 text-gray-700 font-medium transition duration-200 ease-in-out" :class="[schemaMode ? 'opacity-25' : '']">
                    Edit Content
                </div>
                <div class="relative">                
                    <input id="toogleA" type="checkbox" class="hidden" v-bind:checked="schemaMode" v-on:change="toggleSchemaMode" />
                    <div class="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>                
                    <div class="toggle__dot transition duration-200 ease-in-out absolute w-6 h-6 bg-blue-700 rounded-full shadow inset-y-0 left-0"></div>
                </div>                
                <div class="ml-3 text-gray-700 font-medium transition duration-200 ease-in-out" :class="[!schemaMode ? 'opacity-25' : '']">
                    Edit Schema
                </div>
            </label>            
            <div class="text-right flex-grow">
                <a :href="jsonUrl" class="text-blue-600 font-bold button ml-10" target="_blank">Get JSON URL</a>
            </div>
        </div>                    
    </div>
</template>
<script>
export default {
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