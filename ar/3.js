import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer({ antialias: true });

function init_camera() {
    camera.fov = 75;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.z = 5;  
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
}

function init_renderer() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.xr.enabled = true;
}

function init_lights() {
    const ambientLight = new THREE.AmbientLight( new THREE.Color('#404040') );
    scene.add( ambientLight );

    const hemisphereLight = new THREE.HemisphereLight( new THREE.Color('#ffffbb'), new THREE.Color('#080820'), 1 );
    scene.add( hemisphereLight );

    const directionalLight = new THREE.DirectionalLight( new THREE.Color('#fff'), 0.5 );
    scene.add( directionalLight );
}

function init_cube() {
    const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    const material = new THREE.MeshStandardMaterial( { color: new THREE.Color('#00ff00') } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.set(0, 0, -0.5);
}

function init_arButton() {
    document.body.appendChild(ARButton.createButton(renderer));
}

function render(){
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

init_camera();
init_renderer();
init_lights();
init_cube();
init_arButton();
window.addEventListener('resize', onWindowResize);
renderer.setAnimationLoop(render);