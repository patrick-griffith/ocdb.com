<template>
  <div class="container py-20">
    <Nuxt />
  </div>
</template>
<script>
export default {
  head() {
    return {      
        title: 'Auth',
        htmlAttrs: {
            class: 'bg-blue-100'
        }
    };
  }
}
</script>