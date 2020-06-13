import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import {cellular_sketch, reset_button, seed_random, set_size, set_history, set_history_end, set_history_back_one, iterate_once, toggle_play, set_fps, set_rules, set_rule_preset, generate_model} from './cellular.js'
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


const icons = require.context('../public/icons', true);


const imagesPath = {
  pause: "pause-white-24dp.svg",
  play: "play_arrow-white-24dp.svg"
}


class App extends React.Component {
  state = {
    selectedOption: null,
    isChecked: true,
    isPaused: false,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    set_rule_preset(selectedOption['Alive_Rule'], selectedOption['Birth_Rule'], selectedOption['Max_State'])
  };
  handleChangeTime = function(){
    set_history(null,false,false)
  }
  handleChangeTime_end = function(){
    set_history_end()
  }
  toggleWrap = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }
  handle_play = () => {
  
    this.setState({
      isPaused: !this.state.isPaused,
    });
    toggle_play();
    
  }
  getImageName = () => this.state.isPaused ? "pause" : "play"

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
    const pause_or_play = imagesPath[this.getImageName()];
    return (
      // HTML
      <div className="App">

        <div className="container-fluid m-0 p-0" id="entire_ui">
          <div className="row">
            <div className="col">
              <div id="left">
                <div className="row">
                    <div className="col-4" id="gridcolumn">
                      <label htmlFor="gridwidth">Width</label>
                      <input type="range" className="custom-range" min="0" max="128" id="gridwidth"  onChange = {set_size} />

                      <label htmlFor="gridheight">Height</label>
                      <input type="range" className="custom-range" min="0" max="128" id="gridheight" onChange = {set_size} />
                      <div className="d-flex flex-row justify-content-center">
                        <div className="p-2">
                          <label htmlFor="wrap_around"> Wrap edges </label>
                        </div>
                        <div className="p-2">
                          <input type="checkbox" id="wrap_around" onChange = {this.toggleWrap} checked = {this.state.isChecked} />
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-center">
                        <div className="p-2">
                          <input type="range" className="custom-range" max="1.00" min="0.00" defaultValue="0.1" step="0.05" id="seed_probability"  />
                        </div>
                        <div className="p-2">
                        <button type="button" id = "random_button" className="btn btn-outline-success btn btn-block" onClick={seed_random}>Populate</button>
                        </div>
                      </div>
                      <button type="button" id="reset_button" className="btn btn-primary btn-lg btn-block" onClick={reset_button}>Clear</button>
                    
                    </div>
                  <div className="col" id="rulecolumn">
                    <p> Rule Preset</p>
                    <Select   defaultValue = {configs[0].options[0]} 
                              options={configs} 
                              components={{ Option }}   
                              onChange = {this.handleChange} 
                              id = "rules_dropdown"/>

                    {/* <Select options = {configs} /> */}

                    <label htmlFor="alive_rule">Survival Rule</label>
                    <input className="form-control" id="alive_rule" defaultValue="2,3" type="text" required pattern="^[0-9]+(?:-[0-9]+)?(,[0-9]+(?:-[0-9]+)?)*$" />
                      <label htmlFor="birth_rule">Birth Rule</label>
                      <input className="form-control" id="birth_rule" defaultValue="3" type="text" />


                      <label htmlFor="nStates">States (minimum 2) </label>
                      <input className="form-control" id="nStates" min="2" defaultValue="2" type="number" />
                      <button type="button" className="btn btn-primary btn-lg btn-block" id = "set_rules" onClick={set_rules}>Set rules</button>


                  </div>
                </div>
                    <div className='row' id="bottom">
                      <div className='col' id="bottomcolumn">

                        <input type="range" className="custom-range" min="0" max="1" id="historySlider" onChange = {this.handleChangeTime} onMouseUp = {this.handleChangeTime_end} />

                        <div className="d-flex flex-row justify-content-center">
                          <div className = "p2">
                          <button type="button" id="beginning" className="btn btn-primary" onClick = {this.handleBeginningTime}>
                            <img src={icons("./beginning-white-24dp.svg")} alt="description of image"></img>
                          </button>
                          
                          </div>
                          <div className = "p2">
                          <button type="button" id="back_one" className="btn btn-primary" onClick = {set_history_back_one}>
                          <img src={icons("./arrow_back-white-24dp.svg")} alt="description of image"></img>
                          </button>
                          </div>
                          <div className = "p2">
                          <button type="button" id="play_pause" className="btn btn-primary" onClick={this.handle_play}>
                            <img src={icons(`./${pause_or_play}`)} alt="x"></img>
                          </button>
                          </div>
                          <div className = "p2">
                          <button type="button" id="forward_one" className="btn btn-primary" onClick = {iterate_once}>
                          <img src={icons("./arrow_forward-white-24dp.svg")} alt="description of image"></img>
                          </button>
                          </div>


                        </div> 
                        <div>
                          <label htmlFor="fpsSlider">Speed (<span id="checkFpsCap_text"></span> fps) </label>
                        <input type="range" className="custom-range" min="0" max="60" defaultValue="60" id="fpsSlider" onChange={set_fps} />
                          </div>
                     
                        <p>Generation: <output id="iterationNum"></output></p>



                        <div className="d-flex flex-row">
                      <div className="p-2">
                      <label htmlFor="generate_model"> 3D Visualization: Generates a stacked 3D model of your system, with each horizontal slice representing a single generation. </label>
                      </div>
                      <div className = "p-2">
                      <button type="button" id = "generate_model" className="btn btn-success btn-lg" data-toggle="modal" data-target="#model_modal" onClick={generate_model}>
                      Generate 3D Stacked System
                    </button>
                      </div>
                    </div>

                  {/* <!-- Button trigger modal --> */}

                      </div>

                    </div>
                  </div>
                </div>
            
            <div className="col" id="rightcol">
              <div className="row">
              <div class="vertical-center" id="sketch">
                <P5Wrapper sketch={cellular_sketch} ></P5Wrapper>
              {/* </div> */}
              </div>

              </div>

            {/* <div className="container-fluid" id ="hero"> */}
            </div>
          </div>
              {/* <nav className="navbar sticky-bottom navbar-light bg-light">
                <a className="navbar-brand" href="#">Sticky Footer</a>
              </nav> */}
          <div className="row">
            <div className="col" id="infobox">
            <h1> What is Cellular Automata? </h1>
            <p> Cellular Automata (CA) consists of a grid of squares called <em>cells</em>, each of which contain a finite number of <em>states</em>. 
            In binary-state cellular automata, a cell has two states, "dead" or "alive". 
            After each generation, if a cell contains a number of alive neighbor cells as specified by the <em>survival rule</em>, it will stay alive in the next generation. 
            Otherwise, it will die (or in the case for multi-state CA, lose one state). 
            For example, the famous Conway's Game of Life features a survival rule of "2,3" (an alive cell stays alive if it contains 2 or 3 neighbours, otherwise it dies), and a birth rule of "2" (a cell is born if it contains 2 neighbors), 
            Similarly, if a blank (dead) cell on the grid contains a number of alive neighbor cells as specified by the <em>birth rule</em>, an alive cell will be born in that location. 
            A cell is usually defined to be a neighbor to another cell if it is one of eight cells surrounding it (in a 3x3 square) - this is called a Moore neighborhood. 
            Alternatively, a von Neumann neighborhood defines a cell to be a neighbor if it is one of four cells directly adjacent to it (top, bottom, left, right).</p>

            <p>
            There is incredible complexity that arises as a result of these birth, survival, and state rules that define cellular automata. <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns">Conway's Game of Life contains a variety of "patterns", including <em>"still lifes"</em>, <em>"oscillators"</em>, and <em>"spaceships"</em> that one would not expect from its simple rules.</a> Conway's Game of Life has been proved to be Turing Complete, meaning that any computation that can be done by a traditional computer is possible to be done in the Conway's Game of Life given a specific initial configuration. In addition, Conway's Game of Life is just one of many rules that is possible in 2D Cellular Automata. Use the Rule Presets dropdown to see some - my personal favorite is "Star Wars".
            </p>
            <h1> Controls </h1>
              <ul>
                <li>
                  <b>Click</b> on the grid to place a new cell.
                </li>
                <li>
                  Use the <b>Rule Preset</b> dropdown to specify an interesting rule from a sample of Mirek Wójtowicz's rules collection (<a href = "http://psoup.math.wisc.edu/mcell/rullex_life.html">[Binary-state]</a>, <a href="http://psoup.math.wisc.edu/mcell/rullex_gene.html">[Multi-state]</a>).
                </li>
                <li>
                  Use the <b>Birth rule</b>, <b>Survival rule</b>, and <b>States</b> fields to specify a custom rule of your own. A valid survival and birth rule contains only single digit numbers (0-8) separated by commas (e.g. "1,3,5" means 1,3, or 5 neighbours)
                </li>

                <li>
                  Press the <b>Clear</b> button or <b>Q</b> to clear everything.
                </li>
                <li>
                  Press the <b>Populate</b> button to randomly populate the grid with a probability defined by the slider beside it (left - 0% populated, right - 100% populated). Moving the slider too far to the left or right will cause cells to die of loneliness or overpopulation.
                </li>
                <li>
                  Press <b>SPACE</b> to pause or play.
                </li>
                <li>
                  Press <b>Forward Arrow</b> to advance the system by one generation.
                </li>
                <li>
                  Press <b>Back Arrow</b> to reverse the system by one generation.
                </li>
                <li>
                  Control the <b> grid size </b> using the width and height sliders. Supports a maximum 128x128 cell grid.
                </li>
                <li>
                Go back in <b>time</b> using the time slider.
                </li>
                <li>
                  Control the <b>framerate (speed)</b> using the speed slider.
                </li>
                
              </ul>
            <h1> Info </h1>
            <p> Responsive UI created through React, and website styling with Bootstrap. Fast grid rendering using p5.js. 3D stacked visualisation created using three.js. Created by Justin Leung (June 2020). </p>
            <p> Credits to <a href="http://www.mirekw.com/ca/ca_rules.html">Mirek Wójtowicz</a> for his compilation and descriptions of interesting CA rules. </p>

            </div>
          </div>
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
