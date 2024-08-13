import type { GraphQLRequestOptions } from "~/types/graphql";
import graphqlRequest from "~/utils/graphQLRequest";

const API_KEY = process.env.API_KEY || "";
const GRAPHQL_URL = process.env.GRAPHQL_URL || "http://localhost:8000/graphql";

type RefreshTokenResponse = {
  refreshToken: {
    accessToken: string;
  };
};

type RefreshTokenInput = {
  token: string;
};

const REFRESH_TOKEN_QUERY = `#graphql
mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    accessToken
  }
}`;

const refreshToken = async (
  input: RefreshTokenInput,
  env?: "server" | "client",
) => {
  const options: GraphQLRequestOptions = {
    query: REFRESH_TOKEN_QUERY,
    variables: {
      token: input.token,
    },
  };

  const headers: {
    [key: string]: string;
  } = {};

  if (env == "server") {
    headers["x-api-key"] = API_KEY;
  }

  const response = await graphqlRequest<RefreshTokenResponse>(
    env == "client" ? "/api/graphql" : GRAPHQL_URL,
    options,
    headers,
  );

  // console.log("🍇🍇🍇🍇🍇 ~ refreshToken response:", response);

  return response;
};

export default refreshToken;
