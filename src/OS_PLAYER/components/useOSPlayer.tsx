import { createContext, useContext } from "react";
import { TEpisode, TplayerSettings, TSeriesData } from "../OSVideoPlayer";

export interface OSVideoContextType {
  id: number | string;
  videoRef: React.RefObject<null | HTMLVideoElement>;
  playerRef: React.RefObject<null | HTMLDivElement>;
  isPlaying: boolean;
  preroll: { link: string; video: string } | null;
  adPlayed: boolean;
  setAdPlayed: (played: boolean) => void;
  fullscreen: boolean;
  sound: number;
  duration: number;
  videoSource: string | undefined;
  currentSource: TEpisode;
  playerSettings: TplayerSettings;
  episodes?: TSeriesData;
  showControls: boolean;
  firstLoad: boolean;
  isLoading: boolean;
  autoplay?: boolean;
  thumbnail: string;
  alt?: string;
  srcset?: string;
  isMovie: boolean;
  trailer: string;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleSound: () => void;
  changeVideoTime: Function;
  setVideoSource: Function;
  toggleFullscreen: () => void;
  setCurrentSource: Function;
  setPlayerSettings: Function;
  changeVideoVolume: Function;
  FullscreenOn: Function;
  setShowControls: Function;
  setFirstLoad: Function;
  setIsLoading: Function;
  goToPreviousEpisode: () => void;
  goToNextEpisode: () => void;
  currentEpisodeIndex: number;
  currentSeason: number;
  canGoToPreviousEpisode: boolean;
  canGoToNextEpisode: boolean;
  theaterMode: boolean;
  videoStretch: boolean;
  toggleTheaterMode: () => void;
  toggleVideoStretch: () => void;
}

export const OSVideoContext = createContext<OSVideoContextType | null>(null);
export default function useOSPlayer() {
  const context = useContext(OSVideoContext);
  if (!context)
    throw new Error("useOSPlayer must be used within an OSVideoProvider");
  return context;
}
