import { TMovieCard } from "./MovieTypes";

export type THomeList = {
  watch_history: TMovieCard[];
  news: TMovieCard[];
  populars: TMovieCard[];
  main_slider: TMovieCard[];
  movies: TMovieCard[];
  tv_shows: TMovieCard[];
  animations: TMovieCard[];
  animes: TMovieCard[];
};
