import { useEffect } from "react";

type KeyHandlerMap = {
  [key: string]: (event: KeyboardEvent) => void;
};

export function OSkeyHandler(keyHandlers: KeyHandlerMap) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (keyHandlers[event.code]) {
        keyHandlers[event.code](event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyHandlers]);
}
