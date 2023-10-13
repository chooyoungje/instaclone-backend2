import client from "../client";

export default {
  Room: {
    // 사용자가 적을 경우에는 써도 됨, 만약 3000명 이상이라면 user.findUnique를 쓰고 페이지로 나눠서 구현
    users: ({ id }) =>
      client.room
        .findUnique({
          where: {
            id,
          },
        })
        .users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    // messages: ({id}) => client.room.findUnique({where : {id}}).messages() // 메시지가 적을 때에는 써도 됨
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
    // 아직 안 읽혔고
    // 이 대화방 안에 있으며
    // 내가 만든 메시지가 아닌 것들
  },
  Message: {
    user: ({ id }) =>
      client.message
        .findUnique({
          where: {
            id,
          },
        })
        .user(),
  },
};
