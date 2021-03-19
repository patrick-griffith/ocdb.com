export const state = () => ({
    _currentUser: null,
    _token: null,
    toast: null,
    isLoading: false
})

export const mutations = {
    UPDATE_LOADING(state, value) {
        state.isLoading = value
    },    
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
}

export const getters = {
    isLoggedIn(state) {
        return state.auth.loggedIn
    },
}