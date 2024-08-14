import type { GraphQLRequestOptions } from "~/types/graphql";
import type { URL } from "~/types/url";

type GetUrlResponse = {
  getUrl: URL;
};

type GetUrlInput = {
  id?: string;
  code?: string;
};

const GET_URL_QUERY = `#graphql
query GetUrl($getUrlId: ID, $code: String) {
  getUrl(id: $getUrlId, code: $code) {
    id
    url
    shortUrl
    code
    createdAt
    updatedAt
  }
}
`;

const getUrl = async (input: GetUrlInput) => {
  const options: GraphQLRequestOptions = {
    query: GET_URL_QUERY,
    variables: input,
  };

  const response = await graphQLRequest<GetUrlResponse>(
    "/api/graphql",
    options,
  );

  console.log("🍇🍇🍇🍇🍇 ~ getUrl response:", response);

  return response;
};

export default getUrl;
