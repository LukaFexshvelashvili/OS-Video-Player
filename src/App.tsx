import OSVideoPlayer from "./OS_PLAYER/OSVideoPlayer";

function App() {
  return (
    <>
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
          episodes={{
            1: [
              {
                title: "სერია 1",
                languages: {
                  GEO: { HD: "video/mp4/video.mp4" },
                  ENG: { HD: "video/mp4/videoENG.mp4" },
                },
              },
              {
                title: "სერია 2",
                languages: {
                  GEO: {
                    SD: "video/mp4/video2.mp4",
                  },
                },
              },
              {
                title: "სერია 3",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_3/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 4",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_4/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 5",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_5/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 6",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_6/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 7",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_7/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 8",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_8/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 9",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_9/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 10",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/1_10/index.m3u84",
                  },
                },
              },
            ],
            2: [
              {
                title: "სერია 1",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_1/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 2",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_2/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 3",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_3/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 4",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_4/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 5",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_5/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 6",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_6/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 7",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_7/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 8",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_8/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 9",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_9/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 10",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_10/index.m3u84",
                  },
                },
              },
            ],
            42: [
              {
                title: "სერია 1",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_1/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 2",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_2/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 3",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_3/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 4",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_4/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 5",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_5/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 6",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_6/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 7",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_7/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 8",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_8/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 9",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_9/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 10",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/2_10/index.m3u84",
                  },
                },
              },
            ],
            3: [
              {
                title: "სერია 1",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_1/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 2",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_2/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 3",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_3/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 4",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_4/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 5",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_5/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 6",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_6/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 7",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_7/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 8",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_8/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 9",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_9/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 10",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/3_10/index.m3u8",
                  },
                },
              },
            ],
            4: [
              {
                title: "სერია 1",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_1/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 2",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_2/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 3",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_3/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 4",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_4/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 5",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_5/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 6",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_6/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 7",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_7/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 8",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_8/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 9",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_9/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 10",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/4_10/index.m3u8",
                  },
                },
              },
            ],
            5: [
              {
                title: "სერია 1",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_1/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 2",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_2/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 3",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_3/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 4",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_4/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 5",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_5/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 6",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_6/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 7",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_7/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 8",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_8/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 9",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_9/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 10",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/5_10/index.m3u8",
                  },
                },
              },
            ],
            6: [
              {
                title: "სერია 1",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_1/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 2",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_2/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 3",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_3/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 4",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_4/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 5",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_5/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 6",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_6/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 7",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_7/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 8",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_8/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 9",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_9/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 10",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_10/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 11",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_11/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 12",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_12/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 13",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_13/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 14",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_14/index.m3u8",
                  },
                },
              },
              {
                title: "სერია 15",
                languages: {
                  GEO: {
                    HD: "https://storage.moviesgo.ge/series/Cobra_Kai/6_15/index.m3u8",
                  },
                },
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export default App;
