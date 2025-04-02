import { useState } from "react";
import { PlayIcon } from "./OsIcons";
import { useOSPlayer } from "../OSVideoPlayer";

export default function OSthumbnail() {
  const { setFirstLoad, firstLoad, play, thumbnail, alt, srcset, autoplay } =
    useOSPlayer();
  if (autoplay) return;
  const [start, setStart] = useState(false);

  const startMovie = () => {
    setFirstLoad(true);
    play();
    setStart(true);
  };
  return (
    <div
      className={`z-10 absolute top-0 left-0 h-full w-full  justify-center items-center cursor-pointer bg-black ${
        start || !firstLoad ? "hidden" : "flex"
      } `}
      onClick={startMovie}
    >
      {!start && firstLoad ? (
        <img
          className="h-full w-full absolute top-0 left-0 object-cover"
          src={thumbnail}
          alt={alt ? alt : ""}
          srcSet={srcset ? srcset : ""}
        />
      ) : null}
      <div className="z-[2] relative flex justify-center items-center h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.05)]">
        <div className="aspect-square  h-14 max-os_player_mobile:h-12 flex justify-center items-center rounded-[50%] bg-[rgba(0,0,0,0.5)] ">
          <PlayIcon className="h-10 max-os_player_mobile:h-8 translate-x-0.5 opacity-90 " />
        </div>
      </div>
    </div>
  );
}
