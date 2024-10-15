import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { TransformControls } from "three/addons/controls/TransformControls.js";

interface Model {
  name: string;
  public_id: string;
}

const ThreeViewer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  // const [selectedObject, setSelectedObject] = useState<string | null>(null);
  // const [transformObject, setTransformObject] = useState<boolean>(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const authorization = localStorage.getItem("authToken");
  console.log(authorization);

  const pickableObjects: THREE.Mesh[] = [];
  const originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } =
    {};
  const highlightedMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });

  useEffect(() => {
    if (projectId && authorization) {
      fetch(`https://bim.constology.com/api/model/p/${projectId}`, {
        headers: { Authorization: authorization },
      })
        .then((response) => response.json())
        .then((data) => setModels(data.data))
        .catch((error) => console.error("Error fetching models:", error));
    }
  }, [projectId, authorization]);

  useEffect(() => {
    if (selectedModel && viewerRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        viewerRef.current.clientWidth / viewerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      viewerRef.current.childNodes.forEach((child) =>
        viewerRef.current!.removeChild(child)
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        logarithmicDepthBuffer: true,
      });
      renderer.setSize(
        viewerRef.current.clientWidth,
        viewerRef.current.clientHeight
      );

      viewerRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // const transformControls = new TransformControls(
      //   camera,
      //   renderer.domElement
      // );
      // transformControls.setMode("translate");
      // scene.add(transformControls);

      // window.addEventListener("keydown", function (event) {
      //   switch (event.key) {
      //     case "g":
      //       transformControls.setMode("translate");
      //       break;
      //     case "r":
      //       transformControls.setMode("rotate");
      //       break;
      //     case "s":
      //       transformControls.setMode("scale");
      //       break;
      //     case "Esc":
      //       transformControls.detach();
      //       break;
      //   }
      // });

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const onClick = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const rect = viewerRef.current?.getBoundingClientRect();
        if (!rect) return;
        pointer.x = ((clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        pointer.y = -((clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          const intersectedObject = intersects[0].object;
          // transformControls.attach(intersectedObject);
          // scene.add(transformControls);
          // scene.add(transformControls);

          // setSelectedObject(intersectedObject.name);
          pickableObjects.forEach((o: THREE.Mesh, i) => {
            if (intersectedObject && intersectedObject.name === o.name) {
              pickableObjects[i].material = highlightedMaterial;
            } else {
              pickableObjects[i].material = originalMaterials[o.name];
            }
          });
        } else {
          // transformControls.detach();
        }
      };

      // transformControls.addEventListener("dragging-changed", function (event) {
      //   controls.enabled = !event.value;
      //   //dragControls.enabled = !event.value
      // });

      const loader = new GLTFLoader();
      loader.requestHeader = { "Access-Control-Allow-Origin": "*" };
      loader.setRequestHeader({
        Authorization: localStorage.getItem("authToken")!,
      });
      loader.load(
        `https://bim.constology.com/api/model/${selectedModel}`,
        (gltf) => {
          scene.add(gltf.scene);
          gltf.scene.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
              const m = child as THREE.Mesh;
              pickableObjects.push(m);
              originalMaterials[m.name] = (m as THREE.Mesh).material;
            }
          });
        },
        undefined,
        (error: Error) => console.error("Error loading model:", error)
      );

      // adding lights to the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(-5, 5, 5);
      scene.add(directionalLight);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect =
          viewerRef.current!.clientWidth / viewerRef.current!.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          viewerRef.current!.clientWidth,
          viewerRef.current!.clientHeight
        );
      };

      window.addEventListener("resize", onResize);
      viewerRef.current.addEventListener("click", onClick);

      return () => {
        window.removeEventListener("resize", onResize);
        viewerRef.current!.removeEventListener("click", onClick);
        scene.clear();
        renderer.dispose();
      };
    }
  }, [selectedModel, authorization]);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (contextMenuRef.current) {
      contextMenuRef.current.style.display = "block";
      contextMenuRef.current.style.left = `${event.clientX}px`;
      contextMenuRef.current.style.top = `${event.clientY}px`;
    }
  };

  const closeContextMenu = () => {
    if (contextMenuRef.current) {
      contextMenuRef.current.style.display = "none";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Model Viewer</h1>

      <select
        onChange={(e) => setSelectedModel(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select a model</option>
        {models.map((model) => (
          <option key={model.public_id} value={model.public_id}>
            {model.name}
          </option>
        ))}
      </select>

      <div
        ref={viewerRef}
        className="relative w-full h-[600px] border"
        onContextMenu={handleContextMenu}
        onClick={closeContextMenu}
      ></div>

      <div
        ref={contextMenuRef}
        className="absolute bg-white shadow-lg p-2 border rounded-md"
        style={{ display: "none" }}
      >
        <button
          onClick={() => {
            closeContextMenu();
          }}
          className="block p-2 hover:bg-gray-100 w-full text-left"
        >
          Hide Selected
        </button>
        <button
          onClick={() => {
            alert("button 1 is clicked");
            closeContextMenu();
          }}
          className="block p-2 hover:bg-gray-100 w-full text-left"
        >
          Wire Frame
        </button>
        <button
          onClick={() => {
            alert("button 1 is clicked");
            closeContextMenu();
          }}
          className="block p-2 hover:bg-gray-100 w-full text-left"
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default ThreeViewer;
