export type URL = {
  id: string;
  url: string;
  shortUrl: string;
  code: string;
  image?: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
  };
};
