import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "graphql-subscriptions";
import { Context } from "../../types";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        console.log(context);
        // 리스닝할려는 방이 있는지,
        // 리스닝할려는 유저가 그 방에 있는 유저가 맞는 지 확인
        const existingRoom = await client.room.findFirst({
          where: {
            id: args.roomId,
            users: {
              some: {
                id: context.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        console.log(context.id);
        if (!existingRoom) {
          throw new Error("대화방이 존재하지 않습니다");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdates }, { roomId }, loggedInUser) => {
            return roomUpdates.roomId === roomId;
          }
        )(root, args, context, info);
      },
    },
  },
};

// withFilter의 두 번째 인자는 true나 false를 리턴하는 함수여야함
