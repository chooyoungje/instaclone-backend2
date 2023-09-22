// 왜 import가 돼지 않는 거지??
const bcrypt = require("bcrypt");

import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      // 이 유저가 있는 찾기
      const findUser = await client.user.findUnique({ where: { username } });

      if (!findUser) {
        return {
          ok: false,
          error: "유저이름이 없습니다",
        };
      }
      // 유저가 있다면 비밀번호 비교하기
      const correctPassword = await bcrypt.compare(password, findUser.password);
      if (!correctPassword) {
        return {
          ok: false,
          error: "비밀번호가 틀립니다",
        };
      }
      // 비번까지 맞다면 토큰 발행하기(jwt)
      const token = await jwt.sign({ id: findUser.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
