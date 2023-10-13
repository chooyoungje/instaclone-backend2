이 프로젝트의 계획
백엔드

## User:

- [x] 회원가입
- [x] 프로필 보기
- [x] 로그인
- [x] 프로필 수정
- [x] 유저 팔로잉
- [x] 언팔로우
- [x] 팔로잉, 팔로워 보기
- [x] pagination, Cursor
- [x] Computed Fields
- [x] 유저 검색
- []아바타 이미지 바꾸기

## Photos:

- [] 사진 올리기
- [x] 사진 좋아요, 싫어요 기능
- [x] 사진 보기
- [x] 사진 수정
- [x] 사진 좋아요 보기
- [x] feed 보기
- [x] 사진 검색
- [x] 해시태그 검색
- [x] 사진 댓글 보기(댓글 갯수 등)
- [x] 사진 지우기(내가 올린 것들만)

## Comments:

- [x] 사진에 댓글 달기
- [x] 댓글 수정
- [x] 댓글 지우기

## DMs

- [x] see Rooms
- [x] Send Message(Create Room)
- [x] see Rooms
- [] computed Field (메시지를 봤는 지 안 봤는 지 체크, 아직 안 본 메시지가 몇 개인지 )
- [] Realtime Message

## 대화방 목록을 볼 때 하는 일

{
rooms{
users{
avatar
username
}
unreadNumber
}

## 대화방 안에서

    room {
        users {
            avatar
            username
        }
        messages {
            payload
            seen(T F)
        }
    }

}
