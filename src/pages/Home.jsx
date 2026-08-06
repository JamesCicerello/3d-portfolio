import { CameraControls } from "@react-three/drei";
import { Model } from "../models/Office";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Home = () => {
  const [started, setStarted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [insideComputer, setInsideComputer] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");

  // Intro panel state. It only begins after the visitor exits the monitor.
  const [hasExitedMonitor, setHasExitedMonitor] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [typedRole, setTypedRole] = useState("");
  const [introTypingComplete, setIntroTypingComplete] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [ambienceMuted, setAmbienceMuted] = useState(false);

  const cameraControlsRef = useRef(null);
  const audioContextRef = useRef(null);
  const officeAudioRef = useRef(null);
  const mouseClickRef = useRef(null);
  const introStartedRef = useRef(false);

  const promptText = "Click the monitor to begin";
  const introName = "James Cicerello";
  const introRole = "Software Engineer";

  const playMouseClick = () => {
    if (!mouseClickRef.current) {
      mouseClickRef.current = new Audio(
        "/sounds/universfield-computer-mouse-click-352734.mp3"
      );
    }

    mouseClickRef.current.currentTime = 0;
    mouseClickRef.current.play().catch(() => {});
  };

  const playTypingSound = () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 180;

    gain.gain.setValueAtTime(0.025, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.025
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.025);
  };

  const handleMonitorClick = async () => {
    playMouseClick();
    setShowPrompt(false);

    await cameraControlsRef.current?.setLookAt(
      0.7097174606374549,
      1.2468931707295787,
      -0.02023024856776258,
      0.5676887827577275,
      1.2438492699319328,
      -0.11881114920018307,
      true
    );

    setInsideComputer(true);
  };

  const handleExitComputer = async () => {
    playMouseClick();
    setInsideComputer(false);

    await cameraControlsRef.current?.setLookAt(
      4.8,
      1.8,
      4,
      0,
      1,
      0,
      true
    );

    setHasExitedMonitor(true);
    setShowPrompt(true);
  };

  const toggleOfficeAmbience = () => {
    playMouseClick();

    setAmbienceMuted((currentlyMuted) => {
      const nextMuted = !currentlyMuted;

      if (officeAudioRef.current) {
        officeAudioRef.current.muted = nextMuted;
      }

      return nextMuted;
    });
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (!insideComputer) return;

      if (event.deltaY > 15) {
        handleExitComputer();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [insideComputer]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && insideComputer) {
        handleExitComputer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [insideComputer]);

  // Existing bottom prompt typewriter.
  useEffect(() => {
    if (!showPrompt) {
      setTypedPrompt("");
      return undefined;
    }

    let index = 0;

    const interval = window.setInterval(() => {
      setTypedPrompt(promptText.slice(0, index + 1));
      playTypingSound();
      index += 1;

      if (index >= promptText.length) {
        window.clearInterval(interval);
      }
    }, 65);

    return () => window.clearInterval(interval);
  }, [showPrompt]);

  // Type the top-left introduction once, after the first monitor exit.
  useEffect(() => {
    if (!hasExitedMonitor || introStartedRef.current) return undefined;

    introStartedRef.current = true;
    setTypedName("");
    setTypedRole("");
    setIntroTypingComplete(false);

    let nameIndex = 0;
    let roleIndex = 0;
    let roleInterval;
    let roleDelay;

    const nameInterval = window.setInterval(() => {
      nameIndex += 1;
      setTypedName(introName.slice(0, nameIndex));
      playTypingSound();

      if (nameIndex >= introName.length) {
        window.clearInterval(nameInterval);

        roleDelay = window.setTimeout(() => {
          roleInterval = window.setInterval(() => {
            roleIndex += 1;
            setTypedRole(introRole.slice(0, roleIndex));
            playTypingSound();

            if (roleIndex >= introRole.length) {
              window.clearInterval(roleInterval);
              setIntroTypingComplete(true);
            }
          }, 65);
        }, 250);
      }
    }, 65);

    return () => {
      window.clearInterval(nameInterval);
      if (roleDelay) window.clearTimeout(roleDelay);
      if (roleInterval) window.clearInterval(roleInterval);
    };
  }, [hasExitedMonitor]);

  // Visitor-local live clock.
  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (officeAudioRef.current) {
        officeAudioRef.current.pause();
      }
    };
  }, []);

  return (
    <section className="relative h-screen w-full">
      {!started && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black px-6 font-mono text-white">
          <div className="w-full max-w-xl border-4 border-gray-600 p-8">
            <p className="mb-8 text-lg">James Cicerello Portfolio 2026</p>

            <p className="mb-8 text-yellow-300">
              DISCLAIMER: This experience is best viewed on a desktop or laptop
              computer.
            </p>

            <p className="mb-6">Click START to begin_</p>

            <div className="flex justify-center">
              <button
                onClick={async () => {
                  setStarted(true);

                  if (!audioContextRef.current) {
                    const AudioContextClass =
                      window.AudioContext || window.webkitAudioContext;
                    audioContextRef.current = new AudioContextClass();
                  }

                  if (audioContextRef.current.state === "suspended") {
                    await audioContextRef.current.resume();
                  }

                  await cameraControlsRef.current?.setLookAt(
                    4.8,
                    1.8,
                    4,
                    0,
                    1,
                    0,
                    true
                  );

                  if (!officeAudioRef.current) {
                    officeAudioRef.current = new Audio(
                      "/sounds/freesound_community-office-ambience-6322.mp3"
                    );
                    officeAudioRef.current.loop = true;
                    officeAudioRef.current.volume = 0.25;
                    officeAudioRef.current.muted = ambienceMuted;
                  }

                  await officeAudioRef.current.play().catch(() => {});
                  setShowPrompt(true);
                }}
                className="border-4 border-gray-600 px-6 py-3 font-bold transition hover:bg-white hover:text-black"
              >
                START
              </button>
            </div>
          </div>
        </div>
      )}

      {hasExitedMonitor && !insideComputer && (
        <div className="absolute left-6 top-6 z-40 font-mono text-white sm:left-8 sm:top-8">
          <div className="animate-[introFade_.45s_ease-out]">
            <div className="mb-1 w-fit min-w-[15rem] bg-black px-4 py-2 text-lg shadow-lg">
              {typedName}
              {!typedRole && !introTypingComplete && (
                <span className="animate-pulse">_</span>
              )}
            </div>

            {typedRole && (
              <div className="mb-1 w-fit min-w-[15rem] bg-black px-4 py-2 text-base shadow-lg">
                {typedRole}
                {!introTypingComplete && (
                  <span className="animate-pulse">_</span>
                )}
              </div>
            )}

            {introTypingComplete && (
              <div className="flex w-fit min-w-[15rem] items-center justify-between gap-5 bg-black px-4 py-2 text-sm shadow-lg">
                <span>
                  {clock.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>

                <button
                  type="button"
                  onClick={toggleOfficeAmbience}
                  aria-label={
                    ambienceMuted
                      ? "Unmute office ambience"
                      : "Mute office ambience"
                  }
                  title={
                    ambienceMuted
                      ? "Unmute office ambience"
                      : "Mute office ambience"
                  }
                  className="cursor-pointer border-0 bg-transparent p-0 text-lg text-white transition-transform hover:scale-110"
                >
                  {ambienceMuted ? "🔇" : "🔊"}
                </button>
              </div>
            )}
          </div>

          <style>{`
            @keyframes introFade {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}

      {showPrompt && !insideComputer && (
        <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-40 text-center font-mono text-lg text-black">
          {typedPrompt}
          <span className="animate-pulse">_</span>
        </div>
      )}

      <Canvas shadows camera={{ position: [7, 4, 10], fov: 39 }}>
        <ambientLight intensity={0.5} />

        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.5}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-radius={6}
        />

        <Suspense fallback={<Loader />}>
          <Model
            rotation={[0, Math.PI / 2, 0]}
            onMonitorClick={handleMonitorClick}
            onExitComputer={handleExitComputer}
            insideComputer={insideComputer}
            started={started}
          />
        </Suspense>

        <CameraControls
          ref={cameraControlsRef}
          enabled={false}
          minDistance={4.8}
          maxDistance={4.8}
          truckSpeed={0}
          dollySpeed={0}
        />

        {/*
        <EffectComposer>
          <Bloom
            intensity={0.12}
            luminanceThreshold={0.99}
            luminanceSmoothing={0.02}
          />
        </EffectComposer>
        */}
      </Canvas>
    </section>
  );
};

export default Home;
