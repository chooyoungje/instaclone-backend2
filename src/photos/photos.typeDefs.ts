import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likeNumber: Int
    comments: Int!
    isMine: Boolean!
  }

  type Hashtag {
    id: Int!
    createdAt: String!
    updatedAt: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int
  }
  # Prisma가 아닌 GraphQL을 위해 작성, 모든 걸 포함시킬 이유는 없음
  type Like {
    id: Int!
    createdAt: String!
    updatedAt: String!
    photo: Photo!
  }
`;
