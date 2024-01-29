import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FatText } from "../shared";
import { styled } from "styled-components";
import Avatar from "../Avatar";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import { Link } from "react-router-dom";

// 내 코드를 정리하거나 내가 필요한게 뭔지 찾아보는 방법은
// 내가 변경하고 싶은 코드들을 다시 훓어보면서 에러들을 해결하면됨

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

interface PropTypes {
  id: number;
  user: {
    avatar?: string;
    username: string;
  };
  file: string;
  isLiked: boolean;
  likes: number;
  caption: string;
  commentNumber: number;
  comments?: [
    {
      id: number;
      createdAt: string;
      payload: string;
      isMine: boolean;
      user: {
        avatar?: string;
        username: string;
      };
    }
  ];
}

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

// 아바타와 유저사이에 간격이 필요함, 굵은 글씨체를 상속받은 다음 나머지 적용하기
const Username = styled(FatText)`
  margin-left: 15px;
`;

// 이미지 마다 크기가 달라 이미지를 전체를 크기에 맞게 보여주기 위함임
// 이미지 비율울 사각형 크기에 맞춰야함
const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

// 사진 밑에 있는 좋아요, 댓글 영역 CSS
const PhotoData = styled.div`
  padding: 15px;
`;

// 좋아요, 댓글 보기, 북마크 부분을 div영역으로 묶고 각각을 열로 분리하기
// 모든 icon은 기본적으로 svg임
const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

// 댓글, 좋아요와 븍마크 개인의 영역
const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
  // div에 커서를 갖다대어 누를 수 있게 할려면 cursor: pointer;추가해주면 됨
`;

// 좋아요 갯수 표시해주기
const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

function Photo({ id, user, file, isLiked, likes, caption, commentNumber, comments }: PropTypes) {
  const updateToggleLike = (cache: any, result: any) => {
    // cache : 캐시를 제어할 수 있는 링크
    // data : 백엔드에서 받은 데이터
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      const photoId = `Photo:${id}`;
      console.log("캐시 수정 시작");
      cache.modify({
        // 내가 수정할 데이터의 id, 수정하고 싶은 fields만 알려주면 끝남

        id: photoId,
        fields: {
          // 내가 수정하고 싶은 filed만 적으면 됨
          isLiked(prev: boolean) {
            return !prev;
          },
          // 함수를 쓰는데 이 함수에서는 이전 isLiked의 값을 쓸 수 있음
          likes(prev: any, { readField }: any) {
            const prevIsLiked = readField("isLiked");
            if (prevIsLiked) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
      console.log("캐시 수정 끝");
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
    // update : 백엔드에서 받은 데이터를 주는 함수
    // apollo cache(캐시)에 직접 Link(연결) 해준다
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user?.username}`}>
          <Avatar lg url={user?.avatar} />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "red" : "inherit" }}
                // inherit : 부모의 색상을 가져오기
                size={"2x"}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={"2x"} icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon size={"2x"} icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          username={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        ></Comments>
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
