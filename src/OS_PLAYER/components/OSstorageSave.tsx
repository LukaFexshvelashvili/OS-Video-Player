import { useEffect } from "react";
import { useOSPlayer } from "../OSVideoPlayer";

type Tstorage = {
  id: number | string;
  time: number | string;
  episode?: { season: number | string; episode: string | number };
};

export default function OSstorageSave() {
  const { id, videoRef, isPlaying } = useOSPlayer();
  useEffect(() => {
    const storedData = localStorage.getItem("os_player");
    let storage: Tstorage[] = storedData ? JSON.parse(storedData) : [];

    let data = storage.find((item) => String(item.id) === String(id));
    if (data) {
      if (videoRef.current) {
        videoRef.current.currentTime = Number(data.time);
      }
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!id || !videoRef.current || !isPlaying) return;
      if (localStorage.getItem("os_player")) {
        const storedData = localStorage.getItem("os_player");
        let storage: Tstorage[] = storedData ? JSON.parse(storedData) : [];
        let data = storage.find((item) => String(item.id) === String(id));
        if (data) {
          data.time = videoRef.current.currentTime;
        } else {
          data = {
            id,
            time: videoRef.current.currentTime,
          };
          if (storage.length > 5) {
            storage.splice(4);
          }
          storage.unshift(data);
        }

        localStorage.setItem(`os_player`, JSON.stringify(storage));
      } else {
        if (isPlaying && videoRef.current) {
          const savedData: Tstorage = {
            id: id,
            time: videoRef.current.currentTime,
          };
          localStorage.setItem(`os_player`, JSON.stringify([savedData]));
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [id, isPlaying]);

  return null;
}
