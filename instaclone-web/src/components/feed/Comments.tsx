import { styled } from "styled-components";
import Comment from "./Comment";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      id
      ok
      error
    }
  }
`;

interface PropTypes {
  photoId: number;
  avatar?: string;
  username: string;
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

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 12px;
  margin: 10px 0px;
  display: block;
`;
function Comments({ photoId, username, caption, commentNumber, comments }: PropTypes) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  // react에서 useForm hook을 사용하면 form을 만들기 훨씬 쉽다
  const createCommentUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData.me) {
      const newComment = {
        __typename: "Comments",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,

        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment CName on Comment {
            id
            createdAt
            payload
            isMine
            user {
              username
              avatar
            }
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev: any) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev: number) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update: createCommentUpdate,
  });

  const onValid = (data: any) => {
    const { payload } = data;
    if (loading) {
      return null;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment username={username} payload={caption} />
      <CommentCount>{commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}</CommentCount>
      {comments?.map((comment: any) => (
        <Comment
          key={comment.id}
          id={comment.id}
          isMine={comment.isMine}
          username={comment.user.username}
          payload={comment.payload}
          photoId={photoId}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", {
              required: true,
            })}
            type="text"
            placeholder="댓글 작성하기"
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
