import OStimeline from "./components/OStimeline";
import OScontrols from "./components/OScontrols";
import { useOSPlayer } from "./OSVideoProvider";

export default function VideoContainer() {
  const { videoRef, videoSource } = useOSPlayer();

  return (
    <div className="h-[600px] aspect-video bg-black flex justify-center items-center relative">
      <video ref={videoRef} src={videoSource} className="w-full"></video>

      {/* BOTTOM CONTROLS */}
      <div className="absolute w-full bottom-0 h-[50px] bg-[#00000073] px-6 flex justify-center">
        <div className="w-full h-full flex flex-col select-none">
          <OStimeline />
          <OScontrols />
        </div>
      </div>
    </div>
  );
}
