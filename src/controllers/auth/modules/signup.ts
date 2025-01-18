import { encryptPassword } from "../../../helpers/passwordProtection";
import prisma from "../../../helpers/prismaClient";
import { CustomError } from "../../../helpers/customError"; // Importing CustomError
const jwt = require("jsonwebtoken");

const signup = async (args, req) => {
  try {
    const { name, email, phone, password } = args;

    const isValidEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      throw new CustomError("Invalid email format", "INVALID_EMAIL_FORMAT");
    }
    const existingUser = await prisma.users.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new CustomError(
        "User already exists with this email",
        "USER_EXISTS"
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

export default signup;
