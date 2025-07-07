import { useLoader } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Box3, Vector3 } from "three";

const GLBImageLoader = () => {
  const modelUrl =
    "https://3d-images-renderer.s3.ap-south-1.amazonaws.com/1751904684169-car_glb.glb";

  const gltf = useLoader(GLTFLoader, modelUrl);
  const modelRef = useRef();

  // ✅ Center model and optionally scale it
  useEffect(() => {
    if (gltf.scene && modelRef.current) {
      const box = new Box3().setFromObject(gltf.scene);
      const center = new Vector3();
      box.getCenter(center);
      modelRef.current.position.sub(center); // Center the model

      // Optional: Scale if it's too large or too small
      // const size = box.getSize(new Vector3()).length();
      // const scale = 5 / size;
      // modelRef.current.scale.setScalar(scale);
    }
  }, [gltf]);

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[1, 1, 1]} // You can reduce this to [0.5, 0.5, 0.5] if model is big
    />
  );
};

export default GLBImageLoader;
