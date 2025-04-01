import { useEffect, useRef } from "react";
import { useOSPlayer } from "../OSVideoPlayer";

export default function OSmobileGestures() {
  const { changeVideoTime, FullscreenOn, currentTime, playerRef, isPlaying } =
    useOSPlayer();
  const tapTimeout = useRef<any>(null);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (!playerRef.current) return;

      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      if (isPortrait) {
        if (isPlaying && !document.fullscreenElement) {
          if (playerRef.current.requestFullscreen) {
            playerRef.current.requestFullscreen();
          } else if ((playerRef.current as any).webkitRequestFullscreen) {
            (playerRef.current as any).webkitRequestFullscreen(); // Safari
          } else if ((playerRef.current as any).mozRequestFullScreen) {
            (playerRef.current as any).mozRequestFullScreen(); // Firefox
          } else if ((playerRef.current as any).msRequestFullscreen) {
            (playerRef.current as any).msRequestFullscreen(); // IE/Edge
          }
          FullscreenOn()(screen.orientation as any).lock("landscape");
        }
      }
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [isPlaying, playerRef]);

  const handleTap = (direction: "forward" | "backward") => {
    const now = Date.now();
    const tapGap = now - lastTapRef.current;

    if (tapGap < 300) {
      if (tapTimeout.current) clearTimeout(tapTimeout.current);
      if (direction == "forward") {
        changeVideoTime(currentTime + 10);
        if ("vibrate" in navigator) {
          navigator.vibrate(50);
        }
      } else {
        changeVideoTime(currentTime + 10);
        if ("vibrate" in navigator) {
          navigator.vibrate(50);
        }
      }
    } else {
      tapTimeout.current = setTimeout(() => {
        tapTimeout.current = null;
      }, 300);
    }

    lastTapRef.current = now;
  };

  return (
    <>
      <div
        className="z-[2] absolute h-full w-[35%] hidden left-0 max-os_player_mobile:block"
        onTouchStart={() => {
          handleTap("backward");
        }}
      ></div>
      <div
        className="z-[2] absolute h-full w-[35%] hidden right-0 max-os_player_mobile:block"
        onTouchStart={() => {
          handleTap("forward");
        }}
      ></div>
    </>
  );
}
