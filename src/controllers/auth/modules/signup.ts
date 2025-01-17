import { encryptPassword } from "../../../helpers/passwordProtection";
import prisma from "../../../helpers/prismaClient";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (args, req) => {
  console.log("args: ", args);

  try {
    const { name, email, phone, password } = args;

    const existingUser = await prisma.users.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error(
        JSON.stringify({ custom_error: "User already exists with this email" })
      );
    }

    const newUser = await prisma.users.create({
      data: {
        name,
        phone,
        email,
        password: await encryptPassword(password),
      },
    });
    const userId = newUser.id;

    const authToken = jwt.sign(
      { user_id: userId, email: newUser.email },
      process.env.JWT_SECRET
    );

    await prisma.users.update({
      where: { id: userId },
      data: { auth_token: authToken },
    });

    return newUser;
  } catch (error) {
    console.error("Error during signup:", error);

    let errorMessage = "Something went wrong";

    try {
      const parsedError = JSON.parse(error.message || "{}");
      if (parsedError.custom_error) {
        errorMessage = parsedError.custom_error;
      }
    } catch (parseError) {
      console.error("Error parsing error message:", parseError);
    }

    if (req?.t) {
      errorMessage = req.t("something_went_wrong");
    }

    throw new Error(JSON.stringify({ custom_error: errorMessage }));
  }
};

export default signup;
