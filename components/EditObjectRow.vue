<template>
    <div>
        <div class="h-10 px-4 bg-white rounded-sm mb-2 flex items-center hover:bg-gray-200 cursor-pointer">
            <span class="flex-grow" :class="[d[0].value ? '' : 'text-gray-400']" @click="modalVisible = true">
                {{ d[0].value ? d[0].value : 'EMPTY' }}
            </span>
            <span><v-icon name="long-arrow-alt-right" /></span>
        </div>
        
        <div v-if="modalVisible" class="fixed inset-0">
            <div class="fixed inset-0 bg-white opacity-95"></div>
            <div class="fixed inset-0 flex items-center justify-center z-10" >                
                <div class="bg-gray-900 p-5 max-w-xl w-full">
                    <div v-for="(r, count) in d" :key="count">
                        <div class="mb-5">
                            <h4 class="pl-3 text-gray-200 font-bold mb-2 inline-block">{{ r.key }}</h4>
                            <textarea v-if="r.type == 'text'" class="input w-full" v-model="r.value"></textarea>                            
                            <input v-else type="text" class="input w-full" v-model="r.value" />
                        </div>
                    </div>
                    <span class="button" @click="modalVisible = false">close</span>
                </div>                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['d'],
    data() {
        return {
            modalVisible: false
        }
    }
}
</script>