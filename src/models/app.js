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
        *clear(xxx,bbb){
            console.log('输出aaa',xxx,bbb)
        }
    }
}
