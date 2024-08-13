export type User = {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  roles?: {
    id?: string;
    name?: string;
  }[];
};
