import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CloseIcon, GoBackIcon } from "./OsIcons";
import useOSPlayer from "./useOSPlayer";
import { TEpisode, TplayerSettings } from "../OSVideoPlayer";
import { decodeHtmlEntities } from "../../lib/hooks/Customs";

type Tstorage = {
  id: number | string;
  time: number | string;
  episode?: { season: number | string; episode: string | number };
};

export default function OSepisodesSelector({
  closeToggler,
}: {
  closeToggler: Function;
}) {
  const {
    id,
    videoRef,
    episodes,
    setVideoSource,
    setCurrentSource,
    setPlayerSettings,
    setFirstLoad,
    setAdPlayed,
    thumbnail,
    playerSettings,
    isMovie,
    currentEpisodeIndex,
    currentSeason,
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
  const [activeSection, setActiveSection] = useState<"episodes" | "seasons">(
    "seasons"
  );
  const videoEnded = useCallback(() => {
    if (
      episodes[activeSeason][activeEpisode + 1] &&
      episodes[activeSeason][activeEpisode + 1].title !== "TRAILER"
    ) {
      episodeChange(
        activeEpisode + 1,
        episodes[activeSeason][activeEpisode + 1]
      );
    } else if (episodes[activeSeason + 1][0]) {
      episodeChange(0, episodes[activeSeason + 1][0], false, activeSeason + 1);
    }
  }, [activeEpisode, activeSeason]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.addEventListener("ended", videoEnded);
    return () => {
      if (!videoRef.current) return;
      videoRef.current.removeEventListener("ended", videoEnded);
    };
  }, [activeEpisode, videoEnded]);
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
        episodeChange(
          Number(saved_episode.episode),
          episodes[Number(saved_episode.season)][Number(saved_episode.episode)],
          true,
          Number(saved_episode.season)
        );
        setActiveSection("episodes");
        setCurrent({
          season: Number(saved_episode.season),
          episode: Number(saved_episode.episode),
        });
      }
    }
  }, [id, episodes]);

  // Sync with context when episode changes from navigation arrows
  useEffect(() => {
    setActiveEpisode(currentEpisodeIndex);
    setActiveSeason(currentSeason);
    setCurrent({
      season: currentSeason,
      episode: currentEpisodeIndex,
    });
  }, [currentEpisodeIndex, currentSeason]);

  useEffect(() => {
    if (!episodesList.current) return;
    if (activeSection == "seasons") return;

    if (activeSeason == current.season) {
      episodesList.current.scrollTo(
        0,
        90 * activeEpisode + 350 - episodesList.current.clientHeight
      );
    } else {
      episodesList.current.scrollTo(0, 0);
    }
  }, [activeSeason, activeSection]);

  const saveInStorage = (info: {
    episode: string | number;
    season: string | number;
  }) => {
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
  };

  function episodeChange(
    index: number,
    source: TEpisode,
    notIndex?: boolean,
    season?: number,
    force_link?: string
  ) {
    setActiveEpisode(index);

    const getURL =
      source.languages.GEO?.HD ||
      source.languages.GEO?.SD ||
      source.languages.ENG?.HD ||
      source.languages.ENG?.SD;

    let selectedQuality = null;
    let selectedLang = null;

    if (!force_link) {
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
    }
    if (!notIndex) {
      setFirstLoad(false);
      // Reset ad state on episode change
      setAdPlayed(false);
      saveInStorage({ season: season ? season : activeSeason, episode: index });

      // Update URL parameters with season and episode
      const currentSeason = season ? season : activeSeason;
      const currentEpisode = index + 1; // Convert to 1-based for display

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("season", String(currentSeason));
      searchParams.set("episode", String(currentEpisode));
    }

    if (season) {
      setActiveSeason(season);
    }
    if (!force_link) {
      setVideoSource(getURL);
    } else {
      setVideoSource(force_link);
    }
    setCurrentSource(source);
    if (!force_link) {
      setPlayerSettings((state: TplayerSettings) => ({
        ...state,
        quality: selectedQuality,
        lang: selectedLang,
      }));
    }
    setCurrent({ season: season ? season : activeSeason, episode: index });
    closeToggler();
  }

  const getThumbnailUrl = (url: string) => {
    if (!url) return thumbnail;
    if (isMovie) return thumbnail;
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch {
      return thumbnail;
    }
    const pathParts = urlObj.pathname.split("/");
    pathParts.pop();
    pathParts.push("thumbnail_sm.webp");
    urlObj.pathname = pathParts.join("/");
    return urlObj.toString();
  };
  const thumbnail_sm = addStringToThumbnail(thumbnail, "_sm2");

  if (isMovie)
    return (
      <div
        className={`w-full h-full overflow-hidden bg-[rgb(40,40,40)]  bg-[url('/decorations/background.svg')] bg-no-repeat bg-cover`}
      >
        <div className="h-13 shrink-0 w-full bg-[#111111] text-white font-robotoGeoCaps ">
          <div className=" px-3 w-full h-full flex items-center gap-2 text-[17px]">
            აირჩიეთ ფლეიერი
            {!true ? (
              <span className="text-[rgba(255,255,255,0.5)] text-sm ml-auto tracking-wide  max-mobile:hidden">
                ფილმი
              </span>
            ) : (
              <div
                onClick={() => closeToggler()}
                className="flex  h-13 p-3 aspect-square absolute right-0 top-0 text-textHead2 cursor-pointer select-none"
              >
                <CloseIcon />
              </div>
            )}
          </div>
          {episodes[activeSeason].map((episode: TEpisode, i: number) => (
            <EpisodeSkin
              key={i + "_" + activeSeason}
              index={i}
              active={
                current.season == activeSeason ? activeEpisode == i : false
              }
              setActive={setActiveEpisode}
              episodeChange={(url?: string) =>
                episodeChange(i, episode, undefined, undefined, url)
              }
              source={episode}
              thumbnail={thumbnail_sm}
              getThumbnailUrl={getThumbnailUrl}
              activeLang={playerSettings.lang}
              setActiveLang={(lang: "GEO" | "ENG") => {
                setPlayerSettings({ ...playerSettings, lang: lang });
              }}
            />
          ))}
        </div>
        <div
          onClick={() => closeToggler()}
          className="flex mobile:hidden h-13 p-3 aspect-square absolute right-0 top-0 text-textHead2 cursor-pointer select-none"
        >
          <CloseIcon />
        </div>
      </div>
    );
  return (
    <div
      className={`w-full h-full overflow-hidden bg-[rgb(40,40,40)] bg-[url('/decorations/background.svg')] bg-no-repeat bg-cover `}
    >
      <div className="h-13 shrink-0 w-full bg-[#111111] text-white font-robotoGeoCaps ">
        {activeSection == "seasons" ? (
          <div className=" px-3 w-full h-full flex items-center gap-2 text-[17px]">
            აირჩიეთ სეზონი{" "}
            <span
              className={`text-[rgba(255,255,255,0.5)] text-sm ml-auto tracking-wide max-mobile:hidden ${
                true ? "hidden" : ""
              } `}
            >
              {activeSeason
                ? `სეზონი ${current.season} / ეპიზოდი ${current.episode + 1}`
                : ""}
            </span>
          </div>
        ) : (
          <div
            className=" px-3 w-full h-full flex items-center gap-2 hover:bg-[#202020] cursor-pointer text-[17px] "
            onClick={() => {
              if (activeSection == "episodes") {
                setActiveSection("seasons");
              }
            }}
          >
            <GoBackIcon className="h-[18px]" /> სეზონი {activeSeason}{" "}
            {activeSeason == current.season && (
              <span
                className={`text-[rgba(255,255,255,0.5)] text-sm ml-auto tracking-wide max-mobile:hidden ${
                  true ? "hidden" : ""
                }  `}
              >
                ეპიზოდი {current.episode + 1}
              </span>
            )}
          </div>
        )}
        <div
          onClick={() => closeToggler()}
          className={`flex  h-13 p-3 aspect-square absolute right-0 top-0 text-textHead2 cursor-pointer ${
            true ? "" : "mobile:hidden"
          } `}
        >
          <CloseIcon />
        </div>
      </div>
      <div
        ref={episodesList}
        className={`w-full h-[calc(100%-52px)] overflow-y-auto custom_scrollbar ${
          activeSection == "seasons" ? "hidden" : ""
        }`}
      >
        {episodes[activeSeason].map((episode: TEpisode, i: number) => (
          <EpisodeSkin
            key={i + "_" + activeSeason}
            index={i}
            active={current.season == activeSeason ? activeEpisode == i : false}
            setActive={setActiveEpisode}
            episodeChange={(url?: string) =>
              episodeChange(i, episode, undefined, undefined, url)
            }
            source={episode}
            thumbnail={thumbnail_sm}
            getThumbnailUrl={getThumbnailUrl}
            activeLang={playerSettings.lang}
            setActiveLang={(lang: "GEO" | "ENG") => {
              setPlayerSettings({ ...playerSettings, lang: lang });
            }}
          />
        ))}
      </div>
      <div
        className={`relative w-full h-[calc(100%-52px)]  overflow-hidden  ${
          activeSection == "episodes" ? "hidden" : ""
        }`}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col items-center  custom_scrollbar">
          {Object.keys(episodes).map((season: string | number) => (
            <Season
              key={season}
              active={current.season == season}
              setActive={setActiveSeason}
              index={Number(season)}
              changeSection={() => {
                setActiveSection("episodes");
              }}
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
  getThumbnailUrl: Function;
  activeLang: string;
  setActiveLang: Function;
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
  getThumbnailUrl,
  activeLang,
  setActiveLang,
}: Tepisode) {
  const isGeo = source.languages.GEO?.HD || source.languages.GEO?.SD;
  const isEng = source.languages.ENG?.HD || source.languages.ENG?.SD;
  const getURL =
    source.languages.GEO?.HD ||
    source.languages.GEO?.SD ||
    source.languages.ENG?.HD ||
    source.languages.ENG?.SD;
  if (!getURL) return null;
  if (getURL == "announce")
    return (
      <div
        className={`select-none h-[90px] py-2 flex gap-3 items-start px-3 text-white font-os_medium tracking-wider cursor-pointer text-[13px] max-os_player_mobile:text-[12px]  outline-b border-l-main transition-colors outline-[rgba(255,255,255,0.05)] ${
          active
            ? "bg-main/10 border-l-4 border-l-main hover:bg-main/15"
            : "hover:bg-[rgba(0,0,0,0.2)]"
        } `}
      >
        <div className="h-[70px] w-[120px] relative bg-black overflow-hidden shrink-0">
          <div className="absolute z-[1] h-full w-full top-0 left-0"></div>
          <img
            src={getThumbnailUrl(getURL)}
            onError={(e) => (e.currentTarget.src = thumbnail)}
            className="absolute h-[70px] w-[120px] object-cover  top-0 left-0 shrink-0"
            loading="lazy"
            alt={source.title ? source.title : ""}
          />
          <div
            className={`absolute bottom-0 left-0 h-7 px-2.5  flex justify-center items-center text-white ${
              active ? "bg-main" : "bg-[rgba(82,82,82,0.8)]"
            }  text-[15px] font-os_semibold`}
          >
            {index + 1}
          </div>
        </div>
        <div className="flex flex-col py-0.5 h-full gap-2">
          <p className="text-[14px] uppercase font-os_regular line-clamp-1">
            ფილმი მალე დაემატება
          </p>
        </div>
      </div>
    );
  return (
    <div
      onClick={() => {
        episodeChange();
      }}
      className={`select-none h-[90px] py-2 flex gap-3 items-start px-3 text-white font-os_medium tracking-wider cursor-pointer text-[13px] max-os_player_mobile:text-[12px]  outline-b border-l-main transition-colors outline-[rgba(255,255,255,0.05)] ${
        active
          ? "bg-main/10 border-l-4 border-l-main hover:bg-main/15"
          : "hover:bg-[rgba(0,0,0,0.2)]"
      } `}
    >
      <div className="h-[70px] w-[120px] relative bg-black overflow-hidden shrink-0">
        <div className="absolute z-[1] h-full w-full top-0 left-0"></div>
        <img
          src={getThumbnailUrl(getURL)}
          onError={(e) => (e.currentTarget.src = thumbnail)}
          className="absolute h-[70px] w-[120px] object-cover  top-0 left-0 shrink-0"
          loading="lazy"
          alt={source.title ? source.title : ""}
        />
        <div
          className={`absolute bottom-0 left-0 h-7 px-2.5  flex justify-center items-center text-white ${
            active ? "bg-main" : "bg-[rgba(82,82,82,0.8)]"
          }  text-[15px] font-os_semibold`}
        >
          {index + 1}
        </div>
      </div>
      <div className="flex flex-col py-0.5 h-full gap-2">
        <p className="text-[14px] uppercase font-os_regular line-clamp-1">
          {decodeHtmlEntities(source.title ? source.title : "")}
        </p>
        <div className="flex gap-2">
          {isGeo && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveLang("GEO");
                episodeChange(isGeo);
              }}
              className={`text-[13px] text-[rgba(255,255,255)] bg-[rgba(255,255,255,0.2)] px-1.5 opacity-50 hover:opacity-75 ${
                activeLang == "GEO" && active && "opacity-100 bg-main"
              }`}
            >
              GEO
            </div>
          )}
          {isEng && (
            <div
              onClick={(e) => {
                e.stopPropagation();

                setActiveLang("ENG");
                episodeChange(isEng);
              }}
              className={`text-[13px] text-[rgba(255,255,255)] bg-[rgba(255,255,255,0.2)] px-1.5 opacity-50 hover:opacity-75 ${
                activeLang == "ENG" && active && "opacity-100 bg-main"
              }`}
            >
              ENG
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
type Tseason = {
  active?: boolean;
  setActive: Function;
  index: number | string;
  changeSection: Function;
};
function Season({ active, index, setActive, changeSection }: Tseason) {
  const changeSeason = () => {
    setActive(index);
  };
  return (
    <div
      onClick={() => {
        changeSeason();
        changeSection();
      }}
      className={`h-[60px] w-full shrink-0 border-b-2 border-b-[rgba(255,255,255,0.05)]  aspect-square flex items-center justify-center text-white font-os_semibold cursor-pointer transition-colors text-[15px] ${
        active
          ? "bg-main/10 border-b-2 border-b-main hover:bg-main/15"
          : "bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.4)]"
      }`}
    >
      სეზონი {index}
    </div>
  );
}
