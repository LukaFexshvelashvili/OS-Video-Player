import {
  PauseIcon,
  PlayIcon,
  SoundIcon,
  SoundOffIcon,
} from "../../assets/icons/OsIcons";
import { useOSPlayer } from "../OSVideoProvider";
import OStimeDisplay from "./OSTimeDisplay";

export default function OScontrols() {
  const {
    isPlaying,
    // play,
    // pause,
    sound,
    toggleSound,
    togglePlay,
  } = useOSPlayer();
  return (
    <div className="flex flex-1 h-full items-center px-1 w-full z-10 relative gap-3">
      <ControlButton onClick={togglePlay}>
        {isPlaying ? (
          <PauseIcon className="h-5 cursor-pointer" />
        ) : (
          <PlayIcon className="h-5 cursor-pointer" />
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
  );
}

interface ControlButtonProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

function ControlButton({ children, ...rest }: ControlButtonProps) {
  return (
    <div
      className="flex justify-center items-center h-6 aspect-square"
      {...rest}
    >
      {children}
    </div>
  );
}
