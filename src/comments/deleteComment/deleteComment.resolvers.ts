import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const findComment = await client.comment.findUnique({
        where: { id },
        select: {
          userId: true,
        },
      });
      if (!findComment) {
        return {
          ok: false,
          error: "지울려는 댓글이 없습니다",
        };
      } else if (findComment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "권한이 없습니다",
        };
      } else {
        await client.comment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};
