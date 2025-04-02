import { useEffect, useState } from "react";
import { useOSPlayer } from "../OSVideoPlayer";

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function OStimeDisplay() {
  const { duration, videoRef, videoSource } = useOSPlayer();
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (!videoRef.current) return;
    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      setCurrentTime(videoRef.current.currentTime);
    };

    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (!videoRef.current) return;

      videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoSource]);

  return (
    <div className="text-white text-[11px] flex items-center tracking-wider font-os_medium">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
}
