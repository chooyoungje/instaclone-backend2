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

참고 : https://github.com/meabed/graphql-upload-ts
graphql-upload-ts 로 진행하는 게 맞고  
Upload: require("graphql-upload-ts").GraphQLUpload,를
Mutation 아래에 추가해주기
그러면 서버는 잘 돌아감 근데 파일을 업로드 할려고 하니 무한 버퍼가 걸림

콘솔 로그 곳곳에 넣고 다시 실행
hashtag 추출하는 곳에서 막혀서 무한 버거가 걸리는 거였음
해시태그가 있을 경우와 없을 경우를 if로 나눠서 해결
AWS에 가기 전에 막혀서 뭔지 보니 The bucket does not allow ACLs 에러가 뜸

AWS S3에 가서 ACL 활성화 해주기

## 헤더도 이상하고 홈 화면에 사진이 나오질 않는다

Cannot query field \"likes\" on type \"Photo\". Did you mean \"file\" or \"isLiked\"?",

타입이 안 맞는 것 같은데??
프론트에선 likes라고 gql로 요청하라고 했고
백엔드에서는 likeNumber로 되어 있어 filed 이름이 맞이 않았던 것

## 사진에 있는 하트를 눌렀는데 좋아요 기능이 작동하지 않는다

Home에서 seeFeed로 불러올 떄 isLiked를 넣어주지 않아서 실행되지 않았음

<PhotoAction onClick={() => toggleLikeMutation()}>
이렇게 써줘야 함수가 실행이 됨

## gql에 Fragment를 써서 실행을 하니

photos {
        ...PhotoFragment
      }

# 일단 이 쿼리문은 잘 실행이 되는 것 같다

"Field \"photos\" of type \"[Photo]\" must have a selection of subfields. Did you mean \"photos { ... }\"?",

이런 에러가 뜨면서 실행이 되지 않는다

users.typeDefs.ts
users.resolvers.ts
seeProfile.ts
schema.prisma
Profile.   => photo 쿼리문이 2개였고, 거기에서 서브필드를 지정하지 않아서 생기는 오류였다


