import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(async (_, { id, payload }, { loggedInUser }) => {
      const findComment = await client.comment.findUnique({ where: { id }, select: { userId: true } });
      if (!findComment) {
        return {
          ok: false,
          error: "수정하려는 댓글이 존재하지 않습니다",
        };
      } else if (findComment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "권한이 없습니다",
        };
      } else {
        await client.comment.update({
          where: { id },
          data: {
            payload,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
