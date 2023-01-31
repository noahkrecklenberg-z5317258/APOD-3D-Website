import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  // const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  // star.position.set(x, y, z);
  // scene.add(star);
}

// Array(200).fill().forEach(addStar);

// Background

const fornaxTexture = new THREE.TextureLoader().load('fornaxCluster.jpg');
scene.background = fornaxTexture;

// Avatar

const rocketTexture = new THREE.TextureLoader().load('rocket.png');

const rocket = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 3), new THREE.MeshBasicMaterial({ map: rocketTexture }));

scene.add(rocket);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 3;
moon.position.setX(-10);

// Falcon

const falconTexture = new THREE.TextureLoader().load('falcon.jpg')

const falcon = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 3), new THREE.MeshBasicMaterial({ map: falconTexture }));



scene.add(falcon)

falcon.position.z = 10
// falcon.position.setX(-10)

// infrared

const infraredTexture = new THREE.TextureLoader().load('infrared.jpeg')

const infrared = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 3), new THREE.MeshBasicMaterial({ map: infraredTexture }));

scene.add(infrared);
infrared.position.z = 22;

rocket.position.z = -5;
rocket.position.x = 2;

// cluster diagram

const diagramTexture = new THREE.TextureLoader().load('clusterDiagram.png')

const diagram = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 3), new THREE.MeshBasicMaterial({ map: diagramTexture }));

scene.add(diagram);
diagram.position.z = 27;
// diagram.position.x = 1;

// tune

const tuneTexture = new THREE.TextureLoader().load('class.jpeg')
const tune = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 3), new THREE.MeshBasicMaterial({map: tuneTexture}));
scene.add(tune)
tune.position.z = 36;
tune.position.setX(-1)
// tune.position.x = 0

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // falcon.rotation.x += 0.05;
  // falcon.rotation.y += 0.075;
  // falcon.rotation.z += 0.05;


  // rocket.rotation.y += 0.01;
  // rocket.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
