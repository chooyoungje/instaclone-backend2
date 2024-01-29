import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteMessage(id: Int!): MutationResponse
  }
`;
