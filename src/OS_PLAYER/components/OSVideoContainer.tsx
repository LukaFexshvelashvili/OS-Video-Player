import OStimeline from "./OStimeline";
import OScontrols from "./OScontrols";
import OSepisodesToggler from "./OSepisodesToggler";
import { useEffect } from "react";
import OSmobileGestures from "./OSmobileGestures";
import OSstorageSave from "./OSstorageSave";
import OSloader from "./OSloader";
import OSerror from "./OSerror";
import OSvideoShow from "./OSvideoShow";
import OSthumbnail from "./OSthumbnail";
import OScontextmenu from "./OScontextmenu";
import useOSPlayer from "./useOSPlayer";
// import StickyPlayerWrapper from "../../app/pages/movie/components/StickyPlayerWrapper";

export default function VideoContainer() {
  const {
    playerRef,
    togglePlay,
    showControls,
    setShowControls,
    isPlaying,
    toggleFullscreen,
    theaterMode,
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
      player.addEventListener("touchmove", handleMouseMove);
      handleMouseMove();
    }

    return () => {
      if (player) {
        player.removeEventListener("mousemove", handleMouseMove);
        player.removeEventListener("touchmove", handleMouseMove);
      }
      clearTimeout(timeoutId);
    };
  }, [setShowControls, isPlaying]);

  return (
    <div
      className={` flex items-start  ${
        theaterMode
          ? "fixed inset-0 z-50 bg-black h-screen top-0 left-0"
          : " h-full w-full relative"
      }`}
      ref={playerRef}
    >
      <div
        className={`h-full bg-[rgb(0,0,0)] flex justify-center items-center relative overflow-hidden shrink-1 ${
          !showControls ? "cursor-none" : ""
        } ${true || theaterMode ? "w-full" : "aspect-video"} `}
      >
        {/* <StickyPlayerWrapper> */}
        <>
          {/* THUMBNAIL */}
          <OSthumbnail />

          {/* ERROR */}
          <OSerror />

          {/* LODADER */}
          <OSloader />

          {/* LOCALSTORAGE */}
          <OSstorageSave />

          <OSmobileGestures />

          {/* CONTEXTMENU */}
          <OScontextmenu items={[]} />

          {/* FULL HEIGHT PLAY PAUSE TOGGLE */}
          <div
            className="h-full w-full absolute top-0 left-0 z-[1] max-os_player_mobile:hidden"
            onClick={() => {
              togglePlay();
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              toggleFullscreen();
            }}
          ></div>

          <OSvideoShow />

          {/* BOTTOM CONTROLS */}
          <div
            className={`absolute w-full bottom-0  h-[53px]  px-4.5 max-os_player_mobile:px-3 flex justify-center transition-[opacity,visibility] z-[5] ${
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
        </>
        {/* </StickyPlayerWrapper> */}
      </div>
      {/* EPISODES TOGGLER */}
      <OSepisodesToggler />
    </div>
  );
}
