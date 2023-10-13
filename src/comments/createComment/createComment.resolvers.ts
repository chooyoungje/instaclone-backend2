import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default {
  Mutation: {
    createComment: protectedResolver(async (_, { photoId, payload }, { loggedInUser }) => {
      const findPhoto = await client.photo.findUnique({
        where: { id: photoId },
        select: {
          id: true,
        },
      });

      if (!findPhoto) {
        return {
          ok: false,
          error: "사진이 존재하지 않습니다",
        };
      }
      await client.comment.create({
        data: {
          payload,
          photo: {
            connect: {
              id: photoId,
            },
          },
          user: {
            connect: {
              id: loggedInUser.id,
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
