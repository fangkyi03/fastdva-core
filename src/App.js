import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect} from './package/koajs/index'

class App extends Component {

  onButtonDown = () =>{
    this.props.dispatch({type:'app/add',payload:{sd:'adasda',d:10}})
  }

  render() {
    console.log('输出dispatch',this.props.dispatch);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.onButtonDown}>按钮点击事件</button>
        <li>{`D显示${this.props.d}`}</li>
      </div>
    );
  }
}

export default connect(['app'],({app})=>({...app}))(App)