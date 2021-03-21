<template>
    <div>
        <div class="h-10 px-4 bg-white rounded-sm mb-2 flex items-center hover:bg-gray-200 cursor-pointer"  @click="modalVisible = true">
            <span class="flex-grow" :class="[d[0].value ? '' : 'text-gray-400']">
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
                            <input v-else type="text" class="input w-full" v-model="r.value"/>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="button" @click="closeModal">close</span> 
                        <div class="flex-grow text-right">
                            <span class="cursor-pointer text-white opacity-75 hover:opacity-100" @click="deleteRow"><v-icon name="trash" /></span>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['d', 'level1index'],
    data() {
        return {
            modalVisible: false
        }
    },
    methods: {
        deleteRow() {
            this.modalVisible = false
            this.$emit('delete')
        },
        closeModal() {
            this.modalVisible = false
            this.$emit('update')
        },
    }
}
</script>