import { encryptPassword } from "../../../helpers/passwordProtection";
import prisma from "../../../helpers/prismaClient";
const bcrypt = require("bcrypt");
const signup = async (args, req) => {
  console.log("args: ", args);
  try {
    const { name, email, phone, password } = args;

    //check for existing user
    const existingUser = await prisma.users.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error(
        JSON.stringify({ custom_error: "User already exist on this email" })
      );
    } else {
      //return newUser;
    }
  } catch (error) {
    console.log("error:", error);

    // Check if the error has a `custom_error` property
    const parsedError = JSON.parse(error.message || "{}");
    if (parsedError.custom_error) {
      // Re-throw the same error to the caller
      throw error;
    }

    // For all other errors, use the default fallback message
    const errorMessage = req?.t
      ? req.t("something_went_wrong")
      : "Something went wrong";

    throw new Error(JSON.stringify({ custom_error: errorMessage }));
  }
};

export default signup;
