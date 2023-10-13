import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const findPhoto = await client.photo.findUnique({ where: { id }, select: { userId: true } });
      // 사진을 찾지 못하는 경우
      if (!findPhoto) {
        return {
          ok: false,
          error: "사진을 찾지 못 했습니다",
        };
        // 사진을 찾았는데 올린 유저와 지울려는 유적 다른 경우
      } else if (findPhoto.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: " 지울려는 사진의 주인과 다릅니다",
        };
        // 사진도 찾았고 올린 유저와 지울려는 유저가 같으 경우
      } else {
        await client.photo.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};
