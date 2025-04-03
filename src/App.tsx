import { Route, Routes, useParams } from "react-router";
import OSVideoPlayer from "./OS_PLAYER/OSVideoPlayer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:id" element={<Player />} />
      </Routes>
    </>
  );
}
function Player() {
  const { id } = useParams();
  const [firstRender, setFirstRender] = useState<any>(true);
  const [result, setResult] = useState<any>(null);
  const [isMovie, setIsMovie] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    if (id && firstRender) {
      axios
        .get("https://moviesgo.ge/server/getmoviet.php?id=" + id)
        .then((response) => {
          setFirstRender(false);
          if (response.data.exists == true) {
            setResult(response.data.data);
          } else {
            return "ფილმი ვერ მოიძებნა";
          }
        });
    }
  }, []);
  useEffect(() => {
    if (!result?.players) return;
    if (
      JSON.parse(result?.players)[1].GEO ||
      JSON.parse(result?.players)[1].ENG
    ) {
      setIsMovie(true);
      setPlayerData((state: any) => ({
        ...state,
        initial: { languages: { ...JSON.parse(result.players)[1] } },
      }));
    } else {
      setIsMovie(false);

      setPlayerData(() => ({
        episodes: JSON.parse(result.players)[1],
        initial: { ...JSON.parse(result.players)[1][1][0] },
      }));
    }
  }, [result]);
  const basename = "https://cdn.moviesgo.ge/";

  function addStringToThumbnail(thumbnailUrl: string, stringToAdd: string) {
    const fileName = thumbnailUrl.split(".").slice(0, -1).join(".");
    const fileExtension = thumbnailUrl.split(".").pop();

    const newFileName = `${fileName}${stringToAdd}.${fileExtension}`;
    return newFileName;
  }

  if (!playerData)
    return (
      <>
        <div className="flex justify-center items-center h-screen bg-black">
          <div className="absolute z-[2] h-12 aspect-square rounded-[50%] border-4 border-main border-r-transparent animate-spin"></div>
        </div>
      </>
    );
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <OSVideoPlayer
        id={result.id}
        source={playerData.initial}
        thumbnail={basename + result.thumbnail_url}
        alt="rick and morty"
        autoplay
        srcset={`
  ${basename + addStringToThumbnail(result.thumbnail_url, "_sm2")} 480w,
        ${basename + addStringToThumbnail(result.thumbnail_url, "_sm")} 780w,
        ${basename + result.thumbnail_url} 1200w `}
        episodes={!isMovie ? playerData.episodes : null}
      />
    </div>
  );
}

export default App;
