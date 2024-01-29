import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Upload: require("graphql-upload-ts").GraphQLUpload,
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      let hashtagObjs = [];
      console.log("해시태그 추출 전");
      if (caption) {
        // 캡션 분석, 해시태그 추출하기
        const hashtags = caption.match(/#[\w]+/g);
        if (hashtags) {
          hashtagObjs = hashtags.map((hashtag) => ({ where: { hashtag }, create: { hashtag } }));
        }
      }
      console.log("해시태그 추출 후");
      console.log("uploadToS3 가기 전");
      const fileurl = await uploadToS3(file, loggedInUser.id, "uploads");
      console.log("uploadToS3 과정 끝난 후");
      return client.photo.create({
        data: {
          file: fileurl,
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
