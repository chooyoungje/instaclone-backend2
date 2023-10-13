import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyWord, page }) => {
      const findUsers = await client.user.findMany({
        where: { username: { contains: keyWord.toLowerCase() } },
        take: 3,
        skip: (page - 1) * 3,
      });
      if (!findUsers) {
        return {
          ok: false,
          error: "찾고자 하는 유저가 없습니다",
        };
      }
      const totalSearchUser = findUsers.length;
      return {
        page: Math.ceil(totalSearchUser / 3),
        users: findUsers,
      };
    },
  },
};
