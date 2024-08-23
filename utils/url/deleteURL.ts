import type { GraphQLRequestOptions } from "~/types/graphql";
import type { URL } from "~/types/url";

type DeleteUrlResponse = {
  deleteUrl: boolean;
};

type DeleteUrlInput = string;

const DELETE_URL_QUERY = `#graphql
mutation DeleteUrl($deleteUrlId: ID!) {
  deleteUrl(id: $deleteUrlId)
}`;

const deleteURL = async (deleteUrlId: DeleteUrlInput, token?: string) => {
  const options: GraphQLRequestOptions = {
    query: DELETE_URL_QUERY,
    variables: {
      deleteUrlId,
    },
  };

  const headers: {
    [key: string]: string;
  } = {};

  token && (headers.Authorization = `Bearer ${token}`);

  const response = await graphQLRequest<DeleteUrlResponse>(
    "/api/graphql",
    options,
    headers,
  );

  console.log("🍇🍇🍇🍇🍇 ~ deleteUrl response:", response);

  return response;
};

export default deleteURL;
