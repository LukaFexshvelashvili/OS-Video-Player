"use client";
import OSVideoPlayer, {
  TEpisode,
  TLanguageOptions,
  TSeriesData,
} from "./OS_PLAYER/OSVideoPlayer";
import { useEffect, useMemo } from "react";
import { image_resize, selectPrerollAd } from "./lib/hooks/Customs";
import { fetchAds, fetchMovie, fetchTmdbMovie } from "./api/ServerFunctions";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

export default function MoviePlayer({ tmdb }: { tmdb?: boolean }) {
  const { id } = useParams();
  const { data: movie_data } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => (tmdb ? fetchTmdbMovie(Number(id)) : fetchMovie(Number(id))),
  });
  const movie = movie_data?.movie;
  // Fetch ads using React Query
  const { data: adsData } = useQuery({
    queryKey: ["ads"],
    queryFn: fetchAds,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Select preroll ad based on percentage weights
  const selectedPreroll = useMemo(() => {
    if (adsData?.data.preroll_ad && adsData.data.preroll_ad.length > 0) {
      const selected = selectPrerollAd(adsData.data.preroll_ad);
      if (selected) {
        return {
          video: selected.video_url,
          link: selected.link,
        };
      }
    }
    // Fallback to default ad
    return {
      video: "https://cdn.croconet.cam/ads/FINAL.mp4",
      link: "",
    };
  }, [adsData]);

  const { playerData, isMovie } = useMemo(() => {
    if (!movie?.players) {
      return { playerData: null, isMovie: false, error: null };
    }

    try {
      const parsedPlayers = JSON.parse(movie.players);
      if (!parsedPlayers[1]) {
        throw new Error("Invalid player data format");
      }

      if (parsedPlayers[1].GEO || parsedPlayers[1].ENG) {
        return {
          playerData: {
            initial: {
              languages: parsedPlayers[1] as {
                GEO?: TLanguageOptions;
                ENG?: TLanguageOptions;
              },
            },
            episodes: null,
          },
          isMovie: true,
          error: null,
        };
      } else {
        return {
          playerData: {
            episodes: parsedPlayers[1] as TSeriesData,
            initial: { ...parsedPlayers[1][1][0] } as TEpisode,
          },
          isMovie: false,
          error: null,
        };
      }
    } catch (err) {
      console.error("Error parsing player data:", err);
      return {
        playerData: null,
        isMovie: false,
        error: "Failed to load video player data",
      };
    }
  }, [movie]);

  const basename = "https://cdn.croconet.cam/";
  const addStringToThumbnail = useMemo(() => {
    return (thumbnailUrl: string, stringToAdd: string) => {
      if (!thumbnailUrl) return "";
      const fileName = thumbnailUrl.split(".").slice(0, -1).join(".");
      const fileExtension = thumbnailUrl.split(".").pop();
      return `${fileName}${stringToAdd}.${fileExtension}`;
    };
  }, []);

  useEffect(() => {
    if (movie?.name) {
      document.title = movie.name;
    }
  }, [movie?.name]);

  if (!adsData?.data.iframe_toggle || adsData?.data.iframe_toggle == "0") {
    return (
      <Link
        to={"https://croconet.cam"}
        target="_blank"
        className="font-mainBold text-white mobile:text-4xl text-2xl flex flex-col items-center justify-center h-screen mobile:gap-6 gap-4"
      >
        <h1>
          {" "}
          CROCO<span className="text-main ">NET</span>.CO
        </h1>
        <h2 className="text-textDesc case_up tracking-wide font-mainMedium mobile:text-xl text-base">
          უყურე ფილმებს ქართულად
        </h2>
      </Link>
    );
  }
  return (
    <>
      {!movie?.players || !playerData?.initial ? (
        <div className="bg-black h-full w-full"></div>
      ) : (
        <div className="w-full h-screen flex">
          <OSVideoPlayer
            preroll={{
              link: selectedPreroll.link,
              video: selectedPreroll.video,
            }}
            key={`${movie.id}`}
            isMovie={isMovie}
            id={movie.id}
            source={playerData.initial}
            thumbnail={image_resize(movie.thumbnail_url).high}
            alt={movie.name + " ქართულად | " + movie.name_eng + " Qartulad"}
            trailer={movie.trailer || ""}
            srcset={`
              ${
                basename +
                addStringToThumbnail(movie.thumbnail_url || "", "_sm2")
              } 480w,
              ${
                basename +
                addStringToThumbnail(movie.thumbnail_url || "", "_sm")
              } 780w,
              ${basename + movie.thumbnail_url} 1200w
            `}
            episodes={
              isMovie && playerData.initial
                ? ({
                    1: [
                      { title: movie.name_eng, ...playerData.initial },
                      {
                        title: "TRAILER",
                        languages: {
                          ENG: {
                            HD: movie.trailer || undefined,
                          },
                        },
                      },
                    ],
                  } as TSeriesData)
                : playerData.episodes || undefined
            }
          />
        </div>
      )}
    </>
  );
}
