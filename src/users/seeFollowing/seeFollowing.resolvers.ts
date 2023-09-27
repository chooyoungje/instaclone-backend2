import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const findedUser = await client.user.findUnique({
        where: { username },
        select: {
          id: true,
        },
      });
      if (!findedUser) {
        return {
          ok: false,
          error: "찾고자 하는 유저가 없습니다",
        };
      }
      const following = await client.user.findUnique({ where: { username } }).following({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return {
        ok: true,
        following,
      };
    },
  },
};
