import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { UI } from './components/UI';
import { useHandTracking } from './hooks/useHandTracking';
import { DEFAULT_COLORS } from './constants';
import { ThemeColors, TreeState } from './types';

export default function App() {
  const { videoRef, isReady, pinchDistance, handPosition } = useHandTracking();
  const [colors, setColors] = useState<ThemeColors>(DEFAULT_COLORS);
  const [treeScale, setTreeScale] = useState(1.0);
  const [photoScale, setPhotoScale] = useState(1.0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [musicSrc, setMusicSrc] = useState<string>("https://upload.wikimedia.org/wikipedia/commons/e/e6/Kevin_MacLeod_-_Jingle_Bells.ogg");
  const [musicTitle, setMusicTitle] = useState("Christmas List - Anson Seabra"); // Default title
  
  // Determine target state based on pinch distance logic
  // < 0.2 means fingers are close (Pinching) -> TREE
  // > 0.2 means fingers are open -> SCATTERED
  const targetState = pinchDistance < 0.2 ? TreeState.TREE : TreeState.SCATTERED;

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          dpr={[1, 2]} 
          gl={{ 
            antialias: false, 
            toneMapping: 3, // THREE.ReinhardToneMapping
            toneMappingExposure: 1.5 
          }}
        >
          <Scene 
            colors={colors} 
            targetState={targetState} 
            handPosition={handPosition}
            treeScale={treeScale}
            photos={photos}
            photoScale={photoScale}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <UI 
        videoRef={videoRef} 
        isReady={isReady} 
        isPinched={targetState === TreeState.TREE}
        colors={colors}
        setColors={setColors}
        treeScale={treeScale}
        setTreeScale={setTreeScale}
        photoScale={photoScale}
        setPhotoScale={setPhotoScale}
        photos={photos}
        setPhotos={setPhotos}
        musicSrc={musicSrc}
        setMusicSrc={setMusicSrc}
        musicTitle={musicTitle}
        setMusicTitle={setMusicTitle}
      />
    </div>
  );
}