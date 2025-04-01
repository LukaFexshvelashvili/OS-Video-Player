import {
  FullscreenOffIcon,
  FullscreenOnIcon,
  PauseIcon,
  PlayIcon,
  SoundIcon,
  SoundOffIcon,
} from "../../assets/icons/OsIcons";
import { useOSPlayer } from "../OSVideoPlayer";
import OStimeDisplay from "./OStimeDisplay";
import OScontrolPip from "./OScontrolPip";
import OScontrolSettings from "./OScontrolSettings";
import { OSkeyHandler } from "./OSkeyHandler";

export default function OScontrols() {
  const {
    videoRef,
    isPlaying,
    fullscreen,
    duration,
    sound,
    toggleSound,
    toggleFullscreen,
    togglePlay,
    currentTime,
    changeVideoTime,
    changeVideoVolume,
  } = useOSPlayer();

  const skipRight = () => {
    changeVideoTime(currentTime + 10 > duration ? duration : currentTime + 10);
  };
  const skipLeft = () => {
    changeVideoTime(currentTime - 10 < 0 ? 0 : currentTime - 10);
  };
  const volumeUp = () => {
    if (videoRef.current) {
      changeVideoVolume(
        videoRef.current.volume + 0.1 > 1
          ? 1
          : (videoRef.current.volume + 0.1).toFixed(2)
      );
    }
  };
  const volumeDown = () => {
    if (videoRef.current) {
      changeVideoVolume(
        videoRef.current.volume - 0.1 < 0
          ? 0
          : (videoRef.current.volume - 0.1).toFixed(2)
      );
    }
  };
  OSkeyHandler({
    Space: togglePlay,
    KeyF: toggleFullscreen,
    ArrowRight: skipRight,
    ArrowLeft: skipLeft,
    ArrowUp: volumeUp,
    ArrowDown: volumeDown,
  });

  return (
    <div className="flex flex-1 h-full items-center px-1 w-full z-10 relative gap-3 justify-between">
      {/* STARTER */}
      <div className=" flex items-center gap-2">
        <ControlButton onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon className="h-4.5 cursor-pointer" />
          ) : (
            <PlayIcon className="h-4.5 cursor-pointer" />
          )}
        </ControlButton>

        <ControlButton onClick={toggleSound}>
          {sound != 0 ? (
            <SoundIcon className="h-5 cursor-pointer" />
          ) : (
            <SoundOffIcon className="h-5 cursor-pointer" />
          )}
        </ControlButton>
        <OStimeDisplay />
      </div>
      {/* END */}
      <div className="flex items-center gap-3.5">
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
