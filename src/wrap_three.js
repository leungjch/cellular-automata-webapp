import * as THREE from './three/build/three.js';
require('./three/examples/js/controls/OrbitControls');
require("./three/examples/js/exporters/OBJExporter.js");

window.THREE = THREE; // THREE.OrbitControls expects THREE to be a global object


export default window.THREE;