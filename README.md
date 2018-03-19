## 初始化部分
<code>

      import {createStore,Provider} from './package/fastkit-dva'
      import appModels from './models/app'
      const app = createStore({})
        app.model(appModels)
        const AppView = () => {
            return (
                <Provider store={app}>
                    <App/>
                </Provider>
            )
        }
</code>
这里是初始化的部分代码 之后会与dva尽可能的保持一致 在后续版本会进行修改

##connect部分
<code>

    export default connect(['app'],({app})=>({...app}))(App)
</code>

这里其余字段都与react-redux保持一致 但是首字段加了一个modelList
这个字段的作用就是为了能够更好的进行监听 比如上面的app
也就是说 我只会监听app这个model中的state发生的变化 其他的reduce变化 不会触发这个页面的监听回调

##connect初始化监听部分
<code>

          /**
          * 初始化监听
          * 
          * @memberof Connect
          */
          initSubscribe = () =>{
              modelList.forEach((e)=>{
                  this.timestamp.push(Date.parse(new Date()))
                  this.store.callBackList[e][String(this.timestamp.slice(-1)[0])] = this.onStateChange
              })
          }
</code>
在这里会直接对指定modelName去添加一个callBack 并且名字使用时间戳的方式来实现 避免出现重复命名
这个时间戳将会在组件被销毁的时候被使用到

##connect组件销毁
<code>

        /**
         * 如果页面被销毁则清除掉原来的监听事件 减少计算
         * 
         * @memberof Connect
         */
        componentWillUnmount = () => {
            modelList.forEach((e)=>{
                this.timestamp.forEach((el)=>{
                    if (this.store.callBackList[e][el]){
                        delete this.store.callBackList[e][el]
                    }
                })
            })
        };
</code>
当组件被销毁的时候 会从当前modelName的callBack回调中去删除属于当前页面的回调 避免下次在触发dispatch的时候 重新参与运算


##model部分
<code>

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
          *clear({payload},{select,put}){
              const a = yield select(({app})=>({...app}))
              console.log('输出a',a)
              yield put({type:'app/add',payload})
          }
      }
    }
</code>
这里的使用方式跟dva保持了一致 因为是直接使用的saga来进行的实现 所以saga的一些功能与属性都可以直接的进行使用 不会有影响
这里打算加一个类似react batchUpdate的功能 就是等整个effect被执行完以后才去触发页面的更新 来尽量的避免重复的reneder


现在这个项目还不够成熟 目前的这个版本删除了中间件 下一个版本将会用redux中间件的方式去将dispatch进行合并 但是只会支持saga与router这两个 尽可能去减少项目中不必要的reduce从来提升性能吧 真的是有得必有失啊