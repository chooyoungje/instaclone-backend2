const bcrypt = require("bcrypt");
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }, { client }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        console.log(existingUser);
        if (existingUser) {
          throw new Error("이미 존재하는 유저이름 또는 이메일 입니다");
        }
        //비밀번호 해싱하기
        const hashedPassword = await bcrypt.hash(password, 13);
        console.log(hashedPassword);
        await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
          error: null,
        };
      } catch (err) {
        return err;
      }
    },
  },
};
export default resolvers;
