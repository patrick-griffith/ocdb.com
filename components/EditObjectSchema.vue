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
        <div v-for="(pair, index) in pairs" :key="'level-' + level + '-' + pair.id">
            <div :class="[pair.type == 'collection' ? 'bg-gray-900 p-2 -mx-2 rounded-sm mb-5' : '']">
                <div class="grid grid-cols-12 gap-5 mb-5 items-center">
                    <div class="col-span-6"><input type="text" class="input w-full" v-model="pair.key" @input="changeKey(index)" /></div>
                    <div class="col-span-5">
                        <div class="select">
                            <select v-model="pair.type" @change="changeType(index)" class="w-full">
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
                    <edit-object-schema :passedPairs="pair.schema ? pair.schema : []" :level="2" :level1index="index" />
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
export default {
    props: ['passedPairs', 'level', 'level1index'],
    data() {
        return {
            pairs: this.passedPairs ? JSON.parse(JSON.stringify(this.passedPairs)) : []
        }
    },
    methods: {
        changeType(index) {
            let val = this.pairs[index].type
            let l = this.level
            let l1 = this.level1index
            this.$store.dispatch('updateType', {index, val, l, l1})
        },
        changeKey(index) {
            let val = this.pairs[index].key
            let l = this.level
            let l1 = this.level1index
            this.$store.dispatch('updateKey', {index, val, l, l1})
        },
        async addNewPair() {
            var np = {}
            let id = Math.random().toString(36).slice(2)
            if(this.level == 1) {
                np = {
                    id: id,
                    key: '',
                    type: 'string',
                    value: '',
                    schema: [],
                    data: []
                }
            } else {
                np = {
                    id: id,
                    key: '',
                    type: 'string',
                }
            }
            this.pairs.push(np)

            let l1 = this.level1index
            let newPair = JSON.parse(JSON.stringify(np))

            this.$store.dispatch('addPair', {newPair, l1 })
        },
        remove(index) {
            if(confirm('Are you sure?')) {
                let l1 = this.level1index

                this.pairs.splice(index, 1)
                this.$store.dispatch('removePair', {index, l1 })
            }
        },
        async updatePairs(value) {
            console.log('trying to update pairs')
            //this.pairs = value
        }
    },
}
</script>