import { gql } from "apollo-server";

export default gql`
  type mutationRespone {
    ok: Boolean!
    error: String
  }
`;
