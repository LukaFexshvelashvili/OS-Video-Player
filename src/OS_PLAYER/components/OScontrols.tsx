import {
  FullscreenOffIcon,
  FullscreenOnIcon,
  PauseIcon,
  PlayIcon,
  PrevEpisodeIcon,
  NextEpisodeIcon,
  TheaterModeIcon,
  VideoStretchIcon,
} from "./OsIcons";
import OStimeDisplay from "./OStimeDisplay";
import OScontrolPip from "./OScontrolPip";
import OScontrolSettings from "./OScontrolSettings";
import { OSkeyHandler } from "./OSkeyHandler";
import OScontrolSound from "./OScontrolSound";
import useOSPlayer from "./useOSPlayer";
import { Link } from "react-router";

export default function OScontrols() {
  const {
    playerRef,
    videoRef,
    isPlaying,
    fullscreen,
    duration,
    toggleFullscreen,
    togglePlay,
    changeVideoTime,
    goToPreviousEpisode,
    goToNextEpisode,
    isMovie,
    episodes,
    canGoToPreviousEpisode,
    canGoToNextEpisode,
    theaterMode,
    videoStretch,
    toggleTheaterMode,
    toggleVideoStretch,
  } = useOSPlayer();

  const skipRight = () => {
    if (!videoRef.current) return;
    changeVideoTime(
      videoRef.current?.currentTime + 10 > duration
        ? duration
        : videoRef.current?.currentTime + 10
    );
  };
  const skipLeft = () => {
    if (!videoRef.current) return;

    changeVideoTime(
      videoRef.current?.currentTime - 10 < 0
        ? 0
        : videoRef.current?.currentTime - 10
    );
  };

  OSkeyHandler(
    {
      Space: togglePlay,
      KeyF: toggleFullscreen,
      ArrowRight: skipRight,
      ArrowLeft: skipLeft,
    },
    playerRef
  );

  return (
    <div className="flex flex-1 h-full items-center px-1 w-full z-10 relative gap-3 justify-between select-none">
      {/*  */}
      {/* STARTER */}
      <div className=" flex items-center gap-[10px] max-os_player_mobile:gap-[10px]">
        {/* Previous Episode Button - only show for series */}
        {!isMovie && episodes && canGoToPreviousEpisode && (
          <ControlButton
            onClick={goToPreviousEpisode}
            className={`w-6 flex justify-center items-center transition-opacity text-white opacity-100 cursor-pointer `}
          >
            <PrevEpisodeIcon className="mobile:h-5 h-4.5" />
          </ControlButton>
        )}

        <ControlButton
          onClick={togglePlay}
          className="w-6 flex justify-center items-center"
        >
          {isPlaying ? (
            <PauseIcon className="mobile:h-5 h-4.5 cursor-pointer" />
          ) : (
            <PlayIcon className="mobile:h-6.5 h-6 cursor-pointer" />
          )}
        </ControlButton>

        {/* Next Episode Button - only show for series */}
        {!isMovie && episodes && canGoToNextEpisode && (
          <ControlButton
            onClick={goToNextEpisode}
            className={`w-6 flex justify-center items-center transition-opacity opacity-100 cursor-pointer `}
          >
            <NextEpisodeIcon className="mobile:h-5 h-4.5" />
          </ControlButton>
        )}

        <OScontrolSound />
        <OStimeDisplay />
      </div>
      {/* END */}
      <div className="flex items-center gap-[16px] max-os_player_mobile:gap-[14px]">
        <Link
          to={"https://croconet.co"}
          className=" text-xs hidden 600:block  font-mainSemiBold"
          target="_blank"
        >
          CROCO<span className="text-main  ">NET</span>
          .CO
        </Link>
        {/* Theater Mode Button */}
        <div className="hidden gap-[16px] items-center mobile:flex">
          <ControlButton onClick={toggleTheaterMode}>
            <TheaterModeIcon
              className={`mobile:h-5.5 h-4 cursor-pointer ${
                theaterMode ? "[&>path]:fill-main" : ""
              }`}
            />
          </ControlButton>

          {/* Video Stretch Button */}
          <ControlButton onClick={toggleVideoStretch}>
            <VideoStretchIcon
              className={`mobile:h-5 h-4 cursor-pointer ${
                videoStretch ? "[&>path]:fill-main [&>path]:stroke-main" : ""
              }`}
            />
          </ControlButton>
        </div>

        <OScontrolPip />
        <OScontrolSettings />

        <ControlButton onClick={toggleFullscreen}>
          {fullscreen ? (
            <FullscreenOffIcon className="mobile:h-4.5 h-4 cursor-pointer [&>path]:fill-main" />
          ) : (
            <FullscreenOnIcon className="mobile:h-4.5 h-4 cursor-pointer" />
          )}
        </ControlButton>
      </div>
    </div>
  );
}

interface ControlButtonProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

export function ControlButton({ children, ...rest }: ControlButtonProps) {
  return (
    <div
      className="flex justify-center items-center h-6 aspect-square"
      {...rest}
    >
      {children}
    </div>
  );
}
