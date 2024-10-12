import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import React, { useEffect, useRef } from "react";

const ThreeViewer: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (canvasRef.current.children.length > 0) return;
    const containerSize = canvasRef.current.getBoundingClientRect();
    console.log(containerSize);
    const scene = new THREE.Scene();
    const gridHelper = new THREE.GridHelper(100, 100);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(containerSize.width, containerSize.height);
    canvasRef.current.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      if (!canvasRef.current) return;
      const containerSize = canvasRef.current.getBoundingClientRect();
      console.log(containerSize);
      camera.aspect = containerSize.width / containerSize.height;
      camera.updateProjectionMatrix();
      renderer.setSize(containerSize.width, containerSize.height);
    });
    const loader = new GLTFLoader();
    loader.requestHeader = { "Access-Control-Allow-Origin": "*" };
    loader.setRequestHeader({
      Authorization:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Mjg3NDU0MDEsImlhdCI6MTcyODY1ODk5Niwic3ViIjoyfQ.jP5sQbXOhven-4-CrEiYt63uArdA8fXrF7onQAv8ZT0",
    });
    loader.load(
      "https://bim.constology.com/api/model/ca5527d9-209f-4ae0-ae84-57d8419e1db2",
      (model) => {
        scene.add(model.scene);
      }
    );
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);

    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    camera.position.z = 50;
    camera.position.y = 20;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div className="flex-1 bg-slate-800" ref={canvasRef}></div>;
};

export default ThreeViewer;
