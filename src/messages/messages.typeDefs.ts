import { gql } from "apollo-server";

export default gql`
  type Room {
    id: Int!
    createdAt: String!
    updatedAt: String!
    users: [User]!
    messages: [Message]
    unreadTotal: Int
  }
  type Message {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    room: Room!
    payload: String!
    read: Boolean!
  }
`;
