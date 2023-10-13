import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      let hashtagObjs = [];
      if (caption) {
        // 캡션 분석, 해시태그 추출하기
        const hashtags = caption.match(/#[\w]+/g);
        hashtagObjs = hashtags.map((hashtag) => ({ where: { hashtag }, create: { hashtag } }));
        console.log(hashtagObjs);
      }
      return client.photo.create({
        data: {
          file,
          caption,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          hashtags: {
            ...(hashtagObjs.length > 0 && { connectOrCreate: hashtagObjs }),
          },
        },
      });
    }),
  },
};
