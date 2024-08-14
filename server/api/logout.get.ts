export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const access_token = cookies["access_token"];
  const refresh_token = cookies["refresh_token"];

  if (access_token) {
    setCookie(event, "access_token", "", {
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
  }

  if (refresh_token) {
    setCookie(event, "refresh_token", "", {
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
  }

  return {
    statusCode: 200,
    statusMessage: "OK",
    message: "Logged out successfully",
  };
});
