import OStimeline from "./OStimeline";
import OScontrols from "./OScontrols";
import { useOSPlayer } from "../OSVideoPlayer";
import OSepisodesToggler from "./OSepisodesToggler";
import { useEffect } from "react";
import OSmobileGestures from "./OSmobileGestures";
import OSstorageSave from "./OSstorageSave";

export default function VideoContainer() {
  const {
    videoRef,
    playerRef,
    videoSource,
    togglePlay,
    showControls,
    setShowControls,
    isPlaying,
    toggleFullscreen,
  } = useOSPlayer();

  useEffect(() => {
    let timeoutId: any;

    const handleMouseMove = () => {
      setShowControls(true);

      clearTimeout(timeoutId);

      if (isPlaying) {
        timeoutId = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const player = playerRef.current;
    if (player) {
      player.addEventListener("mousemove", handleMouseMove);
      player.addEventListener("touchstart", handleMouseMove);
      player.addEventListener("touchmove", handleMouseMove);
      handleMouseMove();
    }

    return () => {
      if (player) {
        player.removeEventListener("mousemove", handleMouseMove);
        player.removeEventListener("touchstart", handleMouseMove);
        player.removeEventListener("touchmove", handleMouseMove);
      }
      clearTimeout(timeoutId);
    };
  }, [setShowControls, isPlaying]);

  return (
    <div
      ref={playerRef}
      className={`h-[600px] max-os_player_mobile:w-full max-os_player_mobile:h-auto aspect-[16/10] bg-black flex justify-center items-center relative overflow-hidden ${
        !showControls ? "cursor-none" : ""
      } `}
    >
      {/* LOCALSTORAGE */}
      <OSstorageSave />

      <OSmobileGestures />
      {/* EPISODES TOGGLER */}
      <OSepisodesToggler />

      {/* FULL HEIGHT PLAY PAUSE TOGGLE */}
      <div
        className="h-full w-full absolute top-0 left-0 z-[1]"
        onClick={() => {
          togglePlay();
        }}
        onDoubleClick={(e) => {
          e.preventDefault();
          toggleFullscreen();
        }}
      ></div>

      <video ref={videoRef} src={videoSource} className="w-full"></video>
      {/* BOTTOM CONTROLS */}
      <div
        className={`absolute w-full bottom-0 h-[50px]  px-4 max-os_player_mobile:px-4 flex justify-center transition-[opacity,visibility] z-[5] ${
          showControls ? "opacity-100 visible" : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute bottom-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent h-[120px] pointer-events-none`}
        ></div>
        <div className="w-full h-full flex flex-col select-none z-[2]">
          <OStimeline />
          <OScontrols />
        </div>
      </div>
    </div>
  );
}
