import prisma from "../../../helpers/prismaClient";

const signup = async (args, req) => {
  try {
    const { name, email, phone } = args;

    //check for existing user
    const existingUser = await prisma.users.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error(
        JSON.stringify({ custom_error: "User already exist on this email" })
      );
    } else {
      const newUser = await prisma.users.create({
        data: {
          name: name,
          phone: phone,
          email: email,
        },
      });

      return newUser;
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
      : "User does not exist or an error occurred.";

    throw new Error(JSON.stringify({ custom_error: errorMessage }));
  }
};

export default signup;
