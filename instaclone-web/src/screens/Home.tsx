import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      user {
        username
        avatar
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
// Apollo가 query에 있는 id로 타입의 id를 찾음

function Home() {
  // 전체 사진 불러오기
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: any) => (
        <Photo key={photo.id} {...photo} />
        //<Photo key={photo.id} {...photo} />
        // photo 객체에 있는 모든 속성들이 props들과 타입이 같아야만 이렇게 쓸 수 있다
      ))}
    </div>
  );
}

export default Home;
