(function (win) {
  'use strict';

  var T = win.THREE;

  var width = win.innerWidth;
  var height = win.innerHeight;
  var fov = 90;
  var aspect = width / height;

  // Renderer
  var scene = new T.Scene();
  var renderer = new T.CSS3DRenderer({
    alpha: true,
    antialias: true,
    logarithmicDepthBuffer: true,
  });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // Camera
  var camera = new T.PerspectiveCamera(fov, aspect, 0.1, 1000);
  camera.position.set(20, 20, 200);
  scene.add(camera);
  var controls;
  if (typeof window.orientation !== 'undefined') {
    controls = new T.DeviceOrientationControls(camera, true);
  } else {
    controls = new T.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
  }

  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/ZEPq0FvFm3g';
  iframe.width = 400;
  iframe.height = 300;
  var css3do = new T.CSS3DObject( iframe );

  scene.add(css3do);


  var animate = function () {
    css3do.lookAt(camera.position);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width / height;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  };
}(window));