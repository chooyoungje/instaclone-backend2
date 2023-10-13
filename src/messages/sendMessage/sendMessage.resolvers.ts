import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolver(async (_, { userId, roomId, payload }, { loggedInUser }) => {
      let room = null;
      if (userId) {
        const user = await client.user.findUnique({ where: { id: userId }, select: { id: true } });
        if (!user) {
          return {
            ok: false,
            error: "사용자가 존재하지 않습니다",
          };
        }
        //user가 있고 대화방이 없는 경우 대화방 만들기
        room = await client.room.create({
          data: {
            users: {
              connect: [
                {
                  id: userId,
                },
                {
                  id: loggedInUser.id,
                },
              ],
            },
          },
        });
      } else if (roomId) {
        // userId는 없고 roomId가 있을 경우, 대화방 찾기
        room = await client.room.findUnique({
          where: {
            id: roomId,
          },
          select: {
            id: true,
          },
        });
        // 대화방을 못 찾았을 경우
        if (!room) {
          return {
            ok: false,
            error: "대화방을 찾을 수 없습니다",
          };
        }
      }
      // 메시지 쓰기
      const newMessage = await client.message.create({
        data: {
          payload,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          room: {
            connect: {
              id: room.id,
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
