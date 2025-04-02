import { useEffect, useState } from "react";
import { useOSPlayer } from "../OSVideoPlayer";

export default function OSerror() {
  const { videoRef, videoSource } = useOSPlayer();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    setError(false);
    const handleError = () => setError(true);
    const handlePlaying = () => setError(false);

    const video = videoRef.current;
    video.addEventListener("error", handleError);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("error", handleError);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [videoRef, videoSource]);

  if (!error) return null;

  return (
    <div className="absolute z-[3] px-4 py-3 bg-[rgba(0,0,0,0.6)] text-[rgba(255,255,255,0.8)] font-os_medium tracking-wider ">
      ვიდეო ვერ ჩაიტვირთა სცადეთ სხვა ხარისხი/ენა ან ფლეიერი
    </div>
  );
}
