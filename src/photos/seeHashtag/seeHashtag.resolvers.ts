import client from "../../client";

export default {
  Query: {
    seeHashtag: (_, { hashtag }) => client.hashtag.findUnique({ where: { hashtag } }),
  },
};
// 해시태그에 등록된 사진 배열, 등록된 사진들의 총 갯수 얻기
