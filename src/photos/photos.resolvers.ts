import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    // 해쉬태그를 찾늗데 phtos의 해쉬태그들 내에서 찾는 거임
    hashtags: ({ id }) => client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    likeNumber: ({ photoId }) => client.like.count({ where: { photoId } }),
    comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
  Hashtag: {
    // 해시태그를 불러오는 모든 곳에서 photos를 받아올 수 있고 pagination도 사용가능하게 됨
    // context도 사용할 수 있다. 특정 기능은 로그인한 유저만 보도록 할 수도 있다
    photos: ({ id }, { page }, { loggedInUser }) =>
      client.hashtag.findUnique({ where: { id } }).photos({ take: 3, skip: (page - 1) * 3 }),
    totalPhotos: ({ id }) => client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
};

// DB에 담겨져 있는 해시태그 형식
// {
//   id: 1,
//   createdAt: 2023-09-30T06:08:54.887Z,
//   updatedAt: 2023-09-30T06:08:54.887Z,
//   hashtag: '#food'
// }
