export type TUser = {
  id: number;
  nickname: string;
  email: string;
  status: number;
  role: number;
  timespent: number;
  coins: number;
  bookmarks: (string | number)[];
  watch_history: (string | number)[];
  notifications: (string | number)[];
  create_date: string;
};
