import { useEffect, useState } from "react";
import { useOSPlayer } from "../OSVideoPlayer";

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }
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
    const handleSeeked = () => {
      if (!videoRef.current) return;
      setCurrentTime(videoRef.current.currentTime);
    };

    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    videoRef.current.addEventListener("seeking", handleSeeked);

    return () => {
      if (!videoRef.current) return;

      videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.removeEventListener("seeking", handleSeeked);
    };
  }, [videoSource]);

  return (
    <div className="text-white text-[11px] h-[15.5px] tracking-wider font-os_medium">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
}
