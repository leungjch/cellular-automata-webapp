import React from 'react'
import { render } from 'react-dom'
import HTML2React from 'html2react'

const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Cellular</title>
  <link rel="stylesheet" href="styles.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>

  <!-- <script src="js/pixi.min.js"></script> -->
  <script src="js/p5.js"></script>

  <script src="js/three/build/three.min.js"></script>
  <script src="js/FileSaver.js-2.0.2/src/FileSaver.js"></script>
  <script src="js/ccapture/CCapture.js"></script>
  <script src="js/ccapture/webm-writer-0.2.0.js"></script>
  <script src="js/ccapture/download.js"></script>
  <script src="js/ccapture/gif.js"></script>

  <!-- <script type="module" src="js/three/examples/jsm/controls/OrbitControls.js"></script> -->
</head>

<body>
<!-- https://codepen.io/cristinaconacel/pen/NOLEyy -->
<div class = "container">
    <div class = "row">
      <div class="col-lg">
          <h1>Cellular Automata Explorer</h1>
      </div> 
    <div>
    
    <!-- Put playback controls here -->
    <div class = 'row'>
      <div class = 'col'>
          <button type = "button" id="beginning" class = "btn btn-dark btn-lg"> 
              <img src="icons/last_page-white-24dp.svg" aria-hidden="true">
          </button>
          <button type = "button" id="back_one" class = "btn btn-dark btn-lg" > 
              <img src="icons/arrow_back-white-24dp.svg" aria-hidden="true">
          </button>
          <button type = "button" id="play_pause" class = "btn btn-dark btn-lg"> 
              <img src="icons/pause-white-24dp.svg" id="pause_play_button" aria-hidden="true">
  
          <button type = "button" id = "forward_one" class = "btn btn-dark btn-lg"> 
              <img src="icons/arrow_forward-white-24dp.svg" aria-hidden="true">
          </button>
          <button type="button" id = "reset_button" class="btn btn-outline-danger">Clear</button>
          <button type="button" id = "random_button" class="btn btn-outline-danger">Randomly populate with probability</button>
          <input class="form-control" id="seed_probability" max=1.00 min = 0 .00 value=0.5 step = 0.05 type="number">


          <div class="container">
              <p>Framerate: <span id = "checkFpsCap_text"></span></p>
              <input type="range" min="1" max="120" value="120" class="slider" id="fpsSlider"  >
          </div>

      </div>
      <div class = 'col'>

        <p> History </p>
        <input type="range" min="0" max="300" value="0" class="slider" id="historySlider">
        <p>Iteration: <output id = "iterationNum"></output></p>

      </div>

    </div>


    <!-- Put Pixi.js here -->
    <div id = "p5sketch" class="row">
      <!-- <canvas id = "mycanvas" width = "1000" height = "1000"> </canvas> -->
    </div>


    <!-- Put settings column here -->
    <div class="row">
        <div class = "col">

          <!-- Adjust grid -->
          <div class="form-group row">
            <form onsubmit="return false">
                <!-- <div class="col-xs-2">
                  </div> -->
                  <div class="col-xs-3">
                      <label for="ex1">Grid length</label>
                      <input class="form-control" id="gridwidth" value=64 type="number" required>  
                    <label for="ex2">Grid height</label>
                    <input class="form-control" id="gridheight" value=64 type="number" required>
                    <label for="wrap_around"> Wrap edges </label> <input type="checkbox" id="wrap_around" checked>

                  </div>

                  <button type="submit" id = "set_size" class="btn btn-primary" >Apply</button>
            </form>

          </div>
          <!-- Display -->
          <!-- <div class="form-group row">
            <div class="col-xs-2">
              <label for="ex1">Tile Roundness</label>
              <input class="form-control" id="tileroundness" value=0 type="number", onchange=set_tile_graphics()>
            </div>
            <div class="col-xs-3">
              <label for="ex2">Tile Spacing</label>
              <input class="form-control" id="tilespacing" value=0 type="number", onchange=set_tile_graphics()>
            </div>
          </div> -->

      </div>
      <!-- Rule settings -->
      <div class = "col">
          <!-- Preset dropdown menu -->
          <p> Rule Preset</p>
          <select class="selectpicker" id="rules_dropdown"">
              <!-- <option>Conway's Game of Life</option>
              <option>Brian's Brain</option>
              <option>MoreLife</option> -->
            </select>
                

            <label for="ex2">Neighbors for Survival</label>
            <input class="form-control" id="alive_rule" value="2,3" type="text" required pattern = "^[0-9]+(?:-[0-9]+)?(,[0-9]+(?:-[0-9]+)?)*$">
            <label for="ex1">Neighbors for Birth</label>
            <input class="form-control" id="birth_rule" value="3" type="text">

            <!-- Rules -->
            <!-- Neighborhood -->
            <!-- <p> Neighborhood Type </p>
            <select class="selectpicker" selection="Moore">
                <option>Moore (3x3 square) </option>
                <option>Von Neumann (3x3 cross) </option>
                <option>Custom</option>
              </select> -->

              <div class="col-xs-3">
                  <label for="ex2">States (minimum 2) </label>
                  <input class="form-control" id="nStates" value=2 type="number">
                </div>
            <button type="submit" class="btn btn-primary"  id = "set_rules">Set rules</button>

      </div>

      <div class = "col">
        <div class="form-group row">
            <form onsubmit="return false">
                <p> 3D Visualization </p>
                  <p> Generates a stacked 3D model of your system, with each horizontal slice representing a single iteration. </p>
                  <!-- Button trigger modal -->
                  <button type="button" id = "generate_model" class="btn btn-primary" data-toggle="modal" data-target="#model_modal">
                      Generate Stacked System
                    </button>
                </form>
          </div>
            <!-- <div class="form-group row"> 
                <p> Render video </p>
                <form onsubmit="return false">
                      <p> Converts the evolution of the system, from beginning to the end, into an animation. </p>
                      <button type="submit" class="btn btn-primary" id="recbutton" data-toggle="modal" data-target="#modal_video">Record from beginning</button>
                </form>
            </div> -->
      </div>

</div>

  <!-- Modal for video -->
  <div class="modal fade bd-example-modal-lg" id="modal_video" tabindex="-1" role="dialog" aria-labelledby="modal_video_label" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body" id="video_modal_div">
            <video id = "video"></video>
          </div>
          <div class="modal-footer">
            <button type="button" id = "close_video" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" id = "download_video" class="btn btn-primary">Download </button>
          </div>
        </div>
      </div>
    </div>
  
  <!-- Modal -->
  <div class="modal fade bd-example-modal-lg" id="model_modal" tabindex="-1" role="dialog" aria-labelledby="model_modal_label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <!-- <div class="modal-header">
          <h5 class="modal-title" id="model_modal_label">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div> -->
        <div class="modal-body">
          <canvas id = "three_canvas" width=800 height = 800></canvas> 
        </div>
        <div class="modal-footer">
          <span> Hold mouse click to rotate model, scroll to zoom. Made using three.js. </span>
          <button type="button" id = "close_generate_model" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" id = "export_to_obj" class="btn btn-primary">Export as .OBJ</button>
        </div>
      </div>
    </div>
  </div>
  

</div>

<script type = "module" src="js/cellular.js"></script>

</body>
</html>
`

render(
  <div>
    HTML2React(html)
  </div>,
  document.getElementById('root')
)