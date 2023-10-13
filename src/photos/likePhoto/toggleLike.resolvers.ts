import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const findPhoto = await client.photo.findUnique({ where: { id } });
      if (!findPhoto) {
        return {
          ok: false,
          error: "사진을 찾지 못했습니다",
        };
      }
      const like = await client.like.findUnique({
        where: {
          photoId_userId: {
            userId: loggedInUser.id,
            photoId: id,
          },
        },
      });
      // like가 있다면 지우기
      if (like) {
        await client.like.delete({
          where: { id: like.id },
        });
      } else {
        // like가 없다면 새로 만들어주기
        await client.like.create({
          data: {
            User: {
              connect: {
                id: loggedInUser.id,
              },
            },
            Photo: {
              connect: {
                id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
