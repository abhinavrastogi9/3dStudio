import { useLoader } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Box3, Vector3 } from "three";

const ObjImageLoader = () => {
  const modelUrl =
    "https://3d-images-renderer.s3.ap-south-1.amazonaws.com/1751904711084-FinalBaseMesh.obj";

  const model = useLoader(OBJLoader, modelUrl);
  const modelRef = useRef();

  // ✅ Center the model using bounding box
  useEffect(() => {
    if (model && modelRef.current) {
      const box = new Box3().setFromObject(model);
      const center = new Vector3();
      box.getCenter(center);
      modelRef.current.position.sub(center); // move model to origin

      console.log("✅ OBJ Center:", center);
      console.log("✅ OBJ Bounding Box:", box);
    }
  }, [model]);

  return (
    <primitive
      ref={modelRef}
      object={model}
    />
  );
};

export default ObjImageLoader;


//https://3d-images-renderer.s3.ap-south-1.amazonaws.com/1751904684169-car_glb.glb
//https://3d-images-renderer.s3.ap-south-1.amazonaws.com/1751904711084-FinalBaseMesh.obj
