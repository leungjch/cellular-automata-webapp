import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import cellular_sketch from './cellular.js'
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';


class App extends React.Component {
  render (){
    return (
  // HTML
<div className="App">

  <div class="container-fluid m-0 p-0">
    <nav class="navbar navbar-light bg-light  m-0 p-0">
      <a class="navbar-brand" href="#">Cellular Automata Explorer</a>
    </nav>
    <div class="row">
      <div class="col-sm-4 col-md-4 m-0 p-0">
        <div id="left">
          <div class='col'>
          <button type="button" id="beginning" class="btn btn-dark btn-lg">

              {/* <img src="icons/last_page-white-24dp.svg" aria-hidden="true"> </img> */}
          </button>
          <button type="button" id="back_one" class="btn btn-dark btn-lg" >
              {/* <img src="icons/arrow_back-white-24dp.svg" aria-hidden="true"> </img> */}
          </button>
          <button type="button" id="play_pause" class="btn btn-dark btn-lg">
              {/* <img src="icons/pause-white-24dp.svg" id="pause_play_button" aria-hidden="true"> </img> */}
          </button>
          <button type="button" id="forward_one" class="btn btn-dark btn-lg">
              {/* <img src="icons/arrow_forward-white-24dp.svg" aria-hidden="true"> </img> */}
          </button>
          <button type="button" id="reset_button" class="btn btn-outline-danger">Clear</button>
          <button type="button" id="random_button" class="btn btn-outline-danger">Randomly populate with probability</button>
          <input class="form-control" id="seed_probability" max="1.00" min="0.00" value="0.5" step="0.05" type="number" />

          <div class="container">
              <p>Framerate: <span id="checkFpsCap_text"></span></p>
              <input type="range" min="1" max="120" value="120" class="slider" id="fpsSlider" />
          </div>

          </div>
          <div class='row'>

          <p> History </p>
            <input type="range" min="0" max="300" value="0" class="slider" id="historySlider" />
          <p>Iteration: <output id="iterationNum"></output></p>

          </div>
        </div>
      </div>
      <div class="col-sm-8 col-md-4 m-0 p-0">
        <div id="sketch">
        <P5Wrapper sketch={cellular_sketch} ></P5Wrapper>
        </div>

      </div>
    </div>
    <nav class="navbar sticky-bottom navbar-light bg-light">
      <a class="navbar-brand" href="#">Sticky Footer</a>
    </nav>
  </div>
</div>


    );
  }
}


export default App;
