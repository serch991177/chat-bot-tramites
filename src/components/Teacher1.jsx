import {useRef,useState,useEffect} from  'react';
import { useGLTF,useAnimations } from "@react-three/drei";

const Teacher1 = ({animationIndex,...props}) =>{
    const group = useRef();    
    const {nodes,scene,animations} = useGLTF(`/models/Teacher1.glb`);    
    const {actions,names} = useAnimations(animations,group);    

    useEffect(() => {
      actions[names[animationIndex]].reset().fadeIn(0.5).play();
      //console.log("nodes.AvatarHead.morphTargetDictionary",nodes.AvatarHead.morphTargetDictionary);
      //nodes.AvatarHead.morphTargetInfluences[nodes.AvatarHead.morphTargetDictionary["mouthFunnel"]]=1;
      return () => {
          actions[names[animationIndex]].fadeOut(0.5);
      };        
    }, [animationIndex, actions, names]);

    useEffect(()=>{
      let timer;
      if (animationIndex === 1) {
        timer = setInterval(() => {          
          let aux = nodes.AvatarHead.morphTargetInfluences[nodes.AvatarHead.morphTargetDictionary["mouthFunnel"]];
          nodes.AvatarHead.morphTargetInfluences[nodes.AvatarHead.morphTargetDictionary["mouthFunnel"]]=aux===1?0:1;
        }, 250); // Actualiza el contador cada segundo (1000 ms)
      } else {
        clearInterval(timer);
        nodes.AvatarHead.morphTargetInfluences[nodes.AvatarHead.morphTargetDictionary["mouthFunnel"]]=0;
      }
      return () => clearInterval(timer);
    },[animationIndex]);
    
    console.log(names);


    return  (
        <group ref={group} {...props}>
            <primitive object={scene}/>
        </group>
    );
};
export default Teacher1;

useGLTF.preload(`/models/Teacher1.glb`);
