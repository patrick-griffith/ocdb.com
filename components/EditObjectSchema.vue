<template>
    <div>
        <div class="grid grid-cols-12 gap-5 mb-2">
            <div class="col-span-6" :class="[level == 2 ? 'text-white' : ' prose']">
                <h3>Key</h3>
            </div>
            <div class="col-span-6" :class="[level == 2 ? 'text-white' : ' prose']">
                <h3>Type</h3>
            </div>
        </div>
        <div v-for="(pair, index) in pairs" :key="index">
            <div :class="[pair.type == 'collection' ? 'bg-gray-900 p-2 -mx-2 rounded-sm' : '']">
                <div class="grid grid-cols-12 gap-5 mb-5 items-center">
                    <div class="col-span-6"><input type="text" class="input w-full" v-model="pair.key" /></div>
                    <div class="col-span-5">
                        <div class="select">
                            <select v-model="pair.type" class="w-full">
                                <option value="string">String</option>
                                <option value="text">Text Box</option>
                                <option value="collection" v-if="level === 1">Collection</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-1" >
                        <span class="cursor-pointer " :class="[level == 2 || pair.type == 'collection' ? 'text-white opacity-50 hover:opacity-100' : 'opacity-25 hover:opacity-100']" @click="remove(index)"><v-icon name="trash" /></span>
                    </div>
                </div>
                <div class="pl-10 pb-5" v-if="pair.type == 'collection' && level == 1">
                    <edit-object-schema :pairs="new Array()" :level="2" />
                </div>
            </div>
        </div>
        
        <div class="mt-5">
            <span class="inline-block">
                <span class="cursor-pointer underline " :class="[level == 2 ? 'text-white hover:bg-blue-800' : ' hover:bg-blue-100']" @click="addNewPair">
                    + Add
                </span>
            </span>
        </div>
    </div>
</template>
<script>
import EditObjectContent from './EditObjectContent.vue'
export default {
  components: { EditObjectContent },
    props: ['pairs', 'level'],
    methods: {
        async addNewPair() {
            this.pairs.push({
                key: '',
                type: 'string',
                value: '',
            })
            this.$emit('updatePairs', this.pairs)
        },
        remove(index) {
            this.pairs.splice(index, 1)
        },
        async updatePairs(value) {
            console.log('trying to update pairs')
            //this.pairs = value
        }
    }
}
</script>