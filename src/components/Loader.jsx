import { Html } from '@react-three/drei'

const Loader = () => {
  return (
    <Html>
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />

        <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-cyan-300 border-r-purple-500 animate-spin shadow-[0_0_35px_rgba(59,130,246,0.55)]" />

        <div className="absolute w-8 h-8 rounded-full bg-cyan-300/70 blur-sm animate-pulse" />
      </div>

      <div className="text-center">
        <p className="text-white text-lg font-semibold tracking-[0.25em] uppercase">
          Loading Experience
        </p>

        <p className="mt-2 text-sm text-slate-400 animate-pulse">
          Initializing Portfolio...
        </p>
      </div>
    </div>
    </Html>
  );
};

export default Loader 