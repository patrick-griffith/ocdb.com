export const state = () => ({
    _currentUser: null,
    _token: null,
    toast: null,
    isLoading: false,
    pairs: [],
    initPairs: []
})

export const mutations = {
    UPDATE_LOADING(state, value) {
        state.isLoading = value
    },
    UPDATE_PAIRS(state, value) {
        state.pairs = value
    },
    UPDATE_INIT_PAIRS(state, value) {
        state.initPairs = value
    },
    UPDATE_COLLECTION_MODE(state, value) {
        state.auth.user.schemaMode = value
    },
    UPDATE_KEY(state, {index, val}) {
        state.pairs[index].key = val
    },
    UPDATE_COLLECTION_KEY(state, {index, val, l1}) {        
        state.pairs[l1].schema[index].key = val
        state.pairs[l1].data.forEach(d => {
            d[index].key = val
        }) 
    },
    UPDATE_TYPE(state, {index, val}) {
        state.pairs[index].type = val
    },
    UPDATE_COLLECTION_TYPE(state, {index, val, l1}) {
        state.pairs[l1].schema[index].type = val
    },
    UPDATE_VALUE(state, {index, val}) {
        state.pairs[index].value = val
    },
    UPDATE_COLLECTION_DATA(state, {index, val}) {
        state.pairs[index].data = val
    },
    DELETE_COLLECTION_DATA(state, {index, l1}) {
        state.pairs[l1].data.splice(index, 1)
    },
    ADD_NEW_PAIR(state, {newPair, l1}) {
        if(l1) {
            state.pairs[l1].schema.push(newPair)

            state.pairs[l1].data.forEach(d => {
                d.push({
                    key: newPair.key,
                    type: newPair.type,
                    value: ""
                    
                })
            })            

        } else {
            state.pairs.push(newPair)
        }
    },
    REMOVE_PAIR(state, {l1, index}) {
        if(l1) {
            let key = state.pairs[l1].schema[index].key
            state.pairs[l1].schema.splice(index, 1)
            
            //also need to delete all the rows that have this key
            let newData = []
            state.pairs[l1].data.forEach(d => {
                const obj = d.filter(v => {
                    return v.key != key
                });
                newData.push(obj)
            })
            state.pairs[l1].data = newData


        } else {
            state.pairs.splice(index, 1)
        }
    },
    ADD_CONTENT_ROW(state, {l1, val}) {        
        state.pairs[l1].data.push(val)
    }
}

export const actions = {
    startLoading(context){
        document.body.classList.add('is-loading')
        context.commit('UPDATE_LOADING', true)
    },
    stopLoading(context){
        document.body.classList.remove('is-loading')
        context.commit('UPDATE_LOADING', false)
    },

    createPairs(context) {
        let storedJson = JSON.parse(this.$auth.user.json)
        let objArray = []
        for (const [key, value] of Object.entries(storedJson)) {

            let schema = []
            let dataArray = []
            if(value.type == 'collection' && value.data) {
                let count = 0
                value.data.forEach(d => {
                    let dArray = []                    
                    for (const [k, v] of Object.entries(d)) {
                        if(count === 0) {
                            //add this info to the schema
                            schema.push({
                                "key": k,
                                "type": v.type
                            })                            
                        }
                        dArray.push({
                            "key": k,
                            "type": v.type,
                            "value": v.value ? v.value : "",
                        })
                    }
                    count = count + 1
                    dataArray.push(dArray)
                })                                
            }

            objArray.push({
                "key": key,
                "type": value.type,
                "value": value.value ? value.value : "",
                "schema": schema,
                "data": dataArray
            })
        }

        context.commit('UPDATE_PAIRS', objArray)
        context.commit('UPDATE_INIT_PAIRS', JSON.parse(JSON.stringify(objArray)))

    },
    revertPairs(context) {
        context.commit('UPDATE_PAIRS', JSON.parse(JSON.stringify(context.state.initPairs)))
    },
    async saveJson(context) {
        let json = new Object()
        context.state.pairs.forEach(element => {
            if(element.key.length) {
                if(element.type == 'collection') {
                    
                    let collectionData = new Array()
                    element.data.forEach(dataArray => {
                        let cDataInner = new Object()
                        dataArray.forEach(d => {
                            cDataInner[d.key] = {
                                type: d.type,
                                value: d.value
                            }
                        })
                        collectionData.push(cDataInner)
                    })

                    json[element.key] = {
                        type: element.type,
                        data: collectionData,
                    }

                } else {
                    json[element.key] = {
                        type: element.type,
                        value: element.value
                    }
                }
            }
        })
        await this.$axios.patch('/user/setDB', {
            json: json
        })
        context.commit('UPDATE_INIT_PAIRS', JSON.parse(JSON.stringify(context.state.pairs)))
    },
    async updateSchemaMode(context) {
        let val = !context.state.auth.user.schemaMode
        context.commit('UPDATE_COLLECTION_MODE', val)
        this.$axios.patch('/user/setSchemaMode/' + (val ? '1' : '0'))
    },
    async updateKey(context, {index, val, l, l1}) {
        if(l == 1) {
            context.commit('UPDATE_KEY', {index, val})
        } else {
            context.commit('UPDATE_COLLECTION_KEY', {index, val, l1})
        }
    },
    async updateType(context, {index, val, l, l1}) {
        if(l == 1) {
            context.commit('UPDATE_TYPE', {index, val})
        } else {
            context.commit('UPDATE_COLLECTION_TYPE', {index, val, l1})
        }
    },
    async updateValue(context, {index, val}) {
        context.commit('UPDATE_VALUE', {index, val})
    },
    async updateCollectionData(context, {index, val}) {
        context.commit('UPDATE_COLLECTION_DATA', {index, val})
    },
    async deleteCollectionData(context, { index, l1 }) {
        context.commit('DELETE_COLLECTION_DATA', { index, l1 })
    },
    addPair(context, {newPair, l1}) {
        context.commit('ADD_NEW_PAIR', {newPair, l1})
    },
    removePair(context, {index, l1}) {
        context.commit('REMOVE_PAIR', {index, l1})
    },
    addContentRow(context, {l1, val}) {
        context.commit('ADD_CONTENT_ROW', {l1, val})
    }

}

export const getters = {
    isLoggedIn(state) {
        return state.auth.loggedIn
    },
    pairs(state) {
        return state.pairs
    },
    initPairs(state) {
        return state.initPairs
    },
    schemaMode(state) {
        return state.auth.user.schemaMode
    }
}