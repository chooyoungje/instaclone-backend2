import { gql } from "apollo-server";

export default gql`
  type searchUserResult {
    users: [User]
    page: Int
  }
  type Query {
    searchUsers(keyWord: String!, page: Int!): searchUserResult
  }
`;
