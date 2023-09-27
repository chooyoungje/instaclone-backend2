import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unFollowUser: protectedResolver(async (_, { username }, { loggedInUser, client }) => {
      const existingUser = await client.user.findUnique({ where: { username } });
      if (!existingUser) {
        return {
          ok: false,
          error: "언팔로우 대상이 없습니다",
        };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            disconnect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
