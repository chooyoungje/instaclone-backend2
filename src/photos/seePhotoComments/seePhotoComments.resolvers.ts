import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { photoId, lastId }) =>
      client.photo
        .findUnique({
          where: { id: photoId },
        })
        .comments({
          take: 3,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};
/**
 * pagination 적용하기
 * client.comment.findMany({where : {photoId}, take: 3, skip:3, orederby})
 {
  seePhoto{
    comments(page:1){
      id
      caption
    }
  }
} => comment 자체를 보여주는 오브젝트
이렇게 하면 그냥 comments를 볼 수 있는데
seePhotoComments를 굳이 resolver로 따로 빼서 만든이유는

인스타그램에서는 댓글 보기 또는 좋아여 보기를 누르면 다른 페이지로 이동한다
=> 다른 resolver가 실행된다를 말

{
  seeHashtag(hashtag:"#food"){
    id
    photos(page:2) {
      caption
    }
    totalPhotos
  }
}
해쉬태그로 검색하여 사진을 보고 싶은 것이므로
사진의 상세내용을 가져오도록 하는 것이 더 좋으니 이렇게 만듬


 */
