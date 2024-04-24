import {useRef,useState,useEffect} from  'react';
import { useAITeacher } from "@/hooks/useAITeacher";
import { useGLTF,useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const Teacher1 = ({animationIndex,changeAnimation, ...props}) =>{
    const group = useRef();    
    const  [animaciones,setAnimaciones] = useState([]);
    const {nodes,scene,animations} = useGLTF(`/models/Teacher1.glb`);    
    const {actions,names} = useAnimations(animations,group);    
    const currentMessage = useAITeacher((state) => state.currentMessage);
    const loading = useAITeacher((state) => state.loading);

    const lerpMorphTarget = (target,value,speed=0.01)=>{
      scene.traverse((child) => {
          if(child.isSkinnedMesh && child.morphTargetDictionary){
              const index =child.morphTargetDictionary[target];
              if(
                  index === undefined ||
                  child.morphTargetInfluences[index] === undefined
              ){
                  return;
              }
              child.morphTargetInfluences[index] = MathUtils.lerp(
                  child.morphTargetInfluences[index],
                  value,
                  speed
              );
          }
      });
    };

    useFrame(() =>{
      for(let i = 0;i<=21; i++){
          lerpMorphTarget(i,0,0.1);//reset morph targets
      }
      if(currentMessage && currentMessage.visemes && currentMessage.audioPlayer){
          for(let i = currentMessage.visemes.length - 1;i>=0;i--){
              const viseme = currentMessage.visemes[i];
              if(currentMessage.audioPlayer.currentTime * 1000 >= viseme[0]){
                  lerpMorphTarget(viseme[1],1,0.2);
                  break;
              };
          };
      }
    });

    useEffect(() => {
      setAnimaciones(names);
    }, [names]);

    useEffect(() => {
      if (names.length > 0 && animationIndex >= 0 && animationIndex < names.length) {
          actions[names[animationIndex]].reset().fadeIn(0.5).play();
          return () => {
              actions[names[animationIndex]].fadeOut(0.5);
          };
      }
    }, [animationIndex, actions, names]);

    useEffect(() => {
        if (loading) {
            changeAnimation(2);
          //console.log("pensando");
        } else if (currentMessage) {
            changeAnimation(1);
          //console.log("hablar")
          //setAnimation(randInt(0, 1) ? "Talking" : "Talking2");
        } /*else {
            console.log("nose");
          //setAnimation("Idle");
        }*/
    }, [currentMessage, loading]);

    useEffect(() => {
        if (!currentMessage && !loading) {
            changeAnimation(2);
            //console.log("Terminó de hablar");
        }
    }, [currentMessage, loading]);

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
      <group ref={group}  {...props}>
        <primitive object={scene}/>
      </group>
    );
};
export default Teacher1;

useGLTF.preload(`/models/Teacher1.glb`);
