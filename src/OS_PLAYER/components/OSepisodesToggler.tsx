import { useState } from "react";
import OSepisodesSelector from "./OSepisodesSelector";
import useOSPlayer from "./useOSPlayer";
import { EpisodeSelectorIcon } from "./OsIcons";

export default function OSepisodesToggler() {
  const { showControls, episodes } = useOSPlayer();
  const [episodesToggler, setEpisodesToggler] = useState<boolean>(false);

  if (!episodes) return null;

  return (
    <>
      <div
        className={`h-full flex-1 min-w-[350px] shrink-0 max-mobile:w-full max-mobile:h-[100dvh] max-mobile:fixed max-mobile:top-0 max-mobile:left-0 z-60 mobile:z-[21] transition-transform  ${
          episodesToggler
            ? "max-mobile:translate-x-0"
            : "max-mobile:translate-x-full"
        } ${
          true
            ? episodesToggler
              ? "mobile:right-0 mobile:translate-x-0/4"
              : "mobile:absolute mobile:right-0 mobile:translate-x-4/4"
            : ""
        }`}
      >
        <OSepisodesSelector closeToggler={() => setEpisodesToggler(false)} />
      </div>

      <div
        onClick={() => setEpisodesToggler((state) => !state)}
        className={`cursor-pointer h-[50px] w-[65px] bg-navBg absolute bottom-0 z-[15] right-0 transition-[opacity,visibility] justify-center items-center flex  ${
          true
            ? showControls
              ? "opacity-100 visible z-40 top-0 translate-y-0"
              : "opacity-0 invisible z-40 top-0 translate-y-0"
            : "mobile:hidden translate-y-full"
        }`}
      >
        <EpisodeSelectorIcon />
      </div>
    </>
  );
}
