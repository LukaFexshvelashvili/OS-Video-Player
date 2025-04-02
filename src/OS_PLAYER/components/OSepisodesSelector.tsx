import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CloseIcon } from "./OsIcons";
import { TEpisode, TplayerSettings, useOSPlayer } from "../OSVideoPlayer";

type Props = {
  show: boolean;
  setShow: Function;
};
type Tstorage = {
  id: number | string;
  time: number | string;
  episode?: { season: number | string; episode: string | number };
};

export default function OSepisodesSelector({ show, setShow }: Props) {
  const {
    id,
    episodes,
    setVideoSource,
    setCurrentSource,
    setPlayerSettings,
    firstLoad,
    setFirstLoad,
    thumbnail,
  } = useOSPlayer();

  const episodesList = useRef<null | HTMLDivElement>(null);
  if (!episodes) return;
  function addStringToThumbnail(thumbnailUrl: string, stringToAdd: string) {
    const fileName = thumbnailUrl.split(".").slice(0, -1).join(".");
    const fileExtension = thumbnailUrl.split(".").pop();

    const newFileName = `${fileName}${stringToAdd}.${fileExtension}`;
    return newFileName;
  }
  const [current, setCurrent] = useState({ season: 1, episode: 0 });
  const [activeEpisode, setActiveEpisode] = useState<number>(0);
  const [activeSeason, setActiveSeason] = useState<number>(1);

  useLayoutEffect(() => {
    const storedData = localStorage.getItem("os_player");
    let storage: Tstorage[] = storedData ? JSON.parse(storedData) : [];

    let data = storage.find((item) => String(item.id) === String(id));
    if (data) {
      const saved_episode = data.episode;
      if (
        saved_episode &&
        saved_episode.season &&
        saved_episode.episode !== undefined
      ) {
        setActiveSeason(Number(saved_episode.season));
        episodeChange(
          Number(saved_episode.episode),
          episodes[Number(saved_episode.season)][Number(saved_episode.episode)],
          true
        );
        setCurrent({
          season: Number(saved_episode.episode),
          episode: Number(saved_episode.season),
        });
      }
    }
  }, []);

  useEffect(() => {
    setCurrent({ season: activeSeason, episode: activeEpisode });
    saveInStorage({ season: activeSeason, episode: activeEpisode });
  }, [activeEpisode]);

  useEffect(() => {
    if (episodesList.current) {
      if (current.season == activeSeason) {
        episodesList.current.scrollTo(
          0,
          70 * activeEpisode + 150 - episodesList.current.clientHeight
        );
      } else {
        episodesList.current.scrollTo(0, 0);
      }
    }
  }, [activeSeason, activeEpisode, current.season]);
  const saveInStorage = (info: {
    episode: string | number;
    season: string | number;
  }) => {
    if (!firstLoad) {
      const storedData = localStorage.getItem("os_player");
      let storage: Tstorage[] = storedData ? JSON.parse(storedData) : [];

      let data = storage.find((item) => String(item.id) === String(id));

      if (data) {
        data.time = 0;
        data.episode = {
          episode: Number(info.episode),
          season: Number(info.season),
        };
      } else {
        data = {
          id,
          time: 0,
          episode: {
            episode: Number(info.episode),
            season: Number(info.season),
          },
        };
        if (storage.length > 5) {
          storage.splice(4);
        }
        storage.unshift(data);
      }

      localStorage.setItem("os_player", JSON.stringify(storage));

      setActiveEpisode(Number(info.episode));
      setActiveSeason(Number(info.season));
    }
  };

  function episodeChange(index: number, source: TEpisode, notIndex?: boolean) {
    setActiveEpisode(index);
    const getURL =
      source.languages.GEO?.HD ||
      source.languages.GEO?.SD ||
      source.languages.ENG?.HD ||
      source.languages.ENG?.SD;

    let selectedQuality = null;
    let selectedLang = null;

    if (source.languages.GEO?.HD) {
      selectedQuality = "HD";
      selectedLang = "GEO";
    } else if (source.languages.GEO?.SD) {
      selectedQuality = "SD";
      selectedLang = "GEO";
    } else if (source.languages.ENG?.HD) {
      selectedQuality = "HD";
      selectedLang = "ENG";
    } else if (source.languages.ENG?.SD) {
      selectedQuality = "SD";
      selectedLang = "ENG";
    }
    if (!notIndex) {
      setFirstLoad(false);
    }
    setVideoSource(getURL);
    setCurrentSource(source);
    setPlayerSettings((state: TplayerSettings) => ({
      ...state,
      quality: selectedQuality,
      lang: selectedLang,
    }));
    setShow(false);
  }
  return (
    <div
      className={`absolute z-[10] bg-[rgba(0,0,0,0.7)] top-0 right-0 w-[290px] h-[350px] flex items-start transition-all max-os_player_mobile:h-full ${
        show ? "visible translate-x-0" : "invisible translate-x-4/4"
      }`}
    >
      <div ref={episodesList} className="w-[230px] h-full overflow-y-auto">
        {episodes[activeSeason].map((episode: TEpisode, i: number) => (
          <EpisodeSkin
            key={i + "_" + activeSeason}
            index={i}
            active={current.season == activeSeason ? activeEpisode == i : false}
            setActive={setActiveEpisode}
            episodeChange={() => episodeChange(i, episode)}
            source={episode}
            thumbnail={addStringToThumbnail(thumbnail, "_sm2")}
          />
        ))}
      </div>
      <div className="relative w-[60px] bg-[rgba(0,0,0,0.6)] h-full overflow-x-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-black h-12 flex items-center justify-center"
          onClick={() => setShow(false)}
        >
          <CloseIcon className="h-6  cursor-pointer" />
        </div>
        <div className=" h-full pt-12 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-3 pb-3">
          {Object.keys(episodes).map((season: string | number) => (
            <Season
              key={season}
              active={activeSeason == season}
              setActive={setActiveSeason}
              index={season}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
type Tepisode = {
  active?: boolean;
  setActive: Function;
  index: number;
  episodeChange: Function;
  source: TEpisode;
  thumbnail: string;
};
// function Episode({ active, index, episodeChange }: Tepisode) {
//   return (
//     <div
//       onClick={() => {
//         episodeChange();
//       }}
//       className={`h-[40px] flex items-center px-3 text-white font-os_medium tracking-wider cursor-pointer text-[13px] max-os_player_mobile:text-[12px] max-os_player_mobile:h-[38px] border-b transition-colors border-[rgba(255,255,255,0.05)] ${
//         active ? "bg-main" : "hover:bg-[rgba(255,255,255,0.05)]"
//       } `}
//     >
//       {index + 1} ეპიზოდი
//     </div>
//   );
// }
function EpisodeSkin({
  active,
  index,
  episodeChange,
  source,
  thumbnail,
}: Tepisode) {
  const isGeo = source.languages.GEO?.HD || source.languages.GEO?.SD;
  const isEng = source.languages.ENG?.HD || source.languages.ENG?.SD;
  return (
    <div
      onClick={() => {
        episodeChange();
      }}
      className={`h-[70px] py-2 flex gap-2 items-start px-3 text-white font-os_medium tracking-wider cursor-pointer text-[13px] max-os_player_mobile:text-[12px]  border-b transition-colors border-[rgba(255,255,255,0.05)] ${
        active ? "bg-main" : "hover:bg-[rgba(255,255,255,0.05)]"
      } `}
    >
      <img src={thumbnail} className="h-full aspect-video rounded-sm" />
      <div className="flex flex-col justify-between h-full">
        <p>{index + 1} ეპიზოდი</p>
        <p className="text-[12px] text-[rgba(255,255,255,0.6)]">
          {isGeo && isEng ? "GEO / ENG" : isGeo ? "GEO" : isEng ? "ENG" : ""}
        </p>
      </div>
    </div>
  );
}
type Tseason = {
  active?: boolean;
  setActive: Function;
  index: number | string;
};
function Season({ active, index, setActive }: Tseason) {
  const changeSeason = () => {
    setActive(index);
  };
  return (
    <div
      onClick={changeSeason}
      className={`h-[36px] shrink-0 aspect-square rounded-md flex items-center justify-center text-white font-os_semibold cursor-pointer transition-colors text-[14px] ${
        active
          ? "bg-main"
          : "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]"
      }`}
    >
      {index}
    </div>
  );
}
