const axios = require("axios");
const { AUTH_SERVICE_URL } = require("../config/constants");
const { client } = require("../utils/statusCodes");

const fetchUser = async (authToken, userId) => {
  let user;
  try {
    user = await axios.get(`${AUTH_SERVICE_URL}/profile/${userId}`, {
      headers: {
        authtoken: authToken,
      },
    });
    return user.data;
  } catch (error) {
    const data = error.response.data;
    return {
      data: data.data,
      message: data.message,
      success: false,
      error: data.error,
      status: error.response.status,
    };
  }
};

const isLoggedIn = async (req, res, next) => {
  if (!req.headers.authtoken) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Unauthorized user",
      success: false,
      error: "Unauthorized",
    });
  }
  if (!req.body.user_id) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Unknown user. Please provide the userId.",
      success: false,
      error: "Unauthorized",
    });
  }

  const user = await fetchUser(req.headers.authtoken, req.body.user_id);
  if (!user.success) {
    return res.status(user.status).json({
      data: user.data,
      message: user.message,
      success: false,
      error: user.error,
    });
  }

  next();
};

module.exports = {
    isLoggedIn
}
