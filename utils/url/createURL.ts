import type { GraphQLRequestOptions } from "~/types/graphql";
import type { URL } from "~/types/url";

type CreateUrlResponse = {
  createUrl: URL;
};

type CreateUrlUrlInput = {
  url: string;
  code?: string;
};

const CREATE_URL_QUERY = `#graphql
mutation CreateUrl($input: CreateUrlUrlInput!) {
  createUrl(input: $input){
    id
    url
    shortUrl
    code
    user {
      id
      name
    }
    createdAt
  }
}
`;

const createURL = async (input: CreateUrlUrlInput, token?: string) => {
  const options: GraphQLRequestOptions = {
    query: CREATE_URL_QUERY,
    variables: {
      input,
    },
  };

  const headers: {
    [key: string]: string;
  } = {};

  token && (headers.Authorization = `Bearer ${token}`);

  const response = await graphQLRequest<CreateUrlResponse>(
    "/api/graphql",
    options,
    headers,
  );

  console.log("🍇🍇🍇🍇🍇 ~ createUrl response:", response);

  return response;
};

export default createURL;
