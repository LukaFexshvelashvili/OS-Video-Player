import OSVideoPlayer from "./OS_PLAYER/OSVideoPlayer";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <OSVideoPlayer
        id={3}
        source={{
          title: "სერია 1",
          languages: {
            GEO: { HD: "video/mp4/video.mp4" },
            ENG: { HD: "video/mp4/videoENG.mp4" },
          },
        }}
        thumbnail="https://cdn.moviesgo.ge/uploads/354/tDe2DMN.webp"
        alt="rick and morty"
        srcset="
        https://cdn.moviesgo.ge/uploads/354/tDe2DMN_sm2.webp 480w,
        https://cdn.moviesgo.ge/uploads/354/tDe2DMN_sm.webp 780w,
        https://cdn.moviesgo.ge/uploads/354/tDe2DMN.webp 1200w "
        episodes={{
          "1": [
            {
              title: "სერია 1",
              languages: {
                GEO: {
                  HD: "video/mp4/video.mp4",
                },
              },
            },
            {
              title: "სერია 2",
              languages: {
                GEO: {
                  HD: "video/mp4/video2.mp4",
                },
              },
            },
            {
              title: "სერია 3",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/1_3/index.m3u8",
                },
              },
            },
            {
              title: "სერია 4",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/1_4/index.m3u8",
                },
              },
            },
            {
              title: "სერია 5",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/1_5/index.m3u8",
                },
              },
            },
            {
              title: "სერია 6",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/1_6/index.m3u8",
                },
              },
            },
          ],
          "2": [
            {
              title: "სერია 1",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/2_1/index.m3u8",
                },
              },
            },
            {
              title: "სერია 2",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/2_2/index.m3u8",
                },
              },
            },
            {
              title: "სერია 3",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/2_3/index.m3u8",
                },
              },
            },
            {
              title: "სერია 4",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/2_4/index.m3u8",
                },
              },
            },
            {
              title: "სერია 5",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/2_5/index.m3u8",
                },
              },
            },
            {
              title: "სერია 6",
              languages: {
                GEO: {
                  HD: "https://storage.moviesgo.ge/series/The_Walking_Dead_Daryl_Dixon/2_6/index.m3u8",
                },
              },
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
