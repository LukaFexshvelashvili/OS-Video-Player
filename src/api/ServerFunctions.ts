import { api } from "./axios";
export async function add_comment(_: unknown, formData: FormData) {
  const movie_id = formData.get("movie_id");
  const user_id = formData.get("user_id");
  const reply_id = formData.get("reply_id") ? formData.get("reply_id") : null;
  const comment_input = formData.get("comment_input");
  const { data } = await api.post(
    `/actions/comment.php`,
    {
      movie_id,
      user_id,
      comment_input,
      reply_id,
    },
    {
      withCredentials: true,
    }
  );
  return data;
}
export async function loginRequest(_: unknown, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const { data } = await api.post(
      `/auth/login.php`,
      {
        nickname: username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    // Handle 403 status specifically
    if (error.response?.status === 403) {
      throw new Error("არასწორი მომხმარებლის სახელი ან პაროლი");
    }
    // Handle other errors
    throw new Error(
      error.response?.data?.message || "ავტორიზაცია ვერ მოხერხდა"
    );
  }
}
export async function delete_comment(comment_id: number, user_id: number) {
  const { data } = await api.post(
    `/actions/delete_comment.php`,
    { comment_id, user_id },
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function getUser() {
  const { data } = await api.get(`/user/data.php`, {
    withCredentials: true,
  });

  return data;
}

export async function registerRequest(_: unknown, formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const repeat_password = formData.get("repeat_password");
  if (password !== repeat_password) {
    return { status: 12 };
  }
  const { data } = await api.post(
    `/auth.php/register`,
    {
      nickname: username,
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return data;
}
export async function fetchQuickSearch(rawQuery: string) {
  const { data } = await api.get(`/actions/quick_search.php`, {
    params: { title: rawQuery },
  });
  return data;
}
export async function fetchSearch(filters: object) {
  const { data } = await api.get(`/actions/search.php`, {
    params: filters,
  });
  return data;
}

export async function fetchMovies(filters: object) {
  const { data } = await api.get(`/actions/fetch.php`, {
    params: filters,
  });
  return data;
}
export async function fetchComments(params: object) {
  const { data } = await api.get(`/movie/get_comments.php`, {
    params,
  });
  return data;
}

export async function fetchCommentsCount(movie_id: number | string) {
  try {
    const data = await fetchComments({ movie_id });
    return data?.comments?.length || 0;
  } catch (error) {
    console.error("Error fetching comments count:", error);
    return 0;
  }
}
export async function fetchLike(
  movie_id: number,
  user_id: number | undefined | null
) {
  const { data } = await api.get(`/movie/like.php`, {
    params: { movie_id, user_id: user_id ? user_id : null, type: "like" },
  });
  return data;
}
export async function fetchDislike(
  movie_id: number,
  user_id: number | undefined | null
) {
  const { data } = await api.get(`/movie/like.php`, {
    params: { movie_id, user_id: user_id ? user_id : null, type: "dislike" },
  });
  return data;
}
export async function fetchisLiked(
  movie_id: number,
  user_id: number | undefined | null
) {
  const { data } = await api.get(`/movie/is_liked.php`, {
    params: { movie_id, user_id: user_id ? user_id : null },
  });
  return data;
}
export async function fetchMovie(id: number) {
  const { data } = await api.get(`/movie/get.php`, {
    params: { id: id },
  });
  return data;
}
export async function fetchTmdbMovie(id: number) {
  const { data } = await api.get(`/movie/tmdb_get.php`, {
    params: { id: id },
  });
  return data;
}
export async function fetchCasts(mid: number) {
  const { data } = await api.get(
    `https://api.themoviedb.org/3/movie/${mid}/credits`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzAxM2M4ZmIyNTBiZDYzZjQ3N2M5ODU4MDAxODE3MCIsIm5iZiI6MTc0OTE1NTM4MC44NTUsInN1YiI6IjY4NDFmZTM0N2NkZTQ3YzYxOWJmMTY1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rq_DLa8AU3E3PFMdgLIUZDJBw3QzunUBazLDb8W8mNs",
      },
    }
  );
  return data;
}

export async function fetchMoviesList(history?: string[]) {
  const { data } = await api.get("/list/home.php", {
    params: {
      watch_history: history ? JSON.stringify(history) : null,
    },
  });
  return data;
}
export async function fetchHistory(history?: string[]) {
  const { data } = await api.get("/list/history.php", {
    params: {
      watch_history: history ? JSON.stringify(history) : null,
    },
  });
  return data;
}

export async function fetchBookmarks(bookmarks?: (string | number)[]) {
  const { data } = await api.get("/list/bookmarks.php", {
    params: {
      bookmarks: bookmarks ? JSON.stringify(bookmarks) : null,
    },
  });
  return data;
}

export async function fetchMostViews(type?: string | number) {
  const { data } = await api.get("/list/most_viewed.php", {
    params: {
      type,
    },
  });
  return data;
}
export async function sendReport(params: object) {
  const { data } = await api.post(`/actions/report.php`, params);
  return data;
}
export type AdsResponse = {
  status: number;
  data: {
    banners: {
      type: string;
      iframe: string;
      image_url: string;
      link: string;
    }[];
    preroll_ad: {
      id: number;
      video_url: string;
      percentage: number;
      link: string;
    }[];
    iframe_toggle: boolean | string | number;
  };
};
export async function fetchAds(): Promise<AdsResponse> {
  const { data } = await api.get(`/ads/get.php`);
  return data;
}
export async function saveHistory(movie_id: number): Promise<AdsResponse> {
  const { data } = await api.post(`/actions/save_history.php`, {
    movie_id,
  });
  return data;
}
