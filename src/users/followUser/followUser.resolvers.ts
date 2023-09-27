import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    // 로그인을 해야 팔로우 가능하게 protectedResolver로 감싸기
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const existingUser = await client.user.findUnique({ where: { username } });
      if (!existingUser) {
        return {
          ok: false,
          error: "팔로우하려는 유저가 없습니다",
        };
      }
      // 관계를 설정하고 값을 바꿀때에는 update 사용
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            connect: {
              // 특별할 값으로만 업데이트할 수 있음
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
    unFollowUser: protectedResolver(async () => {}),
  },
};
