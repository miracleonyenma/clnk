import type { GraphQLRequestOptions } from "~/types/graphql";
import type { User } from "~/types/user";

type RegisterUserResponse = {
  register?: {
    user?: User;
  };
};

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

const CREATE_URL_QUERY = `#graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user {
      id
      name
      email
      emailVerified
    }
  }
}`;

const registerUser = async (input: RegisterUserInput) => {
  const options: GraphQLRequestOptions = {
    query: CREATE_URL_QUERY,
    variables: {
      input,
    },
  };

  const response = await graphQLRequest<RegisterUserResponse>(
    "/api/graphql",
    options,
  );

  // console.log("🍇🍇🍇🍇🍇 ~ registerUser response:", response);

  return response;
};

export default registerUser;
