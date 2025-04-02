import { useEffect, useState } from "react";

type KeyHandlerMap = {
  [key: string]: (event: KeyboardEvent) => void;
};

export function OSkeyHandler(
  keyHandlers: KeyHandlerMap,
  playerRef: React.RefObject<HTMLDivElement | null>
) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!playerRef.current) return;
    const handleClick = (event: MouseEvent) => {
      if (playerRef.current) {
        const isClickInside =
          playerRef.current === event.target ||
          playerRef.current.contains(event.target as Node);

        setIsFocused(isClickInside);
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isFocused && keyHandlers[event.code]) {
        keyHandlers[event.code](event);
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      if (!playerRef.current) return;

      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyHandlers, isFocused, playerRef]);

  return null;
}
