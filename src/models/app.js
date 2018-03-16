export default {
    namespace : 'app',
    state : {
        num: 0
    },
    reducers : {
        add(state, {payload}) {
            return ({...state,num:state.num + 1})
        },
        reduce(state,{payload}){
            return ({...state,num:state.num - 1})
        },
        reset(state,{payload}){
            return ({...state,num:0})
        }
    },
    effects : {
        *clear({payload},{select,put}){
            yield put({type:'app/reset'})
        }
    }
}
