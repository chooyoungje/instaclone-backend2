import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, { username }, { loggedInUser, client }) =>
      client.user.findUnique({
        where: {
          username,
        },
        // include 설정을 해줘야 DB에서 관계설정이 되었있는 것들의 값들을 불러옴
        include: {
          following: true,
          followers: true,
        },
      })
    ),
  },
};

export default resolvers;
