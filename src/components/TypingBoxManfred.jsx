import { useState, useEffect } from "react";
import { useAITeacher } from "@/hooks/useAITeacher";


export const TypingBoxManfred = ({hideTypingBox,changeAnimation,visibleTypingBox,hideTypingBoxManfred }) => {
  const askAI = useAITeacher((state) => state.askAI);
  const loading = useAITeacher((state) => state.loading);
  const [question, setQuestion] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Definir isLoading aquí
  const [audioInterval, setAudioInterval] = useState(null); // Declarar audioInterval como estado
  const [audioEntrada, setAudioEntrada] = useState(null); // Declarar audioEntrada como estado


  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "es";
    setIsSpeaking(true);

    recognition.onstart = () => {
      setIsSpeaking(true);
    };

    recognition.onend = () => {
      setIsSpeaking(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toUpperCase();
      const normalizedTranscript = normalizeText(transcript);
      setQuestion(normalizedTranscript);
    };

    recognition.start();
    };

    const ask = () => {
        // Detener la reproducción del audio si se está reproduciendo
        audioEntrada.pause();
        audioEntrada.currentTime = 0;
        clearInterval(audioInterval);
        setIsLoading(true);
        hideTypingBoxManfred();
        visibleTypingBox();
    };


    useEffect(() => {
        // Reproducir el audio cada 5 segundos
        const audio = new Audio("/models/entrada.wav");
        const intervalId = setInterval(() => {
            audio.play();
        }, 10000);
        // Guardar el ID del intervalo y el audio en el estado
        setAudioInterval(intervalId);
        setAudioEntrada(audio);
        // Limpiar el intervalo y pausar el audio cuando el componente se desmonta o actualiza
        return () => {
            clearInterval(intervalId);
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    /*useEffect(() => {
    return () => {
      setIsSpeaking(false);
    };
  }, []);*/
    useEffect(() => {
    // Cuando loading cambia a false (cuando finaliza el efecto de carga),
    // oculta el TypingBox
        if (!loading && isLoading) {
            setIsLoading(false);
            //hideTypingBox(); // Oculta el TypingBox
            hideTypingBoxManfred();
            visibleTypingBox();
        }
    }, [loading]);

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <div
        className="z-10 max-w-[600px] flex space-y-6 flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4 backdrop-blur-md rounded-xl border-slate-100/30 border"
        style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(to top right, rgba(79, 70, 229, 0.3), rgba(74, 85, 104, 0.3))",
            padding: "1rem",
            borderRadius: "1rem",
            border: "1px solid rgba(163, 175, 193, 0.3)"
        }}
        >
        <style>
            {`
            @keyframes pulse-ring {
                0% {
                transform: scale(0.33);
                }
                80%, 100% {
                opacity: 0;
                }
            }

            .microphone-speaking {
                animation: pulse-ring 1.25s cubic-bezier(0.2, 0.64, 0.82, 0.71) infinite;
            }
            `}
        </style>

        <div>
            <h2
            className="text-white font-bold text-xl"
            style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "bold" }}
            >
            Hola Bienvenido al chatbot de tramites de la alcaldia para empezar a preguntar haz click en el boton de abajo
            </h2>
        </div>

        {loading ? (
            <div className="flex justify-center items-center">
            <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
            </span>
            </div>
        ) : (
            <div className="gap-3 flex justify-center">
            
            <button
                className="bg-slate-100/20 p-2 px-6 rounded-full text-white"
                onClick={ask}
                style={{
                background: "rgba(255, 255, 255, 0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: "none",
                fontSize: "0.875rem",
                textAlign: "center", // Centrar el texto
                margin: "0 auto", // Ajustar los márgenes para centrar el botón
                }}
            >
                Inicar Chat 
            </button>
            </div>
        )}
        </div>
    );
};