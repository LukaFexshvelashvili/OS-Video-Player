import { useEffect, useRef, useState } from "react";
import { SettingsIcon } from "./OsIcons";
import { ControlButton } from "./OScontrols";
import {
  TLanguageOptions,
  TplayerSettings,
  useOSPlayer,
} from "../OSVideoPlayer";

type Props = {};

export default function OScontrolSettings({}: Props) {
  const { playerSettings, playerRef, showControls } = useOSPlayer();
  const settingsBlock = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSection, setActiveSection] = useState("main");
  const toggleSettings = () => {
    if (showSettings) {
      setShowSettings(false);
    } else {
      setShowSettings(true);
    }
  };
  useEffect(() => {
    if (!playerRef.current) return;
    const outSideClick = (e: MouseEvent) => {
      if (
        settingsBlock.current &&
        !settingsBlock.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
      }
    };
    playerRef.current.addEventListener("click", outSideClick);

    return () => {
      if (!playerRef.current) return;
      playerRef.current.removeEventListener("click", outSideClick);
    };
  }, []);
  useEffect(() => {
    if (!showControls) {
      setShowSettings(false);
    }
  }, [showControls]);

  return (
    <>
      <ControlButton className="relative select-none" ref={settingsBlock}>
        <div
          className={`h-[auto]  bg-[#252525] absolute bottom-12 right-0 rounded-sm flex flex-col transition-[opacity,visibility] overflow-hidden ${
            showSettings ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {activeSection == "main" ? (
            <div className="flex flex-col w-[190px]">
              <SettingsButton
                title="ენა"
                value={playerSettings.lang}
                onClick={() => setActiveSection("languages")}
              />
              <SettingsButton
                title="ხარისხი"
                value={playerSettings.quality}
                onClick={() => setActiveSection("qualities")}
              />
              <SettingsButton
                title="სიჩქარე"
                value={playerSettings.speed + "x"}
                onClick={() => setActiveSection("speeds")}
              />
            </div>
          ) : null}
          {activeSection == "languages" ? (
            <SettingsLanguages back={() => setActiveSection("main")} />
          ) : null}
          {activeSection == "qualities" ? (
            <SettingsQualities back={() => setActiveSection("main")} />
          ) : null}
          {activeSection == "speeds" ? (
            <SettingsSpeeds back={() => setActiveSection("main")} />
          ) : null}
        </div>
        <SettingsIcon
          className="h-4.5 cursor-pointer max-os_player_mobile:h-4"
          onClick={toggleSettings}
        />
      </ControlButton>
    </>
  );
}

function SettingsLanguages(props: { back: Function }) {
  const {
    videoRef,
    currentSource,
    setPlayerSettings,
    playerSettings,
    setVideoSource,
  } = useOSPlayer();
  const changeLanguageSource = (key: string, value: TLanguageOptions) => {
    const saved_time = videoRef.current?.currentTime ?? 0;

    setPlayerSettings((state: TplayerSettings) => ({
      ...state,
      lang: key,
    }));
    setVideoSource(value.HD ? value.HD : value.SD);

    const handleLoaded = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = saved_time;
        videoRef.current.removeEventListener("loadedmetadata", handleLoaded);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleLoaded);
    }
  };
  return (
    <div className="flex flex-col w-[100px]">
      <SettingsButtonInside
        center
        title="უკან"
        isActive={false}
        onClick={() => props.back()}
      />
      {Object.entries(currentSource.languages).map(([key, value]) => (
        <SettingsButtonInside
          key={key}
          center
          title={key}
          isActive={key == playerSettings.lang}
          onClick={() => changeLanguageSource(key, value)}
        />
      ))}
    </div>
  );
}

type LanguageKey = "GEO" | "ENG";
function SettingsQualities(props: { back: Function }) {
  const {
    videoRef,
    currentSource,
    setPlayerSettings,
    playerSettings,
    setVideoSource,
  } = useOSPlayer();
  const [quality, setQuality] = useState<number | string>(
    playerSettings.quality
  );
  const changeQualitySource = (key: string, value: string) => {
    const saved_time = videoRef.current?.currentTime ?? 0;

    setQuality(key);
    setPlayerSettings((state: TplayerSettings) => ({
      ...state,
      quality: key,
    }));

    const handleLoaded = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = saved_time;
        videoRef.current.removeEventListener("loadedmetadata", handleLoaded);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleLoaded);
    }

    setVideoSource(value);
  };

  return (
    <div className="flex flex-col w-[100px]">
      <SettingsButtonInside
        center
        title="უკან"
        isActive={false}
        onClick={() => props.back()}
      />
      {currentSource.languages[playerSettings.lang as LanguageKey] &&
        Object.entries(
          currentSource.languages[playerSettings.lang as LanguageKey]!
        ).map(([key, value]) => (
          <SettingsButtonInside
            key={key}
            center
            title={key}
            isActive={key == quality}
            onClick={() => changeQualitySource(key, value)}
          />
        ))}
    </div>
  );
}
function SettingsSpeeds(props: { back: Function }) {
  const { videoRef, playerSettings, setPlayerSettings } = useOSPlayer();

  const [speed, setSpeed] = useState<number | string>(playerSettings.speed);

  let speedList = [1.5, 1.25, 1, 0.75, 0.5];

  return (
    <div className="flex flex-col w-[100px] ">
      <SettingsButtonInside
        center
        title="უკან"
        isActive={false}
        onClick={() => props.back()}
      />
      {speedList.map((link_speed: number) => (
        <SettingsButtonInside
          key={link_speed}
          center
          title={`${link_speed}`}
          isActive={speed == link_speed}
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.playbackRate = link_speed;
              setSpeed(link_speed);
              setPlayerSettings((state: TplayerSettings) => ({
                ...state,
                speed: link_speed,
              }));
            }
          }}
        />
      ))}
    </div>
  );
}

type SProps = {
  title: string;
  value: string;
  onClick: () => void;
};

function SettingsButton({ title, value, onClick }: SProps) {
  return (
    <div
      onClick={onClick}
      className="flex-1 flex items-center px-3  min-h-[36px] justify-between text-white text-[13px] font-os_medium tracking-wider hover:bg-[rgba(255,255,255,0.1)] cursor-pointer"
    >
      <p>{title}</p>
      <p className="text-[rgba(255,255,255,0.6)]">{value}</p>
    </div>
  );
}
type S2Props = {
  title: string;
  isActive: boolean;
  center?: boolean;
  onClick: () => void;
};
function SettingsButtonInside({ title, center, isActive, onClick }: S2Props) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 ${
        center ? "justify-center" : ""
      } flex items-center px-3 justify-between text-white text-[13px] font-os_medium tracking-wider min-h-[36px] ${
        isActive
          ? "bg-main hover:bg-mainHover"
          : "hover:bg-[rgba(255,255,255,0.1)]"
      }  cursor-pointer`}
    >
      <p>{title}</p>
    </div>
  );
}
