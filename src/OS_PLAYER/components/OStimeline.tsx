import { useRef, useEffect, useState, useCallback } from "react";
import { useOSPlayer } from "../OSVideoPlayer";
import { formatTime } from "./OStimeDisplay";

export default function OStimeline() {
  const { videoRef, duration, changeVideoTime } = useOSPlayer();
  const timeline = useRef<HTMLDivElement | null>(null);
  const timeline_helper = useRef<HTMLDivElement | null>(null);
  const timeline_indicator = useRef<HTMLDivElement | null>(null);

  const percentageRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);

  const percentage_by_time = (duration: number, currentTime: number) => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  const time_by_percentage = (duration: number, percentage: number) => {
    return duration > 0 ? (duration / 100) * percentage : 0;
  };

  const indicatorShow = (offsetX: number, percentage: number) => {
    if (!timeline_indicator.current) return;
    timeline_indicator.current.style.visibility = "visible";
    timeline_indicator.current.style.opacity = "1";
    timeline_indicator.current.style.left = `${offsetX}px`;
    timeline_indicator.current.textContent = formatTime(
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

      indicatorShow(offsetX, percentage);
      timeline_helper.current.style.width = `${percentage}%`;
    },
    [duration]
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

      changeVideoTime(time_by_percentage(duration, percentage));
      if (percentageRef.current)
        percentageRef.current.style.width = percentage + "%";

      if (!indicator_hide) {
        indicatorShow(offsetX, percentage);
      }
    },
    [duration, changeVideoTime]
  );

  // Touch event handlers

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      isDraggingRef.current = true;

      if (e.touches[0]) {
        handleSeek(e.touches[0].clientX, true);
      }
      e.preventDefault();
    },
    [handleSeek]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches[0]) {
        handleSeek(e.touches[0].clientX);
        e.preventDefault();
      }
    },
    [handleSeek]
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

  useEffect(() => {
    const timelineElement = timeline.current;
    if (!timelineElement) return;

    // Add mouse event listeners
    timelineElement.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Add touch event listeners
    timelineElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    if (!videoRef.current) return;
    videoRef.current.addEventListener("timeupdate", updateLine);
    videoRef.current.addEventListener("load", updateLine);

    return () => {
      // Remove mouse event listeners
      timelineElement.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Remove touch event listeners
      timelineElement.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      if (!videoRef.current) return;
      videoRef.current.removeEventListener("timeupdate", updateLine);
      videoRef.current.removeEventListener("load", updateLine);
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
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
      {/* Background track */}
      <div className="absolute w-full h-[5px] bg-[#dfdfdf38] "></div>

      {/* Hover preview track */}
      <div
        ref={timeline_helper}
        className="h-[5px] bg-[#dfdfdf38] pointer-events-none"
      ></div>

      {/* Progress track */}
      <div
        className="absolute flex items-center h-[5px] bg-main pointer-events-none before:content-[''] before:absolute before:right-0 before:translate-x-2/4 before:shadow-lg before:pointer-events-none before:scale-0 before:transition-transform group-hover:before:scale-100 before:h-3 before:aspect-square before:rounded-[50%] before:bg-main"
        ref={percentageRef}
      ></div>

      <div
        ref={timeline_indicator}
        className="absolute px-2 py-1 transition-[visibility,opacity] -translate-x-2/4 bottom-4 pointer-events-none rounded-sm bg-[#272727] items-center justify-center text-white text-[12px] font-os_medium tracking-wider invisible opacity-0"
      >
        00:00
      </div>
    </div>
  );
}
