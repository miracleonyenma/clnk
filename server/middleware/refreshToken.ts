import refreshToken from "~/utils/auth/refreshToken";

export default defineEventHandler(async (event) => {
  // const requestURL = getRequestURL(event)

  const refresh_token = getCookie(event, "refresh_token");
  // console.log("🥖🥖🥖🥖🥖🥖🥖 ~ refreshToken: ", refresh_token);

  try {
    if (refresh_token) {
      const data = await refreshToken({ token: refresh_token }, "server");
      // console.log("🥯🥯🥯🥯🥯🥯🥯🥯🥯🥯 ~ accessToken:", data);
      const access_token = data.data?.refreshToken.accessToken;
      access_token &&
        setCookie(event, "access_token", access_token, {
          sameSite: "none",
          secure: true,
        });
    }
  } catch (error) {
    console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨 ~ error:", error);
    setCookie(event, "access_token", "", {
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });

    setCookie(event, "refresh_token", "", {
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
  }
});
