import React from 'react';
import {storeShape} from '../utils/PropTypes'
import invariant from 'invariant';

export function createConnect(
    modelList = [],
    mapStateToProps, 
    mapDispatchToProps, 
    mergeProps,
    {
        pure = true,
        withRef = false
    } = {}
){
    class Connect extends React.PureComponent{

        constructor(props,context) {
            super(props,context);
            this.store = context.store
            this.storeState = this.store.getState()
            this.timestamp = []
        }
        
        
        componentWillMount() {
            invariant(modelList.length > 0,'请输入你要监听改变的model 这是必输项')
            invariant(typeof mapStateToProps == 'function','mapStateToProps必须为一个function')
            this.initSubscribe()
        }
        
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

        /**
         * state发生变化点击事件
         * 
         * @memberof Connect
         */
        onStateChange = () =>{
            this.forceUpdate()
        }

        /**
         * 添加扩展props属性
         * 
         * @memberof Connect
         */
        addExtraProps = () =>{
            return mapStateToProps(this.storeState)
        }

        render(){
            return (
                React.Children.only(React.cloneElement(this.props.children,{dispatch:this.context['store'].dispatch,...this.addExtraProps()}))
            )
        }
    }
    Connect.contextTypes = {
        'store':storeShape.isRequired
    }

    return (View) => () => {
        return (
            <Connect>
                <View></View>
            </Connect>
        )
    }
}

export default createConnect