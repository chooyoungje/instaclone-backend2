export const processHashtags = (caption) => {
  // 만약 hashtags가 null 이라면 빈 배열 할당해주기
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
