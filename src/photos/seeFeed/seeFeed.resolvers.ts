import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver((_, __, { loggedInUser }) => {
      return client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  },
};
/*
OR
하나는 팔로워 목록에 내가 있는 유저의 사진을 찾기,  
또는 나 자신이 올린 사진을 찾기
=> 내가 팔로우 하는 사람들의 사진 + 내가 만든 사진


근데 그냥 
client.photo.findMany({where : {user: {id:loggedInUser.id}}}) 로 찾으면 되지 않나??

그러면 내가 올린 사진만 가져와짐
내가 팔로우한 사람들의 사진이 안 보이게 된다




*/
