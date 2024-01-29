import { gql } from "apollo-server";
import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser }) => client.user.findUnique({ where: { id: loggedInUser.id } })),
  },
};
// 여기에서 문제가 생긴다면 null을 반환하게 됨
