<template>
    <div class="pt-10 pb-5 container text-center">
        <nuxt-link to="/">
            <img src="/img/logo.png" alt="OneClickDB logo" width="52" class="inline" />
        </nuxt-link>
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