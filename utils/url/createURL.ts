import type { GraphQLRequestOptions } from "~/types/graphql";
import type { URL } from "~/types/url";

type CreateUrlResponse = {
  createUrl: URL;
};

type CreateUrlInput = {
  url: string;
  code?: string;
  image?: string;
  shorten?: boolean;
};

const CREATE_URL_QUERY = `#graphql
mutation CreateUrl($input: CreateUrlInput!) {
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
    image
    updatedAt
  }
}
`;

const createURL = async (input: CreateUrlInput, token?: string) => {
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
