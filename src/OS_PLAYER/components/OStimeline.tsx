import { useRef, useEffect, useCallback, useMemo } from "react";
import useOSPlayer from "./useOSPlayer";
import { useOSPreviewThumbnails } from "./useOSPreviewThumbnails";
import { formatTime } from "./OStimeDisplay";

export default function OStimeline() {
  const { videoRef, duration, changeVideoTime, videoSource } = useOSPlayer();
  const { getPreviewForTime } = useOSPreviewThumbnails(videoSource);
  const timeline = useRef<HTMLDivElement | null>(null);
  const timeline_helper = useRef<HTMLDivElement | null>(null);
  const timeline_indicator = useRef<HTMLDivElement | null>(null);
  const timeline_indicator_time = useRef<HTMLSpanElement | null>(null);
  const loadedRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const current_preview = useMemo(() => {
    return getPreviewForTime(1, duration) ? true : false;
  }, [videoSource, duration]);
  const percentage_by_time = (duration: number, currentTime: number) => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  const time_by_percentage = (duration: number, percentage: number) => {
    return duration > 0 ? (duration / 100) * percentage : 0;
  };

  const indicatorShow = (offsetX: number, percentage: number) => {
    if (!timeline_indicator.current || !timeline_indicator_time.current) return;
    timeline_indicator.current.style.visibility = "visible";
    timeline_indicator.current.style.opacity = "1";
    if (offsetX > timeline_indicator.current.scrollWidth / 2) {
      timeline_indicator.current.style.left = `${offsetX}px`;
      if (
        offsetX <
        timeline.current!.scrollWidth -
          timeline_indicator.current.scrollWidth / 2
      ) {
        timeline_indicator.current.style.left = `${offsetX}px`;
      } else {
        timeline_indicator.current.style.left = `${
          timeline.current!.scrollWidth -
          timeline_indicator.current.scrollWidth / 2
        }px`;
      }
    } else {
      timeline_indicator.current.style.left = `${
        timeline_indicator.current.scrollWidth / 2
      }px`;
    }
    timeline_indicator_time.current.textContent = formatTime(
      time_by_percentage(duration, percentage)
    );
  };

  const indicatorHide = () => {
    if (!timeline_indicator.current) return;
    timeline_indicator.current.style.visibility = "hidden";
    timeline_indicator.current.style.opacity = "0";
  };

  const peek = useCallback(
    (clientX: number) => {
      if (!timeline.current || !timeline_helper.current) return;

      const rect = timeline.current.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;
      const previewTime = time_by_percentage(duration, percentage);

      // Show time indicator
      indicatorShow(offsetX, percentage);
      timeline_helper.current.style.width = `${percentage}%`;

      // Show preview thumbnail
      const preview = getPreviewForTime(previewTime, duration);

      if (preview && previewRef.current) {
        const previewEl = previewRef.current;

        previewEl.style.backgroundImage = `url(${preview.sheetUrl})`;
        previewEl.style.backgroundPosition = `-${preview.x}px -${preview.y}px`;
        previewEl.style.width = `${preview.width}px`;
        previewEl.style.height = `${preview.height}px`;
      }
    },
    [duration, getPreviewForTime]
  );

  const peekEnd = () => {
    if (!isDraggingRef.current && timeline_helper.current) {
      timeline_helper.current.style.width = "0%";
    }
    indicatorHide();
  };

  const handleSeek = useCallback(
    (clientX: number, indicator_hide?: boolean) => {
      if (!timeline.current) return;

      const rect = timeline.current.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const percentage = Math.max(
        0,
        Math.min(100, (offsetX / rect.width) * 100)
      );
      const previewTime = time_by_percentage(duration, percentage);
      changeVideoTime(previewTime);
      if (percentageRef.current)
        percentageRef.current.style.width = percentage + "%";

      if (!indicator_hide) {
        indicatorShow(offsetX, percentage);
      }
      const preview = getPreviewForTime(previewTime, duration);

      if (preview && previewRef.current) {
        const previewEl = previewRef.current;

        previewEl.style.backgroundImage = `url(${preview.sheetUrl})`;
        previewEl.style.backgroundPosition = `-${preview.x}px -${preview.y}px`;
        previewEl.style.width = `${preview.width}px`;
        previewEl.style.height = `${preview.height}px`;
      }
    },
    [duration, changeVideoTime]
  );

  // Touch event handlers

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches[0]) {
        handleSeek(e.touches[0].clientX);
      }
    },
    [peek]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches[0]) {
        handleSeek(e.touches[0].clientX, true);
      }
    },
    [peek]
  );
  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    if (!isHoveringRef.current) peekEnd();
  }, []);
  // Mouse event handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      isDraggingRef.current = true;
      handleSeek(e.clientX);
    },
    [handleSeek]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleSeek(e.clientX);
      }
    },
    [handleSeek]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (!isHoveringRef.current) peekEnd();
  }, []);
  const updateLine = useCallback(() => {
    if (!videoRef.current || isNaN(videoRef.current?.duration)) return;
    let duration = videoRef.current?.duration;
    if (percentageRef.current) {
      percentageRef.current.style.width =
        percentage_by_time(duration, videoRef.current.currentTime) + "%";
    }
  }, [videoRef.current?.currentTime, videoRef.current?.duration]);
  const updateBuffered = useCallback(() => {
    if (!videoRef.current || !loadedRef.current) return;

    const buffered = videoRef.current.buffered;
    const duration = videoRef.current.duration;

    if (buffered.length) {
      // Get the last buffered range
      const end = buffered.end(buffered.length - 1);
      const percentage = percentage_by_time(duration, end);

      loadedRef.current.style.width = `${percentage}%`;
    }
  }, [videoRef.current?.buffered, videoRef.current?.duration]);

  useEffect(() => {
    const timelineElement = timeline.current;
    if (!timelineElement) return;

    // Add mouse event listeners
    timelineElement.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Add touch event listeners
    timelineElement.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    timelineElement.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd);

    if (!videoRef.current) return;
    videoRef.current.addEventListener("timeupdate", updateLine);
    videoRef.current.addEventListener("progress", updateBuffered);
    videoRef.current.addEventListener("seeked", updateBuffered);
    videoRef.current.addEventListener("loadedmetadata", updateBuffered);
    videoRef.current.addEventListener("load", updateLine);

    return () => {
      // Remove mouse event listeners
      timelineElement.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Remove touch event listeners
      timelineElement.removeEventListener("touchstart", handleTouchStart);
      timelineElement.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      if (!videoRef.current) return;
      videoRef.current.removeEventListener("progress", updateBuffered);
      videoRef.current.removeEventListener("seeked", updateBuffered);
      videoRef.current.removeEventListener("loadedmetadata", updateBuffered);
      videoRef.current.removeEventListener("timeupdate", updateLine);
      videoRef.current.removeEventListener("load", updateLine);
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
  ]);

  return (
    <div
      className="relative flex w-full h-2 rounded-sm cursor-pointer items-center touch-none group"
      onMouseMove={(e) => peek(e.clientX)}
      onMouseEnter={() => (isHoveringRef.current = true)}
      onMouseLeave={() => {
        isHoveringRef.current = false;
        peekEnd();
      }}
      ref={timeline}
    >
      {/* Preview thumbnail */}
      <div
        ref={timeline_indicator}
        className="absolute transition-[visibility,opacity] -translate-x-2/4 bottom-5 pointer-events-none invisible opacity-0 flex flex-col items-center"
      >
        <div
          ref={previewRef}
          className="flex transition-[visibility,opacity] pointer-events-none bg-no-repeat   overflow-hidden items-center justify-center bg-navBg "
        ></div>
        <span
          ref={timeline_indicator_time}
          className={
            !current_preview
              ? "block px-3 py-1.5 tracking-wider text-center w-full font-mainMedium mobile:text-[12px] text-white/90 text-[11px] mobile:py-1 bg-bodyBg"
              : "block px-2 py-1 tracking-wider text-center font-mainMedium mobile:text-[12px] text-white/90 text-[11px] mobile:py-1 bg-main absolute top-0 left-0"
          }
        >
          00:00
        </span>
      </div>

      {/* Background track */}
      <div className="absolute w-full h-[4px] bg-white/10"></div>

      {/* Hover preview track */}
      <div
        ref={timeline_helper}
        className="h-[4px] bg-[#dfdfdf38] pointer-events-none"
      ></div>

      {/* Loaded progress track */}
      <div
        ref={loadedRef}
        className="absolute h-[4px] bg-white/30 pointer-events-none"
      ></div>

      {/* Progress track */}
      <div
        className="absolute z-[1] flex items-center h-[4px] bg-main pointer-events-none before:content-[''] before:absolute before:right-0 before:translate-x-2/4 before:shadow-lg before:pointer-events-none before:scale-0 before:transition-transform group-hover:before:scale-100 before:h-3 before:aspect-square before:rounded-[50%] before:bg-main"
        ref={percentageRef}
      ></div>
    </div>
  );
}
