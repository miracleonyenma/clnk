import type { GraphQLRequestOptions } from "~/types/graphql";
import type { URL } from "~/types/url";

type GetUrlsResponse = {
  getUrls: {
    data: URL[];
    meta: {
      page: number;
      total: number;
      pages: number;
      limit: number;
    };
  };
};

type GetUrlsUrlInput = {
  pagination: {
    page: number;
    limit: number;
  };
  filter?: {
    url?: string;
    code?: string;
    shortUrl?: string;
    user?: string;
  };
};

const GET_URLS_QUERY = `#graphql
query GetUrls($pagination: Pagination, $filter: UrlFilter) {
  getUrls(pagination: $pagination, filter: $filter) {
    data {
      id
      url
      shortUrl
      code
      user {
        id
        name
        email
        emailVerified
      }
      createdAt
    }
    meta {
      page
      limit
      pages
      total
    }
  }
}
`;

const getUrls = async (input: GetUrlsUrlInput) => {
  const options: GraphQLRequestOptions = {
    query: GET_URLS_QUERY,
    variables: {
      pagination: input.pagination,
      filter: input.filter,
    },
  };

  const response = await graphQLRequest<GetUrlsResponse>(
    "/api/graphql",
    options,
  );

  // console.log("🍇🍇🍇🍇🍇 ~ getUrls response:", response);

  return response;
};

export default getUrls;
