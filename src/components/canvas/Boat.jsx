import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
const Boat = ({ isMobile }) => {
  const boat = useGLTF("./boat/scene.gltf"); // Update with the path to your boat model

  return (
    <mesh>
      <ambientLight intensity={0.4} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      <primitive
        object={boat.scene}
        scale={isMobile ? 0.03 : 0.04}
        position={isMobile ? [1, -1, 0.5] : [1, -1, 0]}
        rotation={[0, 4, (0 * Math.PI) / 2]}
      />
    </mesh>
  );
};

const BoatCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [5, 2, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0.5}
          />
          <Boat isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>

    </>
  );
};

export default BoatCanvas;
