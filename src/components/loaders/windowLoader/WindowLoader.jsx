import "./WindowLoader.css";

export default function WindowLoader() {
  return (
    <div className="absolute top-0 left-0 bg-white w-full h-dvh flex flex-col items-center justify-center gap-4 z-100">
      <div className="loader"></div>
      <span className="loader-2">Loading</span>
    </div>
  );
}
