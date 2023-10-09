import * as THREE from 'three';
import { Uint8ClampedBufferAttribute } from 'three';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200.0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const ticks = [];

const addCube = (size, x, y, z, col, rspd) => {
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial( { color: col } );
    const cube = new THREE.Mesh(geo, mat);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    scene.add(cube);

    ticks.push(dT => {
        cube.rotation.x += dT * rspd;
        cube.rotation.y += dT * rspd;
    });
};

addCube(1, -1, 0, 0, 0xeeaa22, 1);
addCube(0.3, 2.5, 0, 0, 0x22cccc, -1.5);

const ambient = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambient)

const light = new THREE.PointLight(0xffffff, 200);
light.position.set(-10, 5, 10);
scene.add(light);

cam.position.z = 5;


let lastFrameTime;
function animate(now) {
	requestAnimationFrame( animate );
    if (lastFrameTime === undefined) {
        lastFrameTime = now;
        return;
    }
    const dT = (now - lastFrameTime) * 0.001;
    lastFrameTime = now;

    for (const tick of ticks) {
        tick(dT);
    }

	renderer.render( scene, cam );
}
animate();
