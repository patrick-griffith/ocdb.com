<template>
    <div>
        <template v-for="(pair, index) in pairs">
            <div :key="pair.id" class="mb-5" v-if="pair.type != 'collection' || pair.schema.length">
                <div class="prose pl-3 mb-1">
                    <h4>{{ pair.key }}</h4>
                </div>
                <div>
                    <div v-if="pair.type == 'collection'" class="bg-gray-900 p-5 -mx-2 rounded-sm mb-5">
                        <template v-for="(d, i) in pair.data">
                            <edit-object-row :d="d" :key="d.id" :level1index="index" @update="changeCollectionData(index)" @delete="deleteCollectionData(index, i)" />
                        </template>
                        <span class="inline-block mt-5 cursor-pointer underline text-white hover:bg-blue-800" @click="addRow(index)">
                            + Add
                        </span>                    
                    </div>
                    <textarea v-else-if="pair.type == 'text'" class="input w-full" v-model="pair.value" @input="changeValue(index)"></textarea>                            
                    <input v-else type="text" class="input w-full" v-model="pair.value" @input="changeValue(index)" />
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: ['passedPairs', 'level'],
    data() {
        return {
            pairs: this.passedPairs ? JSON.parse(JSON.stringify(this.passedPairs)) : []
        }
    },
    methods: {
        changeValue(index) {
            let val = this.pairs[index].value
            this.$store.dispatch('updateValue', {index, val})
        },
        changeCollectionData(index) {
            let val = JSON.parse(JSON.stringify(this.pairs[index].data))
            this.$store.dispatch('updateCollectionData', {index, val})
        },
        deleteCollectionData(index, i) {
            let l1 = index
            index = i
            this.pairs[l1].data.splice(index, 1)
            this.$store.dispatch('deleteCollectionData', {index, l1})
        },
        addRow(l1) {
            
            let row = []

            this.$store.state.pairs[l1].schema.forEach(e => {
                row.push( {
                    "key": e.key,
                    "type": e.type,
                    "value": ""
                })
            })

            this.pairs[l1].data.push(row)
            let val = JSON.parse(JSON.stringify(row))
            this.$store.dispatch('addContentRow', {l1, val})
        }
    }
}
</script>