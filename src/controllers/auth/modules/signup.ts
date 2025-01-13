import prisma from "../../../helpers/prismaClient";

const signup = async (args, req) => {
  try {
    console.log("args:", args);
    console.log("req:", req);
  } catch (error) {
    throw new Error(JSON.stringify({ custom_error: req.t("user_not_exist") }));
  }
};

export default signup;
