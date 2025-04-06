import { useEffect } from "react";
import { useOSPlayer } from "../OSVideoPlayer";
import Hls from "hls.js"; // You'll need to install hls.js

export default function OSvideoShow() {
  const { videoRef, videoSource, play, firstLoad } = useOSPlayer();

  useEffect(() => {
    if (!videoSource) return;
    console.log(videoSource);

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

  return <video ref={videoRef} className="w-full" />;
}
