import { gql } from "apollo-server";

export default gql`
  type seeFollowingResult {
    ok: Boolean
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): seeFollowingResult
  }
`;

// lastId는 unique한 걸로 해야됨
