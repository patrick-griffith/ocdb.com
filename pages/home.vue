<template>
    <div>
        this is a logged in page.
        <span @click="logout" class="link">Logout --></span>
    </div>
</template>
<script>
export default {
    middleware: ['auth', 'emailConfirmed'],    
    methods: {        
        async logout() {
            await this.$auth.logout();
        }
    },
}
</script>