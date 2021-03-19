<template>
    <input type="number" @keydown.prevent="keyPress" @click="$event.target.select()" min="0" max="9" class="block w-full text-center py-3 md:py-5 text-2xl md:text-5xl" placeholder="*" :value="number" ref="input"/>
</template>
<script>
export default {
    props: ['number', 'index'],
    methods: {
        keyPress($event) {
            if($event.keyCode) {
                if($event.keyCode === 13 && this.index === 5) { //submit
                    this.$emit('go')
                } else if($event.keyCode >= 48 && $event.keyCode <= 57) { //a number
                    this.$emit('update', $event, $event.keyCode - 48, this.index)
                } else if($event.keyCode == 46 || $event.keyCode <= 8) { //delete
                    this.$emit('update', $event, 'delete', this.index)
                } else if($event.keyCode == 9) { //tabb
                    this.$emit('update', $event, 'tab', this.index)
                }
            }
        }
    },
    mounted() {
        if(this.index === 0) {
            console.log('Thanks for confirming your email. Very nice of you. Also, why are you looking at this?')
            this.$refs.input.focus()
        }
    }
}
</script>