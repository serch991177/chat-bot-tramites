"use client";
import { CameraControls, Environment, Gltf, OrbitControls,Html } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
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
    const [typingBoxManfredVisible,setTypingBoxVisibleManfred] = useState(true);
    const childRef = useRef();
    
    /* ver las funciones para mover la camara a futuro
    const controlsRef = useRef();
    const [cameraPosition, setCameraPosition] = useState([3, 0.5, 0.01]);
    useEffect(() => {
        // Update the camera position in the effect to trigger re-render
        console.log("Camera position updated:", cameraPosition);
    }, [cameraPosition]);
    const handleButtonClick = () => {
        console.log("click");
        // Actualizar la posición de la cámara al hacer clic en el botón
        setCameraPosition([0, 0, 0],()=>{
            console.log("Camera position updated and re-render triggered");
        });
    };
    */   
    const hideTypingBox = () => {
        setTypingBoxVisible(false);
    };
    const visibleTypingBox = () => {
        setTypingBoxVisible(true);
    };
    const hideTypingBoxManfred = () =>{
        setTypingBoxVisibleManfred(false);
    }
    const visibleTypingBoxManfred = () =>{
        setTypingBoxVisibleManfred(true);
    }
    const changeAnimation = (ind) => {
        //console.log("vamos a cambiar la animacion");
        setAnimationIndex(ind);
    };
    const changeFocus = (character) => {
        setFocusedCharacter(character);
    };
    
    
    
    return (
        <>

            {typingBoxManfredVisible &&(
            <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
                <TypingBoxManfred  hideTypingBox={hideTypingBox} visibleTypingBox={visibleTypingBox} hideTypingBoxManfred={hideTypingBoxManfred}  visibleTypingBoxManfred={visibleTypingBoxManfred} changeAnimation={changeAnimation}/>                
            </div>
            )}
            {typingBoxVisible && (
            <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
                <TypingBox hideTypingBox={hideTypingBox} visibleTypingBox={visibleTypingBox} hideTypingBoxManfred={hideTypingBoxManfred}  visibleTypingBoxManfred={visibleTypingBoxManfred} changeAnimation={changeAnimation}/>                
            </div>
            )}
            <Canvas 
                camera={{ 
                    position:[0,0,0.0001],
                    //position: [3, 0.5, 0.01], // Ajustar la posición de la cámara -2,-1.5,2
                    //fov: 30, // Ajustar el campo de visión para enfocar a Teacher1
                    //position: cameraPosition,
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
                    <MessagesList hideTypingBox={hideTypingBox} visibleTypingBox={visibleTypingBox} hideTypingBoxManfred={hideTypingBoxManfred}  visibleTypingBoxManfred={visibleTypingBoxManfred} changeAnimation={changeAnimation}/>
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
                    position={[1,-1.5,-3]} 
                    scale={1} 
                    rotation-y={degToRad(10)}
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
