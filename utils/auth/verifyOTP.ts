import type { GraphQLRequestOptions } from "~/types/graphql";
import type { User } from "~/types/user";

type VerifyOTPResponse = {
  register?: {
    user?: User;
  };
};

type VerifyOTPInput = {
  email: string;
  otp: string;
};

const VERIFY_OTP_QUERY = `#graphql
mutation VerifyOTP($input: VerifyOTPInput!) {
  verifyOTP(input: $input)
}`;

const verifyOTP = async (input: VerifyOTPInput) => {
  const options: GraphQLRequestOptions = {
    query: VERIFY_OTP_QUERY,
    variables: {
      input,
    },
  };

  const response = await graphQLRequest<VerifyOTPResponse>(
    "/api/graphql",
    options,
  );

  console.log("🍇🍇🍇🍇🍇 ~ verifyOTP response:", response);

  return response;
};

export default verifyOTP;
