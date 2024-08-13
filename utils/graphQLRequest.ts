// utils/graphqlRequest.ts

import type { GraphQLRequestOptions, GraphQLResponse } from "~/types/graphql";

// const graphqlRequest = async <T>(
//   url: string,
//   options: GraphQLRequestOptions,
//   headers?: Record<string, string>,
// ): Promise<GraphQLResponse<T>> => {
//   try {
//     // console.log("⚡️⚡️⚡️⚡️", { variables: options.variables });

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...headers,
//       },
//       body: JSON.stringify(options),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Network error: ${response.status} - ${response.statusText}`,
//       );
//     }

//     const responseBody: GraphQLResponse<T> = await response.json();

//     if (responseBody.errors) {
//       const errorMessages = responseBody.errors
//         .map((error) => error.message)
//         .join("\n");
//       throw new Error(`GraphQL errors: ${errorMessages}`);
//     }

//     return responseBody;
//   } catch (error: any) {
//     console.error(error || "An error occurred");

//     return {
//       data: undefined,
//       errors: [error?.message || "An error occurred"],
//     };
//   }
// };
const graphqlRequest = async <T>(
  url: string,
  options: GraphQLRequestOptions,
  headers?: Record<string, string>,
): Promise<GraphQLResponse<T>> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(options),
  });

  const responseBody: GraphQLResponse<T> = await response.json();

  if (responseBody.errors) {
    console.log("🚨🚨🚨🚨🚨🚨 ~ responseBody.errors:", responseBody.errors);

    const errorMessages = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(errorMessages);
  }

  if (!response.ok && !responseBody.errors) {
    console.log("🚨🚨🚨🚨🚨🚨 ~ response:", { response, responseBody });

    throw new Error(`${response.statusText}`);
  }

  console.log("👕👕👕👕👕👕 ~ responseBody:", responseBody);

  return responseBody;
};

export default graphqlRequest;
