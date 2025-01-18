import { DecodedToken } from "../types/auth";

const jwt = require("jsonwebtoken");

export const jwtVerifyAsync = (token: string) => {
  return new Promise<DecodedToken>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(
          new Error(
            JSON.stringify({ custom_error: "Invalid authentication token" })
          )
        );
      } else {
        resolve(decoded);
      }
    });
  });
};
