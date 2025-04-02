import {
  FullscreenOffIcon,
  FullscreenOnIcon,
  PauseIcon,
  PlayIcon,
} from "./OsIcons";
import { useOSPlayer } from "../OSVideoPlayer";
import OStimeDisplay from "./OStimeDisplay";
import OScontrolPip from "./OScontrolPip";
import OScontrolSettings from "./OScontrolSettings";
import { OSkeyHandler } from "./OSkeyHandler";
import OScontrolSound from "./OScontrolSound";

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
    <div className="flex flex-1 h-full items-center px-1 w-full z-10 relative gap-3 justify-between">
      {/*  */}
      {/* STARTER */}
      <div className=" flex items-center gap-[15px] max-os_player_mobile:gap-[10px]">
        <ControlButton onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon className="h-5 cursor-pointer" />
          ) : (
            <PlayIcon className="h-6.5 cursor-pointer" />
          )}
        </ControlButton>

        <OScontrolSound />
        <OStimeDisplay />
      </div>
      {/* END */}
      <div className="flex items-center gap-[16px] max-os_player_mobile:gap-[12px]">
        <OScontrolPip />
        <OScontrolSettings />
        <ControlButton onClick={toggleFullscreen}>
          {fullscreen ? (
            <FullscreenOffIcon className="h-4.5 cursor-pointer" />
          ) : (
            <FullscreenOnIcon className="h-4.5 cursor-pointer" />
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
