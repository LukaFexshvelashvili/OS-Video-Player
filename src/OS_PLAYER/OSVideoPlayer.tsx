import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import VideoContainer from "./components/OSVideoContainer";
import { OSVideoContext } from "./components/useOSPlayer";

export type TLanguageOptions = {
  HD?: string;
  SD?: string;
};

export type TEpisode = {
  title?: string;
  languages: {
    GEO?: TLanguageOptions;
    ENG?: TLanguageOptions;
  };
};

export type TSeriesData = {
  [season: number]: TEpisode[];
};

export type TplayerSettings = {
  lang: string;
  quality: string;
  speed: number;
};

type TOSplayer = {
  id: string | number;
  episodes?: TSeriesData;
  source: TEpisode;
  thumbnail: string;
  alt?: string;
  srcset?: string;
  autoplay?: boolean;
  isMovie: boolean;
  trailer: string;
  preroll: { link: string; video: string } | null;
};

export default function OSVideoPlayer({
  id,
  episodes,
  source,
  thumbnail,
  preroll,
  alt,
  srcset,
  autoplay,
  isMovie,
  trailer,
}: TOSplayer) {
  // Replace with your ad video URL
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const playerRef = useRef<null | HTMLDivElement>(null);

  const [adPlayed, setAdPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentSource, setCurrentSource] = useState<TEpisode>(source);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
  const [currentSeason, setCurrentSeason] = useState<number>(1);
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  const [videoStretch, setVideoStretch] = useState<boolean>(false);
  const [playerSettings, setPlayerSettings] = useState<TplayerSettings>({
    lang: "GEO",
    quality: "HD",
    speed: 1,
  });

  const [videoSource, setVideoSource] = useState(
    source.languages.GEO?.HD
      ? source.languages.GEO?.HD
      : source.languages.ENG?.HD
  );

  const handleVideoEvents = useCallback((video: HTMLVideoElement) => {
    const handleLoadedMetadata = () => {
      if (!isNaN(video.duration)) {
        setDuration(video.duration);
      }
      setIsLoading(false);
      if (autoplay) {
        play();
      }
    };
    video.addEventListener("loadeddata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      handleVideoEvents(videoRef.current);
    }
  }, [videoRef.current]);

  // Initialize episode and season from URL parameters
  useEffect(() => {
    if (typeof window !== "undefined" && episodes && !isMovie) {
      const searchParams = new URLSearchParams(window.location.search);
      const urlSeason = searchParams.get("season");
      const urlEpisode = searchParams.get("episode");

      if (urlSeason && urlEpisode) {
        const seasonNum = Number(urlSeason);
        const episodeNum = Number(urlEpisode) - 1; // Convert to 0-based index

        if (episodes[seasonNum] && episodes[seasonNum][episodeNum]) {
          setCurrentSeason(seasonNum);
          setCurrentEpisodeIndex(episodeNum);
        }
      }
    }
  }, [episodes, isMovie]);
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setFullscreen(isFullscreen);

      if (!isFullscreen) {
        try {
          (screen.orientation as any).unlock();
        } catch (e) {}
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const play = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    videoRef.current?.paused ? play() : pause();
  };

  const toggleSound = () => {
    if (!videoRef.current) return;

    if (videoRef.current.volume > 0) {
      setPreviousVolume(videoRef.current.volume);
      videoRef.current.volume = 0;
      setSound(0);
    } else {
      videoRef.current.volume = previousVolume;
      setSound(previousVolume);
    }
  };
  const FullscreenOn = () => {
    setFullscreen(true);
    playerRef.current?.requestFullscreen();
    (screen.orientation as any).lock("landscape");
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().then(() => setFullscreen(true));
      (screen.orientation as any).lock("landscape");
    } else {
      document.exitFullscreen().then(() => setFullscreen(false));
      (screen.orientation as any).unlock("landscape");
    }
  };

  const changeVideoTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const changeVideoVolume = (volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  const changeEpisode = (episodeIndex: number, season: number) => {
    if (!episodes || !episodes[season] || !episodes[season][episodeIndex])
      return;

    const newEpisode = episodes[season][episodeIndex];
    const newURL =
      newEpisode.languages.GEO?.HD ||
      newEpisode.languages.GEO?.SD ||
      newEpisode.languages.ENG?.HD ||
      newEpisode.languages.ENG?.SD;
    // Reset ad state on episode change
    setAdPlayed(false);
    if (newURL) {
      setCurrentEpisodeIndex(episodeIndex);
      setCurrentSeason(season);
      setCurrentSource(newEpisode);
      setVideoSource(newURL);
      setFirstLoad(false);

      // Update URL parameters
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("season", String(season));
        searchParams.set("episode", String(episodeIndex + 1));
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
      }
    }
  };

  const goToPreviousEpisode = () => {
    if (isMovie || !episodes) return;

    // Try previous episode in current season
    if (currentEpisodeIndex > 0) {
      changeEpisode(currentEpisodeIndex - 1, currentSeason);
      return;
    }

    // If at first episode of current season, try to go to previous season
    if (currentSeason > 1) {
      const prevSeason = currentSeason - 1;
      if (episodes[prevSeason] && episodes[prevSeason].length > 0) {
        // Go to last episode of previous season
        const lastEpisodeIndex = episodes[prevSeason].length - 1;
        changeEpisode(lastEpisodeIndex, prevSeason);
        return;
      }
    }

    // If no previous episode/season available, do nothing (stay at current)
    console.log("No previous episode available");
  };

  const goToNextEpisode = () => {
    if (isMovie || !episodes) return;

    const currentSeasonEpisodes = episodes[currentSeason];
    if (!currentSeasonEpisodes || currentSeasonEpisodes.length === 0) return;

    // Try next episode in current season
    if (currentEpisodeIndex < currentSeasonEpisodes.length - 1) {
      changeEpisode(currentEpisodeIndex + 1, currentSeason);
      return;
    }

    // If at last episode of current season, try to go to next season
    const nextSeason = currentSeason + 1;
    if (episodes[nextSeason] && episodes[nextSeason].length > 0) {
      // Go to first episode of next season
      changeEpisode(0, nextSeason);
      return;
    }

    // If no next episode/season available, do nothing (stay at current)
    console.log("No next episode available");
  };

  // Calculate if navigation is possible
  const canGoToPreviousEpisode = useMemo(() => {
    if (isMovie || !episodes) return false;

    // Can go to previous episode in current season
    if (currentEpisodeIndex > 0) return true;

    // Can go to previous season
    if (
      currentSeason > 1 &&
      episodes[currentSeason - 1] &&
      episodes[currentSeason - 1].length > 0
    ) {
      return true;
    }

    return false;
  }, [isMovie, episodes, currentEpisodeIndex, currentSeason]);

  const canGoToNextEpisode = useMemo(() => {
    if (isMovie || !episodes) return false;

    const currentSeasonEpisodes = episodes[currentSeason];
    if (!currentSeasonEpisodes || currentSeasonEpisodes.length === 0)
      return false;

    // Can go to next episode in current season
    if (currentEpisodeIndex < currentSeasonEpisodes.length - 1) return true;

    // Can go to next season
    const nextSeason = currentSeason + 1;
    if (episodes[nextSeason] && episodes[nextSeason].length > 0) {
      return true;
    }

    return false;
  }, [isMovie, episodes, currentEpisodeIndex, currentSeason]);

  const toggleTheaterMode = () => {
    setTheaterMode(!theaterMode);
  };

  const toggleVideoStretch = () => {
    setVideoStretch(!videoStretch);
  };

  return (
    <OSVideoContext.Provider
      value={{
        id,
        preroll,
        videoRef,
        playerRef,
        episodes,
        isPlaying,
        sound,
        duration,
        videoSource,
        currentSource,
        playerSettings,
        fullscreen,
        showControls,
        play,
        firstLoad,
        pause,
        thumbnail,
        autoplay,
        adPlayed,
        setAdPlayed,
        alt,
        srcset,
        isLoading,
        togglePlay,
        toggleSound,
        toggleFullscreen,
        changeVideoTime,
        setVideoSource,
        setCurrentSource,
        setPlayerSettings,
        changeVideoVolume,
        setShowControls,
        FullscreenOn,
        setFirstLoad,
        setIsLoading,
        isMovie,
        trailer,
        goToPreviousEpisode,
        goToNextEpisode,
        currentEpisodeIndex,
        currentSeason,
        canGoToPreviousEpisode,
        canGoToNextEpisode,
        theaterMode,
        videoStretch,
        toggleTheaterMode,
        toggleVideoStretch,
      }}
    >
      <VideoContainer />
    </OSVideoContext.Provider>
  );
}
