"use client";
import { CameraControls, Environment, Gltf, OrbitControls,Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Teacher } from "./Teacher";
import Avatar3 from "./Avatar3";
import Teacher1 from "./Teacher1";
import { degToRad } from "three/src/math/MathUtils";
import { TypingBox } from "./TypingBox";
import { TypingBoxManfred } from "./TypingBoxManfred";
import { MessagesList } from "./MessagesList";
import React, { useState,useRef,useEffect  } from "react";

export const Experience = () => {
    const [focusedCharacter, setFocusedCharacter] = useState("Teacher1");
    const [animationIndex,setAnimationIndex] = useState(0);
    //const [typingBoxVisible, setTypingBoxVisible] = useState(true);
    const [typingBoxVisible, setTypingBoxVisible] = useState(false);
    const [typingBoxManfredVisible,setTypingBoxVisibleManfred] = useState(false);
    const childRef = useRef();

    const hideTypingBox = () => {
        setTypingBoxVisible(false);
    };
    const visibleTypingBox = () => {
        setTypingBoxVisible(true);
    };
    const changeAnimation = (ind) => {
        //console.log("vamos a cambiar la animacion");
        setAnimationIndex(ind);
    };
    const changeFocus = (character) => {
        setFocusedCharacter(character);
    };
    /*useEffect(() => {
        // Reproducir el audio cada 5 segundos
        const audioInterval = setInterval(() => {
          const audio_entrada = new Audio("/models/entrada.wav");
          audio_entrada.play();
    }, 10000);
        // Limpiar el intervalo cuando el componente se desmonte o actualice
       // return () => clearInterval(audioInterval);
    }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez, al montar el componente*/


    return (
        <>
            
            <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
                <TypingBoxManfred hideTypingBox={hideTypingBox} visibleTypingBox={visibleTypingBox} changeAnimation={changeAnimation}/>                
            </div>
            
            {typingBoxVisible && (
            <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
                <TypingBox hideTypingBox={hideTypingBox} visibleTypingBox={visibleTypingBox} changeAnimation={changeAnimation}/>                
            </div>
            )}
            <Canvas
                camera={{
                    //position:[0,0,0.0001],
                    position: [3, 0.5, 0.01], // Ajustar la posición de la cámara -2,-1.5,2
                    fov: 30, // Ajustar el campo de visión para enfocar a Teacher1
                }}  
            >
                <CameraManager/>
                <Environment preset="sunset" />
                <ambientLight intensity={0.8} color="pink" />
                {/*posicion del mensaje
                <Html position={[0.22,0.192,-3]} transform>
                    <MessagesList/>
                </Html>*/}
                <Html position={[0.22,-0.20,-4]} transform distanceFactor={0.5}>
                    <MessagesList visibleTypingBox={visibleTypingBox} changeAnimation={changeAnimation}/>
                </Html>
                {/*<Teacher 
                    teacher={"Claudia"} 
                    position={[-1,-1.5,-3]} 
                    scale={0.01} 
                    rotation-y={degToRad(20)}
                    animationIndex={animationIndex}
                    changeAnimation={changeAnimation}
                />*/}
                {/*<Linda ref={childRef}  position={[-1,-1.5,-3]}  scale={1}  rotation-y={degToRad(20)}  currentAnimation="Waiting" speakingSpeed={250}/>*/}
                <Teacher1         
                    //x,y,z
                    position={[-2,-1.5,0.5]} 
                    scale={1} 
                    rotation-y={degToRad(100)}
                    animationIndex={animationIndex}
                    changeAnimation={changeAnimation}
                />
                <Avatar3
                    position={[-1,-1.5,-3]} 
                    scale={1} 
                    rotation-y={degToRad(20)}
                    animationIndex={animationIndex}
                    changeAnimation={changeAnimation}   
                />
                
                <Gltf src="/models/Oficina.glb" position={[0.2,-1.7,-2]}/>
            </Canvas>
        </>
    );
};

const CameraManager = () =>{
    return (
        <CameraControls
            minZoom={1}
            maxZoom={3}
            polarRotateSpeed={-0.3} //reverse for natural effect
            azimuthRotateSpeed={-0.3} //reverse for natural effect
            mouseButtons={{
                left:1, //action rotate
                wheel:16, // action zoom
            }}
            touches={{
                one:32, //action touch rotate 
                two:512, //action touch zoom
            }}
        />
    );
};