import { useEffect } from "react";
import useOSPlayer from "./useOSPlayer";

// @ts-ignore
import Hls from "hls.js";

export default function OSvideoShow() {
  const {
    videoRef,
    videoSource,
    play,
    firstLoad,
    adPlayed,
    pause,
    videoStretch,
  } = useOSPlayer();
  useEffect(() => {
    if (!videoSource) return;
    const isM3U8 =
      videoSource.endsWith(".m3u8") ||
      videoSource.includes(".m3u8?") ||
      videoSource.includes("master.m3u8");

    if (isM3U8) {
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls();
        hls.loadSource(videoSource);
        hls.attachMedia(videoRef.current);
        if (!firstLoad) {
          play();
        }

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current?.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoSource;
        if (!firstLoad) {
          play();
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.src = videoSource;
        if (!firstLoad) {
          play();
        }
      }
    }
  }, [videoSource, videoRef, firstLoad]);
  useEffect(() => {
    if (!adPlayed) {
      pause();
    }
  }, [adPlayed]);

  if (videoSource?.includes("youtu.be")) {
    const getEmbedUrl = (url: string): string => {
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
      }
      return url;
    };

    return (
      <iframe
        src={getEmbedUrl(videoSource)}
        allow=" web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full z-[8]"
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className={`w-full h-full ${
          videoStretch ? "object-fill" : "object-contain"
        }`}
      />

      {/* <video ref={videoRef} className="w-full h-full" />; */}
    </>
  );
}
