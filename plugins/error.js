//Custom Exception Handler
export default ({$toast, $sentry, store}, inject) => {
    function catchError(e) {
        store.dispatch('stopLoading')        
        if(e.response && e.response.data && e.response.data.frontendMessage) {
            $toast.error(e.response.data.frontendMessage)
        } else {
            $toast.error("Something went wrong. Not sure what. Awkward.")
            console.log(e);
            $sentry.captureException(e);
        }
    }
    inject('catchError', catchError)
}