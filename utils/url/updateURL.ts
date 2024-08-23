import type { GraphQLRequestOptions } from "~/types/graphql";
import type { URL } from "~/types/url";

type UpdateUrlResponse = {
  updateUrl: URL;
};

type UpdateUrlInput = {
  id: string;
  url: string;
  shortUrl?: string;
  image?: string;
};

const UPDATE_URL_QUERY = `#graphql
mutation UpdateUrl($input: UpdateUrlInput!) {
  updateUrl(input: $input) {
    id
    url
    shortUrl
    code
    image
    user {
      id
      name
      email
      emailVerified
    }
    createdAt
    updatedAt
  }
}
`;

const updateURL = async (input: UpdateUrlInput, token?: string) => {
  const options: GraphQLRequestOptions = {
    query: UPDATE_URL_QUERY,
    variables: {
      input,
    },
  };

  const headers: {
    [key: string]: string;
  } = {};

  token && (headers.Authorization = `Bearer ${token}`);

  const response = await graphQLRequest<UpdateUrlResponse>(
    "/api/graphql",
    options,
    headers,
  );

  console.log("🍇🍇🍇🍇🍇 ~ updateUrl response:", response);

  return response;
};

export default updateURL;
