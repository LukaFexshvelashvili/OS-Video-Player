import { useEffect, useState } from "react";
import OSepisodesSelector from "./OSepisodesSelector";
import { useOSPlayer } from "../OSVideoPlayer";

export default function OSepisodesToggler() {
  const { showControls, setShowControls, episodes } = useOSPlayer();
  if (!episodes) return;
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) {
      setShowControls(true);
    }
  }, [showControls]);

  return (
    <div
      className={`absolute z-20 right-0 top-0 transition-[opacity,visibility] h-full select-none ${
        showControls ? "opacity-100 visible" : "invisible opacity-0"
      }`}
    >
      <div
        onClick={() => setShow(true)}
        className={`absolute z-[2] cursor-pointer w-[130px] h-[32px] text-white font-os_bold tracking-wider flex justify-center items-center text-sm bg-main hover:bg-mainHover rounded-md top-3 right-3 transition-all ${
          !show ? "opacity-100 visible" : "invisible opacity-0"
        }`}
      >
        ეპიზოდები
      </div>
      <OSepisodesSelector show={show} setShow={setShow} />
    </div>
  );
}
