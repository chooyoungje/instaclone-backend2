import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) => client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }) => client.user.count({ where: { following: { some: { id } } } }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    // id : 내가 현재 보고자 하는 유저 id
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      // 1. 현재 로그인된 유저의 following 라스트보기
      // 2. 리스트 중에서 내가 찾고자 하는 유저의 id가 있는 지 확인
      // exists는 배열을 반환하기에 길이로 존재유무를 확인한다
      // console.log(id);
      // const exists = await client.user
      //   .findUnique({ where: { username: loggedInUser.username } })
      //   .following({ where: { id } });

      //   return exists.length !== 0;
      const exists2 = await client.user.count({
        where: { username: loggedInUser.username, following: { some: { id } } },
      });
      return Boolean(exists2);
    },
    photos: ({ id }) => client.user.findUnique({ where: id }).photos(),
  },
};
