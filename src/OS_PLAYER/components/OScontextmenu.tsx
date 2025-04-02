import { useState, useRef, useEffect, useCallback } from "react";
import { useOSPlayer } from "../OSVideoPlayer";

interface ContextMenuItem {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface OSContextMenuProps {
  items: ContextMenuItem[];
  className?: string;
}

export default function OScontextmenu({
  items,
  className = "",
}: OSContextMenuProps) {
  const { playerRef } = useOSPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);

  const handlePlayerInteraction = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!playerRef.current) return;

      e.preventDefault();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsOpen(true);

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const playerRect = playerRef.current.getBoundingClientRect();
      const x = clientX - playerRect.left;
      const y = clientY - playerRect.top;

      setPosition({ x, y });

      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    },
    [playerRef]
  );

  const handleAction = useCallback((action: () => void) => {
    action();
    setIsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleClickOutside = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsOpen(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    },
    [playerRef]
  );

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    player.addEventListener("contextmenu", handlePlayerInteraction);
    document.addEventListener("click", handleClickOutside);

    return () => {
      player.removeEventListener("contextmenu", handlePlayerInteraction);
      document.removeEventListener("click", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handlePlayerInteraction, handleClickOutside, playerRef]);

  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50  bg-[#2d2d2d] rounded shadow-lg border border-[#404040] min-w-[150px] ${className}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <a
            href="https://lukafexshvelashvili.github.io/OnService-V2/"
            target="_blank"
            className="cursor-pointer flex items-center justify-center w-full px-3 py-2 font-os_medium text-[12px] tracking-wide text-[rgba(255,255,255,0.9)] text-center transition-colors "
          >
            OnService Player v1.0
          </a>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => !item.disabled && handleAction(item.action)}
              disabled={item.disabled}
              className={`flex items-center w-full px-3 py-2 font-os_medium text-left text-[12px] tracking-wide text-[rgba(255,255,255,0.9)] hover:bg-[#3d3d3d] transition-colors ${
                item.disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
