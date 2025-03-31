import { useOSPlayer } from "../OSVideoProvider";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function OStimeDisplay() {
  const { currentTime, duration } = useOSPlayer();

  return (
    <div className="text-white text-[12px] flex items-center tracking-wider font-os_medium">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
}
