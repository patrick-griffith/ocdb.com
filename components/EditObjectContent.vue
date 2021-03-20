<template>
    <div>
        <div v-for="(pair, index) in pairs" :key="index" class="mb-5">
            <div class="prose pl-3 mb-1">
                <h4>{{ pair.key }}</h4>
            </div>
            <div>
                <textarea v-if="pair.type == 'text'" class="input w-full" v-model="pair.value"></textarea>                            
                <input v-else type="text" class="input w-full" v-model="pair.value" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['pairs', 'level']
}
</script>