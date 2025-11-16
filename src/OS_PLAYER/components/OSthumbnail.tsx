import { useRef, useState, useEffect } from "react";
import {
  FullscreenOffIcon,
  FullscreenOnIcon,
  PauseIcon,
  PlayIcon,
  SoundIcon,
  SoundOffIcon,
} from "./OsIcons";
import useOSPlayer from "./useOSPlayer";
import { ControlButton } from "./OScontrols";
// import { useUpdateQueryParams } from "../../lib/hooks/useUpdateQueryParams";
import { Link } from "react-router";

export default function OSthumbnail() {
  const {
    setFirstLoad,
    firstLoad,
    play,
    pause,
    thumbnail,
    alt,
    autoplay,
    preroll,
    videoSource,
    toggleFullscreen,
    fullscreen,
    isMovie,
    setAdPlayed,
  } = useOSPlayer();

  const [showPreroll, setShowPreroll] = useState(false);
  const [adPlaying, setAdPlaying] = useState(false);
  const [start, setStart] = useState(false);
  const [skipCountdown, setSkipCountdown] = useState(8);
  const [skipLocked, setSkipLocked] = useState(true);
  const [adMuted, setAdMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [adCurrentTime, setAdCurrentTime] = useState(0);
  const [adDuration, setAdDuration] = useState(0);
  const [adVideoKey, setAdVideoKey] = useState(0);

  // Reset preroll state when video source changes (episode change)
  useEffect(() => {
    if (videoSource && !firstLoad) {
      // Stop current ad video if playing
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }

      // Episode changed, reset preroll state completely
      setShowPreroll(true);
      setAdPlayed(false);
      pause();
      setAdPlaying(false);
      setStart(true); // Set to true so ad can start immediately
      setSkipCountdown(8);
      setSkipLocked(true);
      setIsPlaying(false);
      setAdCurrentTime(0);
      setAdDuration(0);
      setAdMuted(false); // Reset mute state too
      setAdVideoKey((prev) => prev + 1); // Force video element recreation
    }
  }, [videoSource, firstLoad]);

  const startMovie = () => {
    setFirstLoad(true);
    setStart(true);
    if (preroll && preroll.video) {
      setShowPreroll(true);
      setSkipLocked(true);
      setSkipCountdown(8);
    } else {
      setAdPlayed(true);
      play();
    }
  };

  // Auto-start ad when autoplay is enabled
  useEffect(() => {
    if (autoplay && preroll && preroll.video && !start) {
      startMovie();
    }
  }, [autoplay, preroll, start]);

  // Countdown effect for skip button
  useEffect(() => {
    let timer: any;
    if (showPreroll && adPlaying && skipCountdown > 0) {
      timer = setTimeout(() => setSkipCountdown((c) => c - 1), 1000);
    }
    if (skipCountdown === 0) setSkipLocked(false);
    return () => clearTimeout(timer);
  }, [showPreroll, adPlaying, skipCountdown]);

  // Ensure video is muted/unmuted when adMuted changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = adMuted;
    }
  }, [adMuted, showPreroll]);
  if (autoplay && !showPreroll) return null;
  const handleAdEnded = () => {
    setShowPreroll(false);
    setAdPlaying(false);
    setTimeout(() => {
      setAdPlayed(true);
      play();
    }, 100);
  };

  const handleSkipAd = () => {
    if (skipLocked) return;
    setShowPreroll(false);
    setAdPlaying(false);
    setTimeout(() => {
      setAdPlayed(true);
      play();
    }, 100);
  };

  const handleMuteToggle = () => {
    setAdMuted((m) => !m);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (adPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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
  function addStringToThumbnail(thumbnailUrl: string, stringToAdd: string) {
    const fileName = thumbnailUrl.split(".").slice(0, -1).join(".");
    const fileExtension = thumbnailUrl.split(".").pop();
    const newFileName = `${fileName}${stringToAdd}.${fileExtension}`;
    return newFileName;
  }
  const thumbnail_sm2 = addStringToThumbnail(thumbnail, "_sm");
  if (videoSource == "announce") {
    return (
      <div
        className={`z-10 absolute top-0 left-0 h-full w-full justify-center items-center cursor-pointer bg-black `}
      >
        <img
          className="h-full w-full absolute top-0 left-0 object-cover"
          src={thumbnail}
          alt={alt ? alt : ""}
          loading="eager"
          fetchPriority="high"
        />

        <div className="z-[2] relative flex justify-center items-center h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.05)]">
          <div className="mobile:text-[16px] text-[14px] px-4 py-2   max-os_player_mobile:h-12 flex justify-center items-center rounded-md bg-[rgba(0,0,0,0.5)] ">
            ფილმი მალე დაემატება
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showPreroll && preroll && preroll.video ? (
        <div className="absolute inset-0 z-[6] bg-black flex items-center justify-center">
          {preroll.link && (
            <Link
              className="h-full w-full absolute top-0 left-0 z-[2]"
              target="_blank"
              to={preroll.link}
            />
          )}
          <video
            key={adVideoKey}
            ref={videoRef}
            src={preroll.video}
            playsInline
            webkit-playsinline
            autoPlay
            controls={false}
            muted={adMuted}
            className="w-full h-full object-contain"
            onEnded={handleAdEnded}
            onError={handleAdEnded}
            onPlay={() => {
              setAdPlaying(true);
              setIsPlaying(true);
              pause();
            }}
            onPause={() => {
              setAdPlaying(false);
              setIsPlaying(false);
            }}
            onTimeUpdate={() => {
              if (videoRef.current)
                setAdCurrentTime(videoRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) setAdDuration(videoRef.current.duration);
            }}
          />
          {/* Timeline/Progress Bar */}

          {/* Ad Controls */}
          <AdControls
            isPlaying={isPlaying}
            togglePlay={handlePlayPause}
            adMuted={adMuted}
            toggleMute={handleMuteToggle}
            fullscreen={fullscreen}
            toggleFullscreen={toggleFullscreen}
            adCurrentTime={adCurrentTime}
            adDuration={adDuration}
          />
          {/* Skip Button */}
          <button
            onClick={handleSkipAd}
            disabled={skipLocked}
            className={`absolute flex h-[50px] w-[210px] z-10 bottom-15 right-4 bg-bodyBg overflow-hidden   items-center justify-center ${
              skipLocked
                ? "cursor-default "
                : "cursor-pointer hover:bg-bodyBg/80"
            }`}
          >
            <div className="text-[13px] text-textDescLight2 flex h-full w-full justify-center items-center ">
              {skipLocked ? (
                <>
                  გამოტოვეთ <br /> {skipCountdown} წამში
                </>
              ) : (
                <>გამოტოვეთ რეკლამა</>
              )}
            </div>{" "}
            <img
              src={getThumbnailUrl(videoSource ? videoSource : thumbnail_sm2)}
              onError={(e) => (e.currentTarget.src = thumbnail_sm2)}
              className="h-full aspect-video object-cover top-0 left-0"
              loading="lazy"
              alt={alt ? alt : ""}
              width={210}
              height={50}
            />
          </button>
        </div>
      ) : null}
      <div
        className={`z-10 absolute top-0 left-0 h-full w-full justify-center items-center cursor-pointer bg-black ${
          start || !firstLoad ? "hidden" : "flex"
        }`}
        onClick={startMovie}
      >
        {!start && firstLoad ? (
          <img
            className="h-full w-full absolute top-0 left-0 object-cover"
            src={thumbnail}
            alt={alt ? alt : ""}
            loading="eager"
            fetchPriority="high"
          />
        ) : null}
        <div className="z-[2] relative flex justify-center items-center h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.05)]">
          <div className="aspect-square h-14 max-os_player_mobile:h-12 flex justify-center items-center rounded-[50%] bg-[rgba(0,0,0,0.5)] ">
            <PlayIcon className="h-10 max-os_player_mobile:h-8 translate-x-0.5 opacity-90 " />
          </div>
        </div>
      </div>
    </>
  );
}

// AdControls component for preroll ad
function AdControls({
  isPlaying,
  togglePlay,
  adMuted,
  toggleMute,
  fullscreen,
  toggleFullscreen,
  adCurrentTime,
  adDuration,
}: {
  isPlaying: boolean;
  togglePlay: () => void;
  adMuted: boolean;
  toggleMute: () => void;
  fullscreen: boolean;
  toggleFullscreen: () => void;
  adCurrentTime: number;
  adDuration: number;
}) {
  const progress = adDuration > 0 ? (adCurrentTime / adDuration) * 100 : 0;

  return (
    <div
      className={`absolute w-full bottom-0  h-[53px]  px-4.5 max-os_player_mobile:px-3 flex justify-center transition-[opacity,visibility] z-[5] opacity-100 visible`}
    >
      <div
        className={`absolute bottom-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent h-[120px] pointer-events-none`}
      />
      <div className="w-full h-full flex flex-col select-none z-[2]">
        <div className="relative flex w-full h-2 rounded-sm cursor-pointer items-center touch-none group">
          {/* Background track */}
          <div className="absolute w-full h-[4px] bg-white/10 "></div>
          {/* Progress track */}
          <div
            className="absolute z-[1] flex items-center h-[4px] bg-main pointer-events-none transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex flex-1 h-full items-center px-1 w-full z-10 relative gap-3 justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <ControlButton
              onClick={togglePlay}
              className="w-6 flex justify-center items-center cursor-pointer"
            >
              {isPlaying ? (
                <PauseIcon className="mobile:h-5 h-4.5 cursor-pointer" />
              ) : (
                <PlayIcon className="mobile:h-6.5 h-6 cursor-pointer" />
              )}
            </ControlButton>
            <ControlButton
              onClick={toggleMute}
              className="w-6 flex justify-center items-center cursor-pointer"
            >
              {adMuted ? (
                <SoundOffIcon className="h-6 aspect-square" />
              ) : (
                <SoundIcon className="h-6 aspect-square" />
              )}
            </ControlButton>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <ControlButton onClick={toggleFullscreen}>
              {fullscreen ? (
                <FullscreenOffIcon className="mobile:h-4.5 h-4 cursor-pointer [&>path]:fill-main" />
              ) : (
                <FullscreenOnIcon className="mobile:h-4.5 h-4 cursor-pointer" />
              )}
            </ControlButton>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
