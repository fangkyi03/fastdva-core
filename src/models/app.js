export default {
    namespace : 'app',
    state : {
        a: 0
    },
    reducers : {
        add(state, {payload}) {
            return ({...state,...payload})
        }
    },
    effects : {
        *clear(xxx,{select}){
            const a = yield select(({app})=>({...app}))
            console.log('a',a)
        }
    }
}
