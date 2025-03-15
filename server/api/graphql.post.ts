import { GraphQLRequestOptions } from "~/types/graphql";
import graphqlRequest from "~/utils/graphQLRequest";

const API_KEY = process.env.API_KEY || "";
const GRAPHQL_URL = process.env.GRAPHQL_URL || "http://localhost:8000/graphql";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cookies = parseCookies(event);
    const query = body?.query;
    const variables = body?.variables;

    const accessToken = cookies["access_token"];

    console.log("🍇🍇🍇🍇🍇 ~ accessToken:", accessToken);

    if (!query) {
      throw createError({
        statusCode: 400,
        statusMessage: "Query is required",
      });
    }

    const options: GraphQLRequestOptions = {
      query,
      variables,
    };

    const headers: {
      [key: string]: string;
    } = {
      "x-api-key": API_KEY,
    };

    accessToken && (headers["Authorization"] = `Bearer ${accessToken}`);

    console.log("🍓🍓🍓🍓🍓🍓 ~ headers:", headers);

    const data = await graphqlRequest(GRAPHQL_URL, options, headers);

    // console.log("🍊🍊🍊🍊🍊🍊🍊🍊 ~ data:", data);

    return data;
  } catch (error: any) {
    // clear cookies
    setCookie(event, "access_token", "", {
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
      message: error.message,
    });
  }
});
