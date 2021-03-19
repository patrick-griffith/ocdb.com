<template>
    <div>
        
    </div>
</template>

<script>
export default {
    methods: {        
        async logout() {
            await this.$auth.logout();
        }
    },
}
</script>