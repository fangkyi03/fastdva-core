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
<<<<<<< HEAD
        *clear({payload},{select,put}){
            const a = yield select(({app})=>({...app}))
            console.log('输出a',a)
            yield put({type:'app/add',payload})
=======
        *clear(xxx,{select}){
            const a = yield select(({app})=>({...app}))
            console.log('a',a)
>>>>>>> master
        }
    }
}
