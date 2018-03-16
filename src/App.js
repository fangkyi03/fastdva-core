import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect} from './package/fastkit-dva';

class App extends Component {

  /**
   * 添加按钮被按下
   * 
   * @memberof App
   */
  onButtonAdd = () =>{
    this.props.dispatch({type:'app/add'})
  }

  /**
   * 减少按钮被按下
   * 
   * @memberof App
   */
  onButtonReduce = () =>{
    this.props.dispatch({type:'app/reduce'})
  }

  /**
   * 重置按钮被按下
   * 
   * @memberof App
   */
  onButtonClear = () =>{
    this.props.dispatch({type:'app/clear'})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.onButtonReduce}>减少被按下</button>
        <button onClick={this.onButtonAdd}>增加被按下</button>
        <button onClick={this.onButtonClear}>重置按钮被按下</button>
        <li>{`D显示${this.props.num}`}</li>
      </div>
    );
  }
}

export default connect(['app'],({app})=>({...app}))(App)