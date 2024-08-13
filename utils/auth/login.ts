import type { GraphQLRequestOptions } from "~/types/graphql";

type User = {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  roles?: {
    id?: string;
    name?: string;
  }[];
};

type LoginUserResponse = {
  login?: {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  };
};

type LoginUserInput = {
  email: string;
  password: string;
};

const CREATE_URL_QUERY = `#graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    user {
      id
      name
      email
      emailVerified
      roles {
        id
        name
      }
    }
  }
}`;

const loginUser = async (input: LoginUserInput) => {
  const options: GraphQLRequestOptions = {
    query: CREATE_URL_QUERY,
    variables: {
      input,
    },
  };

  const response = await graphQLRequest<LoginUserResponse>(
    "/api/graphql",
    options,
  );

  console.log("🍇🍇🍇🍇🍇 ~ loginUser response:", response);

  return response;
};

export default loginUser;
