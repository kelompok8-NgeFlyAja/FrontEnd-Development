import { useEffect, useState } from "react";

const Loading = ({ loading }) => {
  const [progress, setProgress] = useState(35);
  const [imagePosition, setImagePosition] = useState(0);

  useEffect(() => {
    let timer;

    if (loading) {
      setProgress(100);
      setImagePosition(100);
    } else {
      timer = setInterval(() => {
        setProgress((currentProgress) => (currentProgress >= 130 ? 35 : currentProgress + 0.95));
        setImagePosition((currentPosition) => (currentPosition >= 100 ? 0 : currentPosition + 1));
      }, 100);
    }

    return () => clearInterval(timer);
  }, [loading]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center min-h-[50vh]">
        <p className="mb-4 text-lg font-semibold" style={{ color: "#8A8A8A" }}>
          Mencari penerbangan terbaik
        </p>
        <p className="mb-4 text-lg font-semibold" style={{ color: "#8A8A8A" }}>
          Loading
        </p>
        <div className="relative w-[236.46px] h-[69.5px] bg-white border border-black rounded-2xl overflow-hidden">
          <img
            src="/Loading_indicator.svg"
            alt="Loading indicator"
            className="h-[69.5px] w-[70px] absolute z-10"
            style={{
              left: `${imagePosition}%`,
              transition: "left 0.1s linear",
            }}
          />
          <div
            className="absolute top-0 left-0 h-full rounded-l-2xl"
            style={{
              width: `${progress}%`,
              backgroundColor: "#7126B5",
              transition: "width 0.1s linear",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
