export type URL = {
  id: string;
  url: string;
  shortUrl: string;
  code: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
  };
};
