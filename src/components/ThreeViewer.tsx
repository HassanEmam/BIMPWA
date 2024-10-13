import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { TbTransform } from "react-icons/tb";

import React, { useEffect, useRef, useState } from "react";

const ThreeViewer = () => {
  const [ctxpointer, setCtxPointer] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);

  const items: ContextMenuItem[] = [
    { name: "Hide Selected", icon: <MdVisibilityOff /> },
    { name: "Show All", icon: <MdVisibility /> },
    { name: "Transform", icon: <TbTransform /> },
  ];

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setCtxPointer({ x: event.clientX, y: event.clientY });
    console.log("context menu", event.clientX, event.clientY);
    setShowContextMenu(true);
  };

  const canvasRef = useRef<HTMLDivElement>(null);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  const pickableObjects: THREE.Mesh[] = [];
  const originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } =
    {};
  const highlightedMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });

  const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x =
      ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    pointer.y =
      -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects: THREE.Intersection[] = raycaster.intersectObjects(
      scene.children,
      true
    );
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      console.log(intersectedObject, intersectedObject.name);
      pickableObjects.forEach((o: THREE.Mesh, i) => {
        if (intersectedObject && intersectedObject.name === o.name) {
          pickableObjects[i].material = highlightedMaterial;
        } else {
          pickableObjects[i].material = originalMaterials[o.name];
        }
      });

      // object.material.color.set(0xff0000);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    if (canvasRef.current.children.length > 0) return;
    const containerSize = canvasRef.current.getBoundingClientRect();
    console.log(containerSize);
    scene = new THREE.Scene();
    const gridHelper = new THREE.GridHelper(100, 100);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(containerSize.width, containerSize.height);
    canvasRef.current.appendChild(renderer.domElement);
    const token = localStorage.getItem("authToken");
    if (!token) return;
    const loader = new GLTFLoader();
    loader.requestHeader = { "Access-Control-Allow-Origin": "*" };
    loader.setRequestHeader({
      Authorization: token,
    });
    loader.load(
      "https://bim.constology.com/api/model/ca5527d9-209f-4ae0-ae84-57d8419e1db2",
      (model) => {
        scene.add(model.scene);
        model.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            pickableObjects.push(m);
            originalMaterials[m.name] = (m as THREE.Mesh).material;
          }
        });
        console.log(pickableObjects);
      }
    );

    // adding lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);

    // update camera position
    camera.position.z = 50;
    camera.position.y = 20;

    // adding orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;

    // raycaster

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    // resize the canvas when window is resized
    window.addEventListener("resize", () => {
      if (!canvasRef.current) return;
      const containerSize = canvasRef.current.getBoundingClientRect();
      console.log(containerSize);
      camera.aspect = containerSize.width / containerSize.height;
      camera.updateProjectionMatrix();
      renderer.setSize(containerSize.width, containerSize.height);
    });

    animate();
  }, []);

  return (
    <>
      <div
        onClick={handleMouseClick}
        className="flex-1 bg-slate-800"
        ref={canvasRef}
        onContextMenu={handleContextMenu}
      ></div>
      <ContextMenu
        setShow={setShowContextMenu}
        items={items}
        x={ctxpointer.x}
        y={ctxpointer.y}
        show={showContextMenu}
      />
    </>
  );
};

export default ThreeViewer;
