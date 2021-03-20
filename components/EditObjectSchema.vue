<template>
    <div>
        <div class="grid grid-cols-12 gap-5 mb-2">
            <div class="col-span-6 prose">
                <h3>Key</h3>
            </div>
            <div class="col-span-6 prose">
                <h3>Type</h3>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-5 mb-5 items-center" v-for="(pair, index) in pairs" :key="index">
            <div class="col-span-6"><input type="text" class="input w-full" v-model="pair.key" /></div>
            <div class="col-span-5">
                <div class="select">
                    <select v-model="pair.type" class="w-full">
                        <option value="string">String</option>
                        <option value="text">Text Box</option>
                        <option value="collection">Collection</option>
                    </select>
                </div>
            </div>
            <div class="col-span-1">
                <span class="cursor-pointer opacity-25 hover:opacity-100" @click="remove(index)"><v-icon name="trash" /></span>
            </div>
        </div>
        
        <div class="mt-2">
            <span class="inline-block">
                <span class="cursor-pointer underline  hover:bg-blue-100" @click="addNewPair">
                    + Add
                </span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['pairs', 'level'],
    methods: {
        async addNewPair() {
            this.pairs.push({
                key: '',
                type: 'string',
                value: ''
            })
        },
        remove(index) {
            this.pairs.splice(index, 1)
        },
    }
}
</script>