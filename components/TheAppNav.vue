<template>
    <div class="py-2 border-b-2 border-blue-100 bg-white">
        <div class="container flex items-center">
            <div>
                <nuxt-link to="/">
                    <img src="/img/logo.png" alt="One Click DB logo" width="44" class="inline" />
                </nuxt-link>
            </div>
            
            <div class="flex-grow text-gray-600 inline-block text-right">                     
                <upgrade />
                <a href="mailto:mister@patgriffith.com" class="ml-5 hover:underline cursor-pointer">Help</a>
                <span @click="logout" class="ml-5 hover:underline cursor-pointer">Logout</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        async logout() {
            await this.$auth.logout();
        }
    }
}
</script>