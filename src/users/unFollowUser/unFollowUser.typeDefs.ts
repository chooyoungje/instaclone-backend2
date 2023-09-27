import { gql } from "apollo-server-express";

export default gql`
  type unFollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unFollowUser(username: String!): unFollowUserResult
  }
`;
