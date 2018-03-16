import React from 'react';
import {storeShape} from '../utils/PropTypes';

export function createProvider(){
    class Provider extends React.PureComponent{

        constructor(props, context) {
          super(props, context)
          this.store = props.store;
        }

        getChildContext(){
            return {'store':this.store}
        }
        
        render(){
            return React.Children.only(this.props.children)
        }
    }

    Provider.childContextTypes = {
        'store':storeShape.isRequired
    }
    return Provider
}

export default createProvider()