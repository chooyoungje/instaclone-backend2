// import client from "../../client";

// export default {
//   Query: {
//     seeFollowers: async (_, { username, page }) => {
//       const existingUser = await client.user.findUnique({ where: { username }, select: { id: true } });
//       console.log(existingUser);
//       if (!existingUser) {
//         return {
//           ok: false,
//           error: "찾고자 하는 유저가 없습니다",
//         };
//       }
//       // 한 명을 찾고 그 사람의 팔로워들을 전부 찾기
//       const followers = await client.user.findUnique({ where: { username } }).followers({
//         take: 5,
//         skip: (page - 1) * 5,
//       });
//       const totalFollowers = await client.user.count({ where: { following: { some: { username } } } });
//       return {
//         ok: true,
//         followers: followers,
//         totalPage: Math.ceil(totalFollowers / 5),
//       };
//     },
//   },
// };

import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      // 내가 보려는 유저가 있는 지 체크
      const existingUser = await client.user.findUnique({ where: { username }, select: { id: true } });
      console.log(existingUser);
      if (!existingUser) {
        return {
          ok: false,
          error: "찾는 유저가 없습니다",
        };
      }
      // 한 명을 찾고 그 사람의 팔로워 전부를 데려오기, 1페이지 당 5개씩
      // 2페이지로 가면 1페이지에 있는 5명의 사람은 건너뛰고 보여주기
      const followers = await client.user.findUnique({ where: { username } }).followers({ take: 5, skip: (page - 1) * 5 });
      // following에 유저가 포함되어 있는 사람들 수 세기
      const totalFollowers = await client.user.count({ where: { following: { some: { username } } } });
      return {
        ok: true,
        followers,
        totalPage: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
