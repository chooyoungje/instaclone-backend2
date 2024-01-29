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
- [x] computed Field (메시지를 봤는 지 안 봤는 지 체크, 아직 안 본 메시지가 몇 개인지 )
- [x] Read Message // 메시지에 읽음 표시하기
- [x] Realtime Message

추가
-[] 메시지 삭제하기

## 대화방 목록을 볼 때 하는 일

{
rooms{
users{
avatar
username
}
unreadNumber
}
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

## cors

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## body-parser

node.js의 모듈
클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출하게 해준다
body-parser을 쓰지않고 req.body를 쓰게 될 경우 undefined가 나온다.
req.body는 body-parser를 사용하기 전에는 디폴트 값으로 Undefined이 설정되기 때문입니다
body-parser을 쓰고 나면 req.body로 데이터를 읽어낼 수 있다

## express.js도 빌트인 body parser를 넣었다.(Express v4.16.0 기준)

express.json()

## 사진을 업로드 에러

현재 apollo 버전3

GraphQL을 테스트하기 위해 Apollo client를 사용하니

- "POST body missing, invalid Content-Type, or JSON object has no keys."
- 서버 : POST /graphql 400 68 - 8.804 ms

이런 에러가 뜨면서 대부분의 GraphQL이 되지 않는다
서버에 Header에서 설정을 해줘야한다는데 어디서 서버를 어떻게 건드려야 하는 지 도저히
감이 잡히지 않는다

바디가 없다고 나오는데 바디 설정은 또 어디서 해야하나??

## 사진 업로드 서버 설정

npm install graphql-upload-ts graphql

upload를 추가하니까 서버가 돌아가지 않는다
