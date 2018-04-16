import React, { Component } from 'react';

import './App.css';
import Output from './components/output'
import Select from './components/Controls/select'
import Text from './components/Controls/text'
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras:1,
      html: true,
      text:''
    }
  }

  componentWillMount(){
    this.getSampleText();
  }

  getSampleText(){
   const API_REQUEST = `http://hipsterjesus.com/api?paras=${this.state.paras}&html${this.state.html}`
    // API = 'http://hipsterjesus.com/api?paras='+this.state.paras+'&html'+this.state.html
    axios.get(API_REQUEST)
      .then((response) => {
        this.setState({text: response.data.text},  () => {
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      })
    }

    showHtml(x){
      this.setState({html: x}, this.getSampleText);
    }

    changeParas(number){
        this.setState({
          paras: number
        }, this.getSampleText)
    }

  render() {
    return (
      <div className="App container">
      <h1> ReactJS Sample Text Genrator </h1>
      <form className="form-inline">
          <div className="form-group">
            <label> Include HTML </label>
           <Select 
              value={this.state.html} 
              onChange={this.showHtml.bind(this)} />
          </div>
          <div className="form-group">
            <label> Paraghraphs </label>
            <Text 
              value={this.state.paras} 
              onChange={this.changeParas.bind(this)} />
          </div>
           
          
      </form>
           <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
