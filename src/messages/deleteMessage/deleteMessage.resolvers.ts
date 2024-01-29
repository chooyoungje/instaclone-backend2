import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const findMessage = await client.message.findFirst({
        where: { id, userId: loggedInUser.id },
        select: { userId: true },
      });
      if (!findMessage) {
        return {
          ok: false,
          error: "권한이 없습니다",
        };
      }
      await client.message.delete({ where: { id } });
      return {
        ok: true,
      };
    }),
  },
};
