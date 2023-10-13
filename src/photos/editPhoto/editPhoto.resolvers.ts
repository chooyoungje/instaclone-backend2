import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(async (_, { id, caption }, { loggedInUser }) => {
      const oldPhotoHashtag = await client.photo.findFirst({
        where: { id, userId: loggedInUser.id },
        select: { hashtags: true },
      });
      //
      if (!oldPhotoHashtag) {
        return {
          ok: false,
          error: "사진을 올린 유저가 아닙니다",
        };
      }
      const updatedPhoto = await client.photo.update({
        where: { id },
        data: {
          caption,
          hashtags: {
            disconnect: oldPhotoHashtag.hashtags,
            connectOrCreate: processHashtags(caption),
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

// const oldPhotosHashtags = await client.photo
// .findFirst({
// where: {
// id,
// userId: loggedInUser.id
// },
// select: {
// hashtags: true
// }
// })
// .hashtags({
// select: {
// hashtag: true
// }
// });
