import client from "../client";
import jwt from "jsonwebtoken";
import { Resolver } from "../types";

// await를 사용했을 떄 내가 모르는 에러가 날 수도 있으니 try catch를 쓰자

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = jwt.verify(token, process.env.SECRET_KEY);

    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({ where: { id: verifiedToken["id"] } });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};
export const protectedResolver = (ourResolver: Resolver) => (root, args, context, info) => {
  console.log("context.loggedInUser : " + context.loggedInUser);
  if (!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return {
        ok: false,
        error: "로그인 먼저하세요",
      };
    }
  }
  return ourResolver(root, args, context, info);
};
