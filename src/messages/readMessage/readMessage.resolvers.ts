import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      // 메시지를 찾는데 현재 로그인 되어있는 사용자가 아닌 경우 일 떄만 검색
      // 현재 로그인한 사용자가 들어있는 대화방에서 보내진 메시지를 검색
      const findMessage = await client.message.findFirst({
        where: {
          id,
          userId: {
            not: loggedInUser.id,
          },
          room: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!findMessage) {
        return {
          ok: false,
          error: "찾으려는 메시지가 없습니다",
        };
      }
      // 메시지를 읽었으니 1표시를 없애줘야함
      await client.message.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
