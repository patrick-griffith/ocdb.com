<template>
    <div>
        this is a logged in page.
    </div>
</template>
<script>
export default {
    middleware: ['auth', 'emailConfirmed'],    
}
</script>