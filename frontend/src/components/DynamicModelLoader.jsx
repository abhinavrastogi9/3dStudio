import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Box3, Vector3 } from "three";

const DynamicModelLoader = ({ publicUrl, type  }) => {
  const modelRef = useRef();
 if(type !=="obj" && type!=="glb") return ;
  const model = useLoader(type === "obj" ? OBJLoader : GLTFLoader, publicUrl);
  useEffect(() => {
    if (!modelRef.current) return;
    const object = type === "glb" ? model.scene : model;
    const box = new Box3().setFromObject(object);
    const center = new Vector3();
    box.getCenter(center);
    modelRef.current.position.sub(center); // Center the model
  }, [model]);

  return (
    <primitive
      ref={modelRef}
      object={type === "glb" ? model.scene : model}
      scale={[1, 1, 1]}
    />
  );
};

export default DynamicModelLoader;
