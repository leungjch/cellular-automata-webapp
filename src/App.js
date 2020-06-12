import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import {cellular_sketch, reset_button, seed_random, set_size, set_history, set_history_back_one, iterate_once, toggle_play, set_fps, set_rules, set_rule_preset, generate_model} from './cellular.js'
// import './cellular.js'
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js"

import Select, { components } from "react-select";


// import configs from "./configs.js"
import './App.css';


import 'bootstrap-select'
require('bootstrap-select');
let configs = require("./configs_test.json")


const Option = props => {
  return (
    <components.Option {...props}>
      <div>{props.data.label} [{props.data.trait}] </div>
      <div style={{ fontSize: 12, textAlign: "left"}}> {props.data.sublabel}</div>
    </components.Option>
  );
};


class App extends React.Component {
  state = {
    selectedOption: null,
    isChecked: true,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    set_rule_preset(selectedOption['Alive_Rule'], selectedOption['Birth_Rule'], selectedOption['Max_State'])
  };
  handleChangeTime = function(){
    set_history(null,false,false)
  }
  toggleWrap = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }
  handleBackOne = function()
  {
    // todo
  }
  handleBeginningTime = function()
  {
    set_history(0, true, false);
  }

  
  render() {
    const { selectedOption } = this.state;

    return (
      // HTML
      <div className="App">

        <div className="container-fluid m-0 p-0">
          <nav className="navbar navbar-light bg-light  m-0 p-0">
            <a className="navbar-brand" href="#">Cellular Automata Explorer</a>
          </nav>
          <div className="row">
            <div className="col-sm-4 col-md-4 m-0 p-0">
              <div id="left" style={{margin:"1.5rem"}}>
                <div className="row">
                    <div className="col-4" id="gridcolumn">
                      <label htmlFor="gridWidth">Width</label>
                      <input type="range" className="custom-range" min="0" max="128" id="gridwidth"  onChange = {set_size} />

                      <label htmlFor="gridHeight">Height</label>
                      <input type="range" className="custom-range" min="0" max="128" id="gridheight" onChange = {set_size} />
                      <div className="d-flex flex-row">
                      <div className="p-2">
                        <label htmlFor="wrap_around"> Wrap edges </label>
                      </div>
                      <div className="p-2">
                        <input type="checkbox" id="wrap_around" onChange = {this.toggleWrap} checked = {this.state.isChecked} />
                      </div>
                      </div>

                      <div className="d-flex flex-row">
                        <div className="p-2">
                          <input type="range" className="custom-range" max="1.00" min="0.00" defaultValue="0.5" step="0.05" id="seed_probability"  />
                        </div>
                        <div className="p-2">
                        <button type="button" id = "random_button" className="btn btn-outline-success btn btn-block" onClick={seed_random}>Populate</button>
                        </div>
                      </div>


                        
                        <div className="mt-auto p-2">
                          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={reset_button}>Clear</button>
                        </div>


                    </div>
                  <div className="col-8" id="rulecolumn">
                    <p> Rule Preset</p>
                    <Select   defaultValue = {configs[0].options[0]} 
                              options={configs} 
                              components={{ Option }}   
                              onChange = {this.handleChange} 
                              id = "rules_dropdown"/>

                    {/* <Select options = {configs} /> */}

                    <label htmlFor="alive_rule">Neighbors for Survival</label>
                    <input className="form-control" id="alive_rule" defaultValue="2,3" type="text" required pattern="^[0-9]+(?:-[0-9]+)?(,[0-9]+(?:-[0-9]+)?)*$" />
                      <label htmlFor="birth_rule">Neighbors for Birth</label>
                      <input className="form-control" id="birth_rule" defaultValue="3" type="text" />


                      <label htmlFor="nStates">States (minimum 2) </label>
                      <input className="form-control" id="nStates" min="2" defaultValue="2" type="number" />
                      <button type="button" className="btn btn-primary btn-lg btn-block" id = "set_rules" onClick={set_rules}>Set rules</button>


                  </div>
                </div>
                    <div className='row' id="bottom">
                      <div className='col' id="bottomcolumn">

                        <input type="range" className="custom-range" min="0" max="1" id="historySlider" onChange = {this.handleChangeTime} onMouseUp = {this.handleChangeTime_end} />

                        <div className="d-flex flex-row">
                          <div className = "p2">
                          <button type="button" id="beginning" className="btn btn-dark btn-lg" onClick = {this.handleBeginningTime}></button>
                          </div>
                          <div className = "p2">
                          <button type="button" id="back_one" className="btn btn-dark btn-lg" onClick = {set_history_back_one}></button>
                          </div>
                          <div className = "p2">
                          <button type="button" id="play_pause" className="btn btn-dark btn-lg" onClick = {toggle_play}></button>
                          </div>
                          <div className = "p2">
                          <button type="button" id="forward_one" className="btn btn-dark btn-lg" onClick = {iterate_once}></button>
                          </div>
                          <div className = "p2">
                          <label htmlFor="fpsSlider">Speed (<span id="checkFpsCap_text"></span> fps) </label>
                        <input type="range" className="custom-range" min="0" max="120" defaultValue="120" id="fpsSlider" onChange={set_fps} />
                          </div>

                        </div> 

                     
                        <p>Generation: <output id="iterationNum"></output></p>



                        <div className="d-flex flex-row">
                      <div className="p-2">
                      <label htmlFor="generate_model"> 3D Visualization: Generates a stacked 3D model of your system, with each horizontal slice representing a single generation. </label>
                      </div>
                      <div className = "p-2">
                      <button type="button" id = "generate_model" className="btn btn-primary" data-toggle="modal" data-target="#model_modal" onClick={generate_model}>
                      Generate 3D Stacked System
                    </button>
                      </div>
                    </div>

                  {/* <!-- Button trigger modal --> */}

                      </div>

                    </div>
                  </div>
                </div>
                <div className="col">
                  <div id="sketch">
                    <P5Wrapper sketch={cellular_sketch} ></P5Wrapper>
                  </div>

                </div>
              </div>
              <nav className="navbar sticky-bottom navbar-light bg-light">
                <a className="navbar-brand" href="#">Sticky Footer</a>
              </nav>
            </div>
            <div className="modal fade bd-example-modal-lg" id="model_modal" tabindex="-1" role="dialog" aria-labelledby="model_modal_label" aria-hidden="true">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <canvas id = "three_canvas" width="800" height = "800"></canvas> 
                  </div>
                  <div className="modal-footer">
                    <span> Hold mouse click to rotate model, scroll to zoom. Made using three.js. </span>
                    <button type="button" id = "close_generate_model" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id = "export_to_obj" className="btn btn-primary">Export as .OBJ</button>
                  </div>
                </div>
            </div>

          </div>
</div>


          );
        }
      }
      
      
      export default App;
