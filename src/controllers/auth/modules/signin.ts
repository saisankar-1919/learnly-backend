import { CustomError } from "../../../helpers/customError";
import { jwtVerifyAsync } from "../../../helpers/jwtVerify";
import {
  encryptPassword,
  isPasswordValid,
} from "../../../helpers/passwordProtection";
import prisma from "../../../helpers/prismaClient";
import bcrypt from "bcrypt";

const signin = async (args, req) => {
  try {
    if (!args.email || !args.password) {
      throw new CustomError(
        "Email and password must be provided",
        "BAD_REQUEST"
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(args.email)) {
      throw new CustomError("Invalid email format", "BAD_REQUEST");
    }

    const user = await prisma.users.findUnique({
      where: { email: args.email },
    });

    if (!user) {
      throw new CustomError(
        "User does not exist with this email address",
        "NOT_FOUND"
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      args.password,
      user.password
    );

    if (isPasswordCorrect) {
      return {
        is_user_exist: true,
        auth_token: user.auth_token,
      };
    } else {
      throw new CustomError("Password is incorrect", "UNAUTHORIZED");
    }
  } catch (error) {
    console.error(error);

    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : error.message;

    throw new CustomError(errorMessage, error.code || "INTERNAL_SERVER_ERROR");
  } finally {
    prisma.$disconnect();
  }
};

export default signin;
