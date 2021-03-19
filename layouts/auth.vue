<template>
  <div class="container">
    <logo />
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