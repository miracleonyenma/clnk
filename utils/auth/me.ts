import type { User } from "~/types/user";
import type { GraphQLRequestOptions } from "../../types/graphql";

type MeResponse = {
  me: User;
};

type MeInput = {};

const ME_QUERY = `#graphql
query Me {
  me {
    id
    name
    email
    emailVerified
    roles {
      id
      name
    }
  }
}`;

const me = async (input: MeInput, url?: string) => {
  const options: GraphQLRequestOptions = {
    query: ME_QUERY,
    variables: input,
  };

  const response = await graphQLRequest<MeResponse>(
    url ? url : `/api/graphql`,
    options,
  );

  // console.log("🍇🍇🍇🍇🍇 ~ me response:", response);

  return response;
};

export default me;
