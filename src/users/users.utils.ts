import client from "../client";
import * as jwt from "jsonwebtoken";
import { Resolver } from "../types";

// await를 사용했을 떄 내가 모르는 에러가 날 수도 있으니 try catch를 쓰자

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    console.log("토큰 유뮤 확인 후 : " + token);
    console.log("process.env.SECRET_KEY : " + process.env.SECRET_KEY);
    const verifiedToken: any = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifiedToken, verifiedToken.id);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({ where: { id: verifiedToken["id"] } });
      console.log(verifiedToken, verifiedToken.id);
      console.log(user);
      if (user) {
        return user;
      }
    }
    console.log(verifiedToken, verifiedToken.id);
    return null;
  } catch {
    return null;
  }
};
export const protectedResolver = (ourResolver: Resolver) => (root, args, context, info) => {
  console.log("context.loggedInUser : " + context.loggedInUser);
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "로그인 먼저하세요",
    };
  }
  return ourResolver(root, args, context, info);
};
