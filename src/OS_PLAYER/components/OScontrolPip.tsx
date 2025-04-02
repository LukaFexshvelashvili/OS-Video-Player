import { useEffect, useState } from "react";
import { PIPIcon } from "./OsIcons";
import { ControlButton } from "./OScontrols";
import { useOSPlayer } from "../OSVideoPlayer";

type Props = {};

export default function OScontrolPip({}: Props) {
  const { videoRef, pause } = useOSPlayer();
  const [_, setIsPip] = useState(false);

  const togglePip = async () => {
    if (!videoRef.current) return;

    try {
      if (!document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
        setIsPip(true);
      } else {
        pause();
        await document.exitPictureInPicture();
        setIsPip(false);
      }
    } catch (error) {
      console.error("Error toggling PiP:", error);
    }
  };

  useEffect(() => {
    const handlePipExit = () => {
      pause();
      setIsPip(false);
    };

    document.addEventListener("leavepictureinpicture", handlePipExit);

    return () => {
      document.removeEventListener("leavepictureinpicture", handlePipExit);
    };
  }, []);

  return (
    <ControlButton onClick={togglePip}>
      <PIPIcon className="h-4.5 cursor-pointer" />
    </ControlButton>
  );
}
