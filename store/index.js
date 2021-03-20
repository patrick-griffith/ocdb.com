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
    UPDATE_SCHEMA_MODE(state, value) {
        state.auth.user.schemaMode = value
    },
    UPDATE_PAIR_KEY(state, {index, val}) {
        state.pairs[index].key = val
    },
    UPDATE_PAIR_TYPE(state, {index, val}) {
        state.pairs[index].type = val
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
            objArray.push({
                "key": key,
                "type": value.type,
                "value": value.value
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
                json[element.key] = {
                    type: element.type,
                    value: element.value
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
        context.commit('UPDATE_SCHEMA_MODE', val)
        this.$axios.patch('/user/setSchemaMode/' + (val ? '1' : '0'))
    },
    async updatePairKey(context, {index, val}) {
        context.commit('UPDATE_PAIR_KEY', {index, val})
    },
    async updatePairType(context, {index, val}) {
        context.commit('UPDATE_PAIR_TYPE', {index, val})
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