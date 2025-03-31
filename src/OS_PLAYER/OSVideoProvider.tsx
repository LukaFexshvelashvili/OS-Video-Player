import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import VideoContainer from "./OSVideoPlayer";

interface OSVideoContextType {
  videoRef: React.RefObject<null | HTMLVideoElement>;
  isPlaying: boolean;
  sound: number;
  duration: number;
  currentTime: number;
  videoSource: string;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleSound: () => void;
  setVideoSource: Function;
}
const OSVideoContext = createContext<OSVideoContextType | null>(null);

// & FUNCTIONS
export function OSVideoProvider({ children }: { children: ReactNode }) {
  const videoRef = useRef<null | HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoSource, setVideoSource] = useState("video/mp4/video.mp4");

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      if (!isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoSource, videoRef.current]);

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
  return (
    <OSVideoContext.Provider
      value={{
        videoRef,
        isPlaying,
        sound,
        duration,
        currentTime,
        videoSource,
        play,
        pause,
        togglePlay,
        toggleSound,
        setVideoSource,
      }}
    >
      {children}
    </OSVideoContext.Provider>
  );
}

export function useOSPlayer() {
  const context = useContext(OSVideoContext);
  if (!context)
    throw new Error("useOSVideo must be used within an OSVideoProvider");
  return context;
}
export default function OSVideoPlayer() {
  return (
    <OSVideoProvider>
      <VideoContainer />
    </OSVideoProvider>
  );
}
