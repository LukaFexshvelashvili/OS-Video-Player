import { useEffect } from "react";
import { useOSPlayer } from "../OSVideoPlayer";

export default function OSloader() {
  const { videoRef, isLoading, setIsLoading } = useOSPlayer();

  useEffect(() => {
    if (!videoRef.current) return;

    const handleBuffering = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    const video = videoRef.current;
    video.addEventListener("waiting", handleBuffering);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("waiting", handleBuffering);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
    };
  }, [videoRef]);

  if (!isLoading) return null;

  return (
    <div className="absolute z-[2] h-12 aspect-square rounded-[50%] border-4 border-main border-r-transparent animate-spin"></div>
  );
}
